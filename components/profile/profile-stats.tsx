'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CircleDot,
  Trophy,
  Award,
  Target,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export function ProfileStats({ profile }: { profile: any }) {
  // console.log(profile);

  const [acceptanceRate, setAcceptanceRate] = useState("0");

  useEffect(() => {
    const calculateAcceptanceRate = () => {
      setAcceptanceRate((profile.matchedUserStats.acSubmissionNum[0].count / (profile.matchedUserStats.acSubmissionNum[0].submissions) * 100).toFixed(1));
    }

    calculateAcceptanceRate();
  }, [profile])

  const stats = [
    {
      label: 'Ranking',
      value: profile.ranking || 'N/A',
      icon: Trophy,
      description: 'Current Leetcode Ranking',
    },
    {
      label: 'Total Problems',
      value: profile.totalQuestions || 0,
      icon: Target,
      description: 'Available problems',
    },
    {
      label: 'Solved',
      value: profile.totalSolved || 0,
      icon: CheckCircle2,
      description: 'Problems solved',
    },
    {
      label: 'Acceptance Rate',
      value: `${acceptanceRate}%`,
      icon: CircleDot,
      description: 'Submission acceptance rate',
    },
    {
      label: 'Contributions',
      value: profile.contributionPoint || 0,
      icon: Award,
      description: 'Community contributions',
    },
    {
      label: 'Submissions',
      value: profile.totalSubmissions[0].submissions || 0,
      icon: XCircle,
      description: 'Total submissions',
    },
  ];



  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
        <CardDescription>Overview of your LeetCode journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 rounded-lg border p-4"
            >
              {/* <stat.icon className="h-6 w-6 text-muted-foreground" /> */}
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-center text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}