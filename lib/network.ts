import { RSSItem } from "@/components/blocks/RssItemsList";
import { XMLParser } from "fast-xml-parser";
import { getChannels } from "./database";
import { normalizedRssFeed } from "./util/normalizeRssFeed";

export type NormalizedRssChannel = {
  title: string;
  updatedAt: string; // .updated or .lastBuildDate
  item: RSSItem[]; // TODO: Normalize
};

export const getAllChannels = async () => {
  const channels = await getChannels();

  if (!channels) {
    return [];
  }
  const allChannelReqs = channels.map(async (channel) => {
    return await fetch(channel.url);
  });

  const channelRes = await Promise.allSettled(allChannelReqs);

  const successfulChannelRes = channelRes.map(async (res) => {
    if (res.status !== "fulfilled" || res.value.status !== 200) {
      return null;
    }

    const data = await res.value.text();
    const parser = new XMLParser({});
    const jsonData = parser.parse(data);

    return normalizedRssFeed(jsonData);
  });

  return await Promise.all(successfulChannelRes);
};
