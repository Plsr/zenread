import { ItemContent } from "@/components/blocks/ItemContent";
import { RssItemsList } from "@/components/blocks/RssItemsList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { channels } from "@/lib/channels";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { format } from "date-fns";
import { XMLParser } from "fast-xml-parser";
import he from "he";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
    itemId: string;
  };
};

// TODO: Move to shared util
const getFeedItems = async (feedLink: string) => {
  const res = await fetch(feedLink);

  if (res.status !== 200) {
    return null;
  }

  const data = await res.text();
  const parser = new XMLParser({});
  const jsonData = parser.parse(data);

  return jsonData?.rss?.channel?.item;
};

const getRSSItemAtPosition = async (feedLink: string, position: number) => {
  const items = await getFeedItems(feedLink);

  if (!items || items.length < 1) {
    return null;
  }

  return items[position];
};

const ChannelIdPage = async ({ params }: Props) => {
  const channelId = parseInt(params.id);
  const itemId = parseInt(params.itemId);

  const channelData = channels.find((channel) => channel.id === channelId);

  if (!channelData) {
    notFound();
  }

  const item = await getRSSItemAtPosition(channelData.link, itemId);

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="flex-1 overflow-auto p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">
            {he.decode(item.title)}
          </h2>
          <time className="block text-sm text-gray-500 dark:text-gray-400">
            {format(new Date(item.pubDate), "dd.MM.yyyy")}
          </time>
        </div>
        <ItemContent content={item["content:encoded"]} />
      </div>
    </div>
  );
};

export default ChannelIdPage;
