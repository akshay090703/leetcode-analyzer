import { cache } from "react";
import { BASE_URL } from "./config";
import type {
  LeetCodeProfile,
  Badge,
  ContestHistory,
  BadgeResponse,
} from "../types";

export const getFullProfile = cache(async (username: string) => {
  const res = await fetch(`${BASE_URL}/userProfile/${username}`);
  return res.json() as Promise<LeetCodeProfile>;
});

export const getBadges = cache(async (username: string) => {
  const res = await fetch(`${BASE_URL}/${username}/badges`);
  return res.json() as Promise<BadgeResponse>;
});

export const getContestHistory = cache(async (username: string) => {
  const res = await fetch(`${BASE_URL}/${username}/contest/history`);
  const data = await res.json();
  return data.contestHistory as ContestHistory[];
});

// export const getContestRanking = cache(async (username: string) => {
//   const res = await fetch(`${BASE_URL}/userContestRankingInfo/${username}`);
//   return res.json() as Promise<ContestRanking>;
// });
