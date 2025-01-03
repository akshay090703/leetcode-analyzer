import { Suspense } from 'react';
import { TrendingDiscussions } from '@/components/discussions/trending-discussions';
import { Skeleton } from '@/components/ui/skeleton';

export default function DiscussionsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Trending Discussions</h1>
            <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
                <TrendingDiscussions />
            </Suspense>
        </div>
    );
}