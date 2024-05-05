export type NormalizeRssItem = {
  title: string;
  link?: string;
  description: string;
  author?: string;
  content?: string;
  guid?: string;
  pubDate?: string;
  source?: {
    url: string;
    title: string;
  };
};

export type NormalizedRssChannel = {
  title: string;
  updatedAt: Date; // .updated or .lastBuildDate
  items: NormalizeRssItem[]; // TODO: Normalize
};

export const normalizedRssFeed = (
  jsonData: any
): NormalizedRssChannel | null => {
  // Atom feed (?)
  if (jsonData.rss) {
    return {
      title: jsonData.rss.channel.title,
      updatedAt: new Date(jsonData.rss.channel.lastBuildDate),
      items: jsonData.rss.channel.item.map((item: any) => {
        return {
          title: item.title,
          link: item.link,
          description: item.description,
          content: item["content:encoded"],
        };
      }),
    };
  }

  // RSS feed (?)
  if (jsonData.feed) {
    return {
      title: jsonData.feed.title,
      updatedAt: new Date(jsonData.feed.updated),
      items: jsonData.feed.entry.map((entry: any) => {
        return {
          title: entry.title,
          link: entry.link,
          description: entry.summary,
          content: entry.content,
        };
      }),
    };
  }

  return null;
};
