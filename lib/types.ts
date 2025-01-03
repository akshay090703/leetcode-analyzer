// Profile Types
export interface LeetCodeProfile {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  contributionPoint: number;
  reputation: number;
  submissionCalendar: Record<string, number>;
  recentSubmissions: Submission[];
  matchedUserStats: SubmissionStats;
}

export interface Submission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

export interface SubmissionStats {
  acSubmissionNum: Array<{
    difficulty: string;
    count: number;
    submissions: number;
  }>;
}

// Badge Types
export interface Badge {
  id: string;
  displayName: string;
  icon: string;
  creationDate: string;
}

export interface BadgeResponse {
  badgesCount: number;
  badges: Badge[];
  upcomingBadges: {
    name: string;
    icon: string;
  }[];
  activeBadge: Badge | null;
}

// Contest Types
export interface ContestHistory {
  attended: boolean;
  rating: number;
  ranking: number;
  problemsSolved: number;
  totalProblems: number;
  contest: {
    title: string;
    startTime: number;
  };
}

// Language Stats
export interface LanguageStats {
  matchedUser: {
    languageProblemCount: Array<{
      languageName: string;
      problemsSolved: number;
    }>;
  };
}

// Skill Stats
export interface SkillTag {
  tagName: string;
  tagSlug: string;
  problemsSolved: number;
}

export interface SkillStats {
  data: {
    matchedUser: {
      tagProblemCounts: {
        advanced: SkillTag[];
        intermediate: SkillTag[];
        fundamental: SkillTag[];
      };
    };
  };
}

// Problem Types
export interface Problem {
  link: string;
  questionId: string;
  questionFrontendId: string;
  questionTitle: string;
  titleSlug: string;
  difficulty: string;
  isPaidOnly: boolean;
  question: string;
  exampleTestcases: string;
  topicTags: TopicTag[];
  hints: string[];
  solution: {
    id: string;
    canSeeDetail: boolean;
    paidOnly: boolean;
    hasVideoSolution: boolean;
  };
  likes: number;
  dislikes: number;
  similarQuestions: string;
}

export interface TopicTag {
  name: string;
  slug: string;
  translatedName: string | null;
}

export interface DailyQuestion extends Problem {
  date: string;
  questionLink: string;
}

export interface ProblemListResponse {
  totalQuestions: number;
  count: number;
  problemsetQuestionList: Array<{
    acRate: number;
    difficulty: string;
    questionFrontendId: string;
    isPaidOnly: boolean;
    title: string;
    titleSlug: string;
    topicTags: Array<{
      name: string;
      id: string;
      slug: string;
    }>;
    hasSolution: boolean;
    hasVideoSolution: boolean;
    status: string;
  }>;
}

// Calendar Types
export interface CalendarResponse {
  submissionCalendar: string;
}

export interface DiscussionPost {
  id: number;
  creationDate: number;
  contentPreview: string;
  author: {
    username: string;
    isActive: boolean;
    profile: {
      userAvatar: string;
    };
  } | null;
}

export interface TrendingDiscussion {
  id: number;
  title: string;
  post: DiscussionPost;
}

export interface TrendingDiscussionsResponse {
  cachedTrendingCategoryTopics: TrendingDiscussion[];
}
