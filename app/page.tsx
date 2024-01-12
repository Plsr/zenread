/**
 * v0 by Vercel.
 * @see https://v0.dev/t/8ZbeduSelvH
 */

import { RssItemsList } from "@/components/blocks/RssItemsList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

const channelsById = {
  1: "https://randsinrepose.com/feed/",
};

export default function Component() {
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
    </div>
  );
}
