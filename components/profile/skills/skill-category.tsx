'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { SkillTag } from '@/lib/types';

interface SkillCategoryProps {
  title: string;
  skills: SkillTag[];
}

export function SkillCategory({ title, skills }: SkillCategoryProps) {
  const maxSolved = Math.max(...skills.map(skill => skill.problemsSolved));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.tagSlug}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.tagName}</span>
              <span className="text-sm text-muted-foreground">
                {skill.problemsSolved} solved
              </span>
            </div>
            <Progress
              value={(skill.problemsSolved / maxSolved) * 100}
              className="h-2"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}