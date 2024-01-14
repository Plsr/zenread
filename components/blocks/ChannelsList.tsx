"use client";

import { RSSChannel } from "@/app/page";
import { Button } from "../ui/button";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { Input } from "../ui/input";
import { RssItemsList } from "./RssItemsList";
import { useState } from "react";
import he from "he";
import { format } from "date-fns";
import { ItemContent } from "./ItemContent";

type Props = {
  channelData: RSSChannel[];
};

export const ChannelsList = ({ channelData }: Props) => {
  const [selectedChannel, setSelectedChannel] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleChannelClick = (channelId: number) => {
    setSelectedItem(null);
    setSelectedChannel(channelId);
  };

  const handleRSSItemClick = (itemId: number) => {
    setSelectedItem(itemId);
  };

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
            {channelData.map((channel, index) => (
              <li key={channel.title}>
                <div
                  onClick={() => handleChannelClick(index)}
                  className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-200 dark:bg-gray-800"
                >
                  {channel.title}
                  <span className="bg-gray-500 text-white rounded-full px-1 text-xs ml-2">
                    3
                  </span>
                </div>
              </li>
            ))}
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
          feedItems={channelData[selectedChannel].item}
          onItemClick={handleRSSItemClick}
        />
      </main>
      {selectedItem && (
        <div className="flex flex-col h-full overflow-auto">
          <div className="flex-1 overflow-auto p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-1">
                {he.decode(
                  channelData[selectedChannel].item[selectedItem].title
                )}
              </h2>
              {!!channelData[selectedChannel].item[selectedItem].pubDate && (
                <time className="block text-sm text-gray-500 dark:text-gray-400">
                  {format(
                    new Date(
                      channelData[selectedChannel].item[selectedItem].pubDate!
                    ),
                    "dd.MM.yyyy"
                  )}
                </time>
              )}
            </div>
            <ItemContent
              content={
                channelData[selectedChannel].item[selectedItem][
                  "content:encoded"
                ]
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};
