'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import { getDailyQuestion } from '@/lib/api/problems';
import type { DailyQuestion } from '@/lib/types';
import Link from 'next/link';

export function DailyChallenge() {
    const [problem, setProblem] = useState<DailyQuestion | null>(null);

    useEffect(() => {
        getDailyQuestion().then(setProblem);
    }, []);

    if (!problem) return null;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Daily Challenge</CardTitle>
                <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>{problem.date}</span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-semibold">
                            <a
                                href={problem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary"
                            >
                                {problem.questionTitle}
                            </a>
                        </h3>
                        <div className="flex items-center space-x-2 mt-2">
                            <Badge variant={
                                problem.difficulty === 'Easy' ? 'default' :
                                    problem.difficulty === 'Medium' ? 'secondary' :
                                        'destructive'
                            }>
                                {problem.difficulty}
                            </Badge>
                            <div className="flex items-center space-x-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{problem.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <ThumbsDown className="h-4 w-4" />
                                <span>{problem.dislikes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Link href={problem.questionLink} target='_blank'>
                                    <ExternalLink className='h-4 w-4' />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {problem.topicTags.map((tag) => (
                            <Badge key={tag.slug} variant="secondary">
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}