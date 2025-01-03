'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import type { Badge } from '@/lib/types';

interface BadgeCardProps {
  badge: Badge;
  isActive?: boolean;
}

export function BadgeCard({ badge, isActive }: BadgeCardProps) {
  return (
    <Card className={isActive ? 'border-primary' : undefined}>
      <CardHeader>
        <CardTitle className="text-sm truncate">{badge.displayName}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center p-4">
        <div className="relative h-24 w-24">
          <Image
            src={badge.icon}
            alt={badge.displayName}
            fill
            className="object-contain"
          />
        </div>
      </CardContent>
    </Card>
  );
}