'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCard } from './badge-card';
import type { BadgeResponse } from '@/lib/types';

export function BadgeShowcase({ data }: { data: BadgeResponse }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Badges ({data.badgesCount})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.badges.map((badge, index) => (
            <BadgeCard
              key={index}
              badge={badge}
              isActive={badge.id === data.activeBadge?.id}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}