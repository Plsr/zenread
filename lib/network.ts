import { RSSItem } from "@/components/blocks/RssItemsList";
import { channels } from "./channels";
import { XMLParser } from "fast-xml-parser";

export type RSSChannel = {
  title: string;
  link: string;
  description: string;
  lastBuildDate: string;
  item: RSSItem[];
};

export const getAllChannels = async () => {
  const allChannelReqs = await channels.map(async (channel) => {
    return await fetch(channel.link);
  });

  const channelRes = await Promise.allSettled(allChannelReqs);

  const successfulChannelRes = channelRes.map(async (res) => {
    if (res.status !== "fulfilled" || res.value.status !== 200) {
      return null;
    }

    const data = await res.value.text();
    const parser = new XMLParser({});
    const jsonData = parser.parse(data);

    return jsonData.rss.channel;
  });

  return (await Promise.all(successfulChannelRes)) as RSSChannel[];
};
