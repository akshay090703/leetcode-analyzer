'use client'
import { Suspense, useState } from 'react';
import { DailyChallenge } from '@/components/problems/daily-challenge';
import { ProblemList } from '@/components/problems/problem-list';
import { ProblemFilters } from '@/components/problems/problem-filters';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProblemsPage() {
    const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD" | undefined>("EASY");
    const [tag, setTag] = useState('');

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">LeetCode Problems</h1>

            <div className="mb-8">
                <Suspense fallback={<Skeleton className="h-64 w-full" />}>
                    <DailyChallenge />
                </Suspense>
            </div>

            <div className="space-y-6">
                <Suspense fallback={<div>Loading...</div>}>
                    <ProblemFilters tag={tag} setTag={setTag} difficulty={difficulty} setDifficulty={setDifficulty} />
                </Suspense>
                <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                    <ProblemList tag={tag} difficulty={difficulty} />
                </Suspense>
            </div>
        </div>
    );
}