import { cache } from "react";
import type {
  LeetCodeProfile,
  LanguageStats,
  SkillStats,
  BadgeResponse,
  ContestHistory,
} from "./types";

const BASE_URL = "https://alfa-leetcode-api.onrender.com";

export const getFullProfile = cache(async (username: string) => {
  const res = await fetch(`${BASE_URL}/userProfile/${username}`);
  return res.json() as Promise<LeetCodeProfile>;
});

export const getLanguageStats = cache(async (username: string) => {
  const res = await fetch(`${BASE_URL}/languageStats?username=${username}`);
  return res.json() as Promise<LanguageStats>;
});

export const getSkillStats = cache(async (username: string) => {
  const res = await fetch(`${BASE_URL}/skillStats/${username}`);
  return res.json() as Promise<SkillStats>;
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

export const getProfileInfo = cache(async (username: string) => {
  const res = await fetch(`${BASE_URL}/${username}`);
  return res.json();
});
