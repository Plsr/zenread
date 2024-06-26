import type { Metadata } from "next";
import { ChannelsList } from "@/components/blocks/ChannelsList";
import { RssItemsList } from "@/components/blocks/RssItemsList";
import { getAllChannels } from "@/lib/network";
import { supabaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RSSReaderLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { channelId: string; itemId: string };
}) {
  const supabase = supabaseServerClient();
  const userData = (await supabase.auth.getUser()).data;

  if (!userData.user) {
    redirect("/login");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_2fr] gap-4 lg:gap-6 h-screen">
      <ChannelsList />
      <RssItemsList channelId={parseInt(params.channelId)} />
      {children}
    </div>
  );
}
