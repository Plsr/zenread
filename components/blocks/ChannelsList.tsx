import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { AddChannel } from "./AddChannel";
import { getChannels } from "@/lib/database";

export const ChannelsList = async () => {
  const channels = await getChannels();

  return (
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
          {channels.map((channel) => {
            if (!channel) {
              return null;
            }

            return (
              <li key={channel.url}>
                <Link
                  href={`/channel/${channel.id}`}
                  className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-200 dark:bg-gray-800"
                >
                  {channel.name || new URL(channel.url).hostname}
                  <span className="bg-gray-500 text-white rounded-full px-1 text-xs ml-2">
                    3
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4">
        <AddChannel />
      </div>
    </div>
  );
};
