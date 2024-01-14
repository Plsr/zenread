import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getAllChannels } from "@/lib/network";
import Link from "next/link";

export const ChannelsList = async () => {
  const channelData = await getAllChannels();
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
          {channelData.map((channel, index) => (
            <li key={channel.title}>
              <Link
                href={`/channel/${index}`}
                className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-200 dark:bg-gray-800"
              >
                {channel.title}
                <span className="bg-gray-500 text-white rounded-full px-1 text-xs ml-2">
                  3
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <Button className="w-full">Add New</Button>
      </div>
    </div>
  );
};
