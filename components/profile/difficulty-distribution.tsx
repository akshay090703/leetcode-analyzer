'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export function DifficultyDistribution({ profile }: { profile: any }) {
  const data = [
    {
      name: 'Easy',
      value: profile.easySolved || 0,
      color: 'hsl(var(--chart-1))',
    },
    {
      name: 'Medium',
      value: profile.mediumSolved || 0,
      color: 'hsl(var(--chart-2))',
    },
    {
      name: 'Hard',
      value: profile.hardSolved || 0,
      color: 'hsl(var(--chart-3))',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Difficulty Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}