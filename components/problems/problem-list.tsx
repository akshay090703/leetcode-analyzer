'use client';

import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getProblems } from '@/lib/api/problems';
import type { ProblemListResponse } from '@/lib/types';
import { Checkbox } from '../ui/checkbox';

export function ProblemList({ tag, difficulty }: { tag: string, difficulty: "EASY" | "MEDIUM" | "HARD" | undefined }) {
    const [problems, setProblems] = useState<ProblemListResponse | null>(null);

    const [debouncedTag, setDebouncedTag] = useState(tag);

    const tags = debouncedTag.split(' ');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTag(tag);
        }, 500);
        return () => clearTimeout(handler);
    }, [tag]);

    useEffect(() => {
        getProblems({ limit: 20, tags: tags, difficulty: difficulty }).then(setProblems);
    }, [debouncedTag, difficulty]);

    return (
        problems ? (<div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Video Solution</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Acceptance</TableHead>
                        <TableHead>Topics</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {problems.problemsetQuestionList.map((problem) => (
                        <TableRow key={problem.titleSlug}>
                            <TableCell>
                                <Checkbox checked={problem.hasVideoSolution} disabled />
                            </TableCell>
                            <TableCell>
                                <a
                                    href={`https://leetcode.com/problems/${problem.titleSlug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary"
                                >
                                    {problem.title}
                                </a>
                            </TableCell>
                            <TableCell>
                                <Badge variant={
                                    problem.difficulty === 'Easy' ? 'default' :
                                        problem.difficulty === 'Medium' ? 'secondary' :
                                            'destructive'
                                }>
                                    {problem.difficulty}
                                </Badge>
                            </TableCell>
                            <TableCell>{problem.acRate.toFixed(1)}%</TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {problem.topicTags.slice(0, 3).map((tag) => (
                                        <Badge key={tag.id} variant="secondary">
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>)
            : null);
}