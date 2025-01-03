'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function SubmissionCalendar({ calendar }: { calendar: any }) {
  const data = Object.entries(calendar || {}).map(([timestamp, count]) => ({
    date: new Date(parseInt(timestamp) * 1000),
    count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submission Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <XAxis
                dataKey="date"
                domain={['auto', 'auto']}
                name="Date"
                tickFormatter={(date) => date.toLocaleDateString()}
              />
              <YAxis dataKey="count" name="Submissions" />
              <Tooltip
                formatter={(value: any, name: any) => [value, 'Submissions']}
                labelFormatter={(label: any) =>
                  new Date(label).toLocaleDateString()
                }
              />
              <Scatter
                data={data}
                fill="hsl(var(--chart-1))"
                line={{ stroke: 'hsl(var(--chart-2))' }}
                lineType="joint"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}