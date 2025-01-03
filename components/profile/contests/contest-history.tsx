'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import type { ContestHistory } from '@/lib/types';

export function ContestHistoryChart({ history }: { history: ContestHistory[] }) {
  const attendedContests = history.filter((contest) => contest.attended);
  const data = attendedContests.map((contest) => ({
    date: new Date(contest.contest.startTime * 1000),
    rating: contest.rating,
    solved: contest.problemsSolved,
    total: contest.totalProblems,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contest Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(date, 'MMM d')}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(date) => format(date, 'MMM d, yyyy')}
                formatter={(value: number) => [value, 'Rating']}
              />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="hsl(var(--primary))"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}