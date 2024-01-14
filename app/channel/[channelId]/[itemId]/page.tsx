import { ItemContent } from "@/components/blocks/ItemContent";
import { channels } from "@/lib/channels";
import { getAllChannels } from "@/lib/network";
import { format } from "date-fns";
import { XMLParser } from "fast-xml-parser";
import he from "he";

const getFeedItems = async (feedLink: string) => {
  const res = await fetch(feedLink);
  console.log("Fetching again");

  if (res.status !== 200) {
    return null;
  }

  const data = await res.text();
  const parser = new XMLParser({});
  const jsonData = parser.parse(data);

  return jsonData?.rss?.channel?.item;
};

export default async function Page({
  params,
}: {
  params: { channelId: string; itemId: string };
}) {
  console.log(params);
  const items = await getFeedItems(channels[parseInt(params.channelId)].link);
  const item = items[parseInt(params.itemId)];

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="flex-1 overflow-auto p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">
            {he.decode(item.title)}
          </h2>
          {!!item.pubDate && (
            <time className="block text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(item.pubDate!), "dd.MM.yyyy")}
            </time>
          )}
        </div>
        <ItemContent content={item["content:encoded"]} />
      </div>
    </div>
  );
}
