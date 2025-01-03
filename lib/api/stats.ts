import { cache } from 'react';
import { BASE_URL } from './config';
import type { LanguageStats, SkillStats, CalendarResponse } from '../types';

export const getLanguageStats = cache(async (username: string) => {
  const res = await fetch(`${BASE_URL}/languageStats?username=${username}`);
  return res.json() as Promise<LanguageStats>;
});

export const getSkillStats = cache(async (username: string) => {
  const res = await fetch(`${BASE_URL}/skillStats/${username}`);
  return res.json() as Promise<SkillStats>;
});

export const getSubmissionCalendar = cache(async (username: string) => {
  const res = await fetch(`${BASE_URL}/${username}/calendar`);
  const data = await res.json() as CalendarResponse;
  return JSON.parse(data.submissionCalendar) as Record<string, number>;
});