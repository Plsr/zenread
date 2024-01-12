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
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_2fr] gap-4 lg:gap-6 h-screen">
      <div className="flex flex-col h-full overflow-auto border-r dark:border-gray-800">
        <div className="p-4 flex justify-start">
          <Button variant="outline">
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
        <div className="p-4">
          <Input className="w-full" placeholder="Search feeds..." />
        </div>
        <nav className="flex-1 overflow-auto">
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            <li>
              <Link
                className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-200 dark:bg-gray-800"
                href="#"
              >
                TechCrunch
                <span className="bg-gray-500 text-white rounded-full px-1 text-xs ml-2">
                  3
                </span>
              </Link>
            </li>
            <li>
              <Link
                className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-800"
                href="#"
              >
                The Verge
                <span className="bg-gray-500 text-white rounded-full px-1 text-xs ml-2">
                  5
                </span>
              </Link>
            </li>
            <li>
              <Link
                className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-800"
                href="#"
              >
                Wired
                <span className="bg-gray-500 text-white rounded-full px-1 text-xs ml-2">
                  2
                </span>
              </Link>
            </li>
            <li>
              <Link
                className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-800"
                href="#"
              >
                The New York Times
                <span className="bg-gray-500 text-white rounded-full px-1 text-xs ml-2">
                  1
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <Button className="w-full">Add New</Button>
        </div>
      </div>
      <main className="flex flex-col h-full overflow-auto border-r dark:border-gray-800">
        <RssItemsList
          feedLink="https://randsinrepose.com/feed/"
          channelId={1}
        />
      </main>
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
    </div>
  );
};

export default ChannelIdPage;
