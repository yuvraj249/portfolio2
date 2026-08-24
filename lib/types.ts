export interface GitHubContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
  updatedAt: string;
}

export interface GitHubCommitEvent {
  repoName: string;
  message: string;
  timestamp: string;
  url: string;
  relativeTime: string;
}

export interface GitHubData {
  totalContributions: number;
  contributions: GitHubContributionDay[];
  pinnedRepos: GitHubRepo[];
  lastPush: GitHubCommitEvent | null;
  username: string;
  avatarUrl: string;
  publicReposCount: number;
}

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
  ranking: number;
  acceptanceRate: number;
  recentSubmission?: {
    title: string;
    titleSlug: string;
    timestamp: string;
    status: string;
    relativeTime: string;
  };
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level?: string;
    highlight?: boolean;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedBullets: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  paperUrl?: string;
  doiUrl?: string;
  featured: boolean;
  metrics?: string;
  category: "Full Stack" | "QA / Automation" | "AI & ML" | "IoT / Hardware";
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  type: "Internship" | "Full-time" | "Contract";
  achievements: string[];
  tech: string[];
  active?: boolean;
}
