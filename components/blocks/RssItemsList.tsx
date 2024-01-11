import { XMLParser } from "fast-xml-parser";
import Link from "next/link";
import he from "he";

// TODO: Adapt so its consistent with the RSS 2.0 Specs
// https://www.rssboard.org/rss-specification#hrelementsOfLtitemgt
type RSSItem = {
  title: string;
  link: string;
  description: string;
  author?: string;
  category?: string[];
  comments?: string;
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
};

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

export const RssItemsList = async ({ feedLink }: Props) => {
  const items = await getFeedItems(feedLink);
  console.log(items);

  return (
    <ul className="flex-1 overflow-auto divide-y divide-gray-200 dark:divide-gray-800">
      {items.map((item: RSSItem) => (
        <li key={item.title}>
          <Link
            className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-800"
            href="#"
          >
            <h2 className="text-lg font-semibold">{he.decode(item.title)}</h2>
            {item.pubDate && (
              <time className="block text-sm text-gray-500 dark:text-gray-400">
                {item.pubDate}
              </time>
            )}
            <p className="mt-2 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
