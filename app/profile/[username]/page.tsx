import { Suspense } from 'react';
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
import {
  getFullProfile,
  getLanguageStats,
  getSkillStats,
  getBadges,
  getContestHistory,
  getProfileInfo
} from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';


export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  // console.log(params.username);

  try {
    const [profileInfo, profileData, languageStats, skillStats, badgeData, contestHistory] =
      await Promise.all([
        getProfileInfo(params.username).catch(() => null),
        getFullProfile(params.username).catch(() => null),
        getLanguageStats(params.username).catch(() => null),
        getSkillStats(params.username).catch(() => null),
        getBadges(params.username).catch(() => null),
        getContestHistory(params.username).catch(() => null),
      ]);

    // If all requests failed or profile data is missing, show 404
    if (!profileInfo || !profileData || (!languageStats && !skillStats && !badgeData && !contestHistory)) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <ProfileHeader profile={profileInfo} profileData={profileData} />
        </Suspense>

        {badgeData && (
          <div className="mt-8">
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <BadgeShowcase data={badgeData} />
            </Suspense>
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <ProfileStats profile={profileData} />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <DifficultyDistribution profile={profileData} />
          </Suspense>
        </div>

        {skillStats && (
          <div className="mt-8">
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <SkillOverview stats={skillStats} />
            </Suspense>
          </div>
        )}

        {contestHistory && (
          <div className="mt-8">
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <ContestHistoryChart history={contestHistory} />
            </Suspense>
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {languageStats && (
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <LanguageDistribution stats={languageStats} />
            </Suspense>
          )}

          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <SubmissionStats stats={profileData.matchedUserStats} />
          </Suspense>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <SubmissionCalendar calendar={profileData.submissionCalendar} />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <RecentSubmissions submissions={profileData.recentSubmissions} />
          </Suspense>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}