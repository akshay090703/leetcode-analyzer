import { cache } from "react";
import { BASE_URL } from "./config";
import type {
  TrendingDiscussionsResponse,
  DiscussionTopicResponse,
} from "../types";

export const getTrendingDiscussions = cache(async () => {
  const res = await fetch(`${BASE_URL}/trendingDiscuss?first=20`);
  return res.json() as Promise<TrendingDiscussionsResponse>;
});

export const getDiscussionById = cache(async (id: number) => {
  const res = await fetch(`${BASE_URL}/discussTopic/${id}`);
  return res.json() as Promise<DiscussionTopicResponse>;
});
