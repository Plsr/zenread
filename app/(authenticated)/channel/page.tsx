import { AddChannel } from "@/components/blocks/AddChannel";
import { ChannelsList } from "@/components/blocks/ChannelsList";
import { RssItemsList } from "@/components/blocks/RssItemsList";
import { getChannels } from "@/lib/database";
import clsx from "clsx";

const ChannelPage = async () => {
  const channels = await getChannels();
  return (
    <div
      className={clsx(
        "grid grid-cols-1  gap-4 lg:gap-6 h-screen",
        channels.length === 0
          ? "lg:grid-cols-[300px_1fr]"
          : "lg:grid-cols-[300px_1fr_2fr]"
      )}
    >
      <ChannelsList />
      {channels.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4">
          <div>You have not subscribed to any site yet</div>
          <AddChannel />
        </div>
      )}
      {channels.length > 0 && <RssItemsList channelId={channels[0].id} />}
    </div>
  );
};

export default ChannelPage;
