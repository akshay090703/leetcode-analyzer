'use client';

import { useEffect, useState } from 'react';
import { DiscussionCard } from './discussion-card';
import { getTrendingDiscussions } from '@/lib/api/discussions';
import type { TrendingDiscussionsResponse } from '@/lib/types';

export function TrendingDiscussions() {
    const [discussions, setDiscussions] = useState<TrendingDiscussionsResponse | null>(null);
    console.log(discussions);


    useEffect(() => {
        getTrendingDiscussions().then(setDiscussions);
    }, []);

    if (!discussions) return null;

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {discussions.cachedTrendingCategoryTopics.map((discussion) => (
                <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
        </div>
    );
}