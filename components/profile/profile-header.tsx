'use client';

import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target } from 'lucide-react';

export function ProfileHeader({ profile, profileData }: { profile: any, profileData: any }) {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
        <Avatar className="h-24 w-24">
          <img
            src={profile.avatar || 'https://github.com/shadcn.png'}
            alt={profile.username}
            className="aspect-square h-full w-full"
          />
        </Avatar>
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h1 className="text-2xl font-bold">{profile.username}</h1>
          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              Rank {profileData.ranking}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {profileData.reputation} reputation
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              {profileData.totalSolved} solved
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}