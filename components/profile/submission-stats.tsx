'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface SubmissionStats {
  acSubmissionNum: Array<{
    difficulty: string;
    count: number;
    submissions: number;
  }>;
}

export function SubmissionStats({ stats }: { stats: SubmissionStats }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Submission Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Difficulty</TableHead>
              <TableHead>Solved</TableHead>
              <TableHead>Total Submissions</TableHead>
              <TableHead>Acceptance Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.acSubmissionNum.map((stat) => (
              <TableRow key={stat.difficulty}>
                <TableCell className="font-medium">{stat.difficulty}</TableCell>
                <TableCell>{stat.count}</TableCell>
                <TableCell>{stat.submissions}</TableCell>
                <TableCell>
                  {((stat.count / stat.submissions) * 100).toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}