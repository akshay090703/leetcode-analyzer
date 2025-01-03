import { cache } from 'react';
import { BASE_URL } from './config';
import type { Problem, DailyQuestion, ProblemListResponse } from '../types';

interface GetProblemsOptions {
  limit?: number;
  skip?: number;
  tags?: string[];
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
}

export const getProblems = cache(async (options: GetProblemsOptions = {}) => {
  const params = new URLSearchParams();
  
  if (options.limit) params.append('limit', options.limit.toString());
  if (options.skip) params.append('skip', options.skip.toString());
  if (options.difficulty) params.append('difficulty', options.difficulty);
  if (options.tags?.length) params.append('tags', options.tags.join('+'));

  const res = await fetch(`${BASE_URL}/problems?${params.toString()}`);
  return res.json() as Promise<ProblemListResponse>;
});

export const getDailyQuestion = cache(async () => {
  const res = await fetch(`${BASE_URL}/daily`);
  return res.json() as Promise<DailyQuestion>;
});

export const getProblemBySlug = cache(async (titleSlug: string) => {
  const res = await fetch(`${BASE_URL}/select?titleSlug=${titleSlug}`);
  return res.json() as Promise<Problem>;
});