'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function ProblemFilters({
    tag,
    setTag,
    setDifficulty,
}: {
    tag: string;
    setTag: Dispatch<SetStateAction<string>>;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD' | undefined;
    setDifficulty: Dispatch<SetStateAction<'EASY' | 'MEDIUM' | 'HARD' | undefined>>;
}) {
    const difficulties = ['ALL', 'EASY', 'MEDIUM', 'HARD'];

    const searchParams = useSearchParams();
    const router = useRouter();

    // Get difficulty from the query string and set it
    useEffect(() => {
        const difficultyFromQuery = searchParams.get('difficulty') as
            | 'EASY'
            | 'MEDIUM'
            | 'HARD'
            | undefined;

        if (difficultyFromQuery) {
            setDifficulty(difficultyFromQuery);
        }
    }, [searchParams, setDifficulty]);

    const handleDifficultyChange = (diff: string) => {
        const query = new URLSearchParams(searchParams.toString());
        if (diff === 'ALL') {
            query.delete('difficulty');
            setDifficulty(undefined);
        } else {
            query.set('difficulty', diff);
            setDifficulty(diff as 'EASY' | 'MEDIUM' | 'HARD');
        }
        router.push(`?${query.toString()}`);
    };

    return (
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search topics..."
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="pl-9"
                />
            </div>
            <div className="flex space-x-2">
                {difficulties.map((diff) => (
                    <Button
                        key={diff}
                        variant={
                            (diff === 'ALL' && !searchParams.get('difficulty')) ||
                                diff === searchParams.get('difficulty')
                                ? 'secondary'
                                : 'ghost'
                        }
                        size="sm"
                        onClick={() => handleDifficultyChange(diff)}
                    >
                        {diff.charAt(0) + diff.slice(1).toLowerCase()}
                    </Button>
                ))}
            </div>
        </div>
    );
}
