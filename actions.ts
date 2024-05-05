"use server";

import { XMLParser } from "fast-xml-parser";
import { addChannel as addChannelDb } from "./lib/database";
import { supabaseServerActionClient } from "./lib/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME } from "./lib/util/constants";

// TODO: Add status to response so the component can handle
// success/error cases
export const addChannel = async (_prevState: any, formData: any) => {
  const feedUrl = formData.get("feedUrl");

  if (!feedUrl) {
    return {
      message: "Feed URL is required!",
    };
  }

  const res = await fetch(feedUrl);
  const contentType = res.headers.get("content-type")?.split(";")[0];

  // TODO: This might be too restrictive, adapt once more feeds are tried
  // This might even be documented somewhere, so check that
  if (
    !contentType ||
    !["application/rss+xml", "text/xml", "application/xml"].includes(
      contentType
    )
  ) {
    return {
      status: "error",
      message: "Invalid feed URL!",
    };
  }

  const data = await res.text();
  const parser = new XMLParser({});
  const jsonData = parser.parse(data);

  if (!jsonData.feed && !jsonData.rss) {
    return {
      message: "No feed found :(",
    };
  }

  const host = new URL(feedUrl).host;
  await addChannelDb(feedUrl, host);

  return {
    status: "success",
    message: "",
  };
};

export const sendOtp = async (email: string) => {
  const supabase = supabaseServerActionClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  cookies().set(COOKIE_NAME, email, {
    httpOnly: true,
  });

  return {
    status: "success",
  };
};

export const verifyOtp = async (email: string, otp: string) => {
  const supabase = supabaseServerActionClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  cookies().delete(COOKIE_NAME);

  return {
    status: "success",
  };
};

// This feels a little weird to do, but is what the next.js docs suggest
// https://nextjs.org/docs/app/api-reference/functions/redirect#client-component
export const navigate = (path: string) => {
  redirect(path);
};
