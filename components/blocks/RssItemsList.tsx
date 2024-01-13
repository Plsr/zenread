import { XMLParser } from "fast-xml-parser";
import Link from "next/link";
import he from "he";
import { format } from "date-fns";
import { cache } from "react";

// TODO: Adapt so its consistent with the RSS 2.0 Specs
// https://www.rssboard.org/rss-specification#hrelementsOfLtitemgt
type RSSItem = {
  title: string;
  link: string;
  description: string;
  author?: string;
  category?: string[];
  comments?: string;
  "content:encoded": string;
  enclosure?: {
    url: string;
    length: number;
    type: string;
  };
  guid?: string;
  pubDate?: string;
  source?: {
    url: string;
    title: string;
  };
};

type Props = {
  feedLink: string;
  channelId: number;
  feedItems?: RSSItem[];
};

// const getFeedItems = cache(async (feedLink: string) => {
//   const res = await fetch(feedLink);
//   console.log("Fetching again");

//   if (res.status !== 200) {
//     return null;
//   }

//   const data = await res.text();
//   const parser = new XMLParser({});
//   const jsonData = parser.parse(data);

//   return jsonData?.rss?.channel?.item;
// });

export const RssItemsList = async ({
  feedLink,
  channelId,
  feedItems,
}: Props) => {
  const items = feedItems!;
  console.log("rerendering");

  return (
    <ul className="flex-1 overflow-auto divide-y divide-gray-200 dark:divide-gray-800">
      {items.map((item: RSSItem, index: number) => (
        <li key={item.title}>
          <Link
            className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-800"
            href={`/channel/${channelId}/item/${index}`}
          >
            <h2 className="text-lg font-semibold">{he.decode(item.title)}</h2>
            {item.pubDate && (
              <time className="block text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(item.pubDate), "dd.MM.yyyy")}
              </time>
            )}
            {item.description && (
              <p className="mt-2 text-sm">
                {he.decode(item.description.slice(0, 150))}...
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};
