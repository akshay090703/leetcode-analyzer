'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { LanguageStats } from '@/lib/types';

export function LanguageDistribution({ stats }: { stats: LanguageStats }) {
  const languages = stats.matchedUser.languageProblemCount;
  const totalSolved = languages.reduce((acc, lang) => acc + lang.problemsSolved, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Languages Used</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {languages.map((lang) => (
          <div key={lang.languageName}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{lang.languageName}</span>
              <span className="text-sm text-muted-foreground">
                {lang.problemsSolved} problems ({((lang.problemsSolved / totalSolved) * 100).toFixed(1)}%)
              </span>
            </div>
            <Progress
              value={(lang.problemsSolved / totalSolved) * 100}
              className="h-2"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}