'use client';

import { useEffect, useState, Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ProfileHeader } from '@/components/profile/profile-header';
import { ProfileStats } from '@/components/profile/profile-stats';
import { SubmissionCalendar } from '@/components/profile/submission-calendar';
import { LanguageDistribution } from '@/components/profile/language-distribution';
import { DifficultyDistribution } from '@/components/profile/difficulty-distribution';
import { RecentSubmissions } from '@/components/profile/recent-submissions';
import { SubmissionStats } from '@/components/profile/submission-stats';
import { SkillOverview } from '@/components/profile/skills/skill-overview';
import { BadgeShowcase } from '@/components/profile/badges/badge-showcase';
import { ContestHistoryChart } from '@/components/profile/contests/contest-history';
import { Skeleton } from '@/components/ui/skeleton';
import { getFullProfile, getLanguageStats, getSkillStats, getBadges, getContestHistory, getProfileInfo } from '@/lib/api';

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [data, setData] = useState<any>({
    profileInfo: null,
    profileData: null,
    languageStats: null,
    skillStats: null,
    badgeData: null,
    contestHistory: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { username } = params;

        const [profileInfo, profileData, languageStats, skillStats, badgeData, contestHistory] =
          await Promise.all([
            getProfileInfo(username).catch(() => null),
            getFullProfile(username).catch(() => null),
            getLanguageStats(username).catch(() => null),
            getSkillStats(username).catch(() => null),
            getBadges(username).catch(() => null),
            getContestHistory(username).catch(() => null),
          ]);

        if (!profileInfo || !profileData || (!languageStats && !skillStats && !badgeData && !contestHistory)) {
          notFound();
        } else {
          setData({
            profileInfo,
            profileData,
            languageStats,
            skillStats,
            badgeData,
            contestHistory,
          });
        }
      } catch (error) {
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return (
    loading ? <Skeleton className="h-80 w-80" /> :
      (data.profileInfo ? <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <ProfileHeader profile={data.profileInfo} profileData={data.profileData} />
        </Suspense>

        {data.badgeData && (
          <div className="mt-8">
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <BadgeShowcase data={data.badgeData} />
            </Suspense>
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <ProfileStats profile={data.profileData} />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <DifficultyDistribution profile={data.profileData} />
          </Suspense>
        </div>

        {data.skillStats && (
          <div className="mt-8">
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <SkillOverview stats={data.skillStats} />
            </Suspense>
          </div>
        )}

        {data.contestHistory && (
          <div className="mt-8">
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <ContestHistoryChart history={data.contestHistory} />
            </Suspense>
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {data.languageStats && (
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <LanguageDistribution stats={data.languageStats} />
            </Suspense>
          )}

          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <SubmissionStats stats={data.profileData?.matchedUserStats} />
          </Suspense>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <SubmissionCalendar calendar={data.profileData?.submissionCalendar} />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <RecentSubmissions submissions={data.profileData?.recentSubmissions} />
          </Suspense>
        </div>
      </div> : <div>No content found!</div>)
  );
}
