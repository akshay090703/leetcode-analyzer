'use client';

import { SkillCategory } from './skill-category';
import type { SkillStats } from '@/lib/types';

export function SkillOverview({ stats }: { stats: SkillStats }) {
  const { advanced, intermediate, fundamental } = stats.data.matchedUser.tagProblemCounts;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <SkillCategory title="Advanced Topics" skills={advanced} />
      <SkillCategory title="Intermediate Topics" skills={intermediate} />
      <SkillCategory title="Fundamental Topics" skills={fundamental} />
    </div>
  );
}