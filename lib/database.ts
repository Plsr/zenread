import { revalidateTag, unstable_cache } from "next/cache";
import { supabaseServerClient } from "./supabase";

export const getChannels = async () => {
  const supabase = supabaseServerClient();
  const userQuery = await supabase.auth.getUser();
  const userId = userQuery.data.user?.id;

  if (!userId) {
    return [];
  }

  return await unstable_cache(
    async () => {
      const res = await supabase.from("channels").select("*");

      if (res.error) {
        throw res.error;
      }

      return res.data;
    },
    ["channels", userId],
    { tags: ["channels"] }
  )();
};

export const addChannel = async (url: string, name: string) => {
  const supabase = supabaseServerClient();
  await supabase.from("channels").insert({ url, name });
  revalidateTag("channels");
};
