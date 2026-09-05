"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitCommit, GitFork, Star, Trophy, RefreshCw, ExternalLink, Code } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import TiltCard from "../ui/TiltCard";
import AnimatedCounter from "../ui/AnimatedCounter";
import { GitHubData, LeetCodeStats } from "@/lib/types";

export default function LiveStats() {
  const [gitHubData, setGitHubData] = useState<GitHubData | null>(null);
  const [leetCodeStats, setLeetCodeStats] = useState<LeetCodeStats | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAllData = async () => {
    setIsRefreshing(true);
    try {
      const [ghRes, lcRes] = await Promise.all([
        fetch(`/api/github?t=${Date.now()}`, { cache: "no-store" }),
        fetch(`/api/leetcode?t=${Date.now()}`, { cache: "no-store" }),
      ]);

      if (ghRes.ok) {
        const gh = await ghRes.json();
        setGitHubData(gh);
      }
      if (lcRes.ok) {
        const lc = await lcRes.json();
        setLeetCodeStats(lc);
      }
    } catch (err) {
      console.error("Error fetching live metrics:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 4:
        return "bg-emerald-bright shadow-[0_0_8px_rgba(52,211,153,0.8)]";
      case 3:
        return "bg-emerald-accent shadow-[0_0_6px_rgba(16,185,129,0.6)]";
      case 2:
        return "bg-emerald-muted/80";
      case 1:
        return "bg-forest-700";
      default:
        return "bg-forest-850/80 border border-forest-750/50";
    }
  };

  const totalSolved = leetCodeStats?.totalSolved || 133;

  return (
    <section id="stats" className="py-24 bg-forest-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <SectionHeader
            badge="LIVE INTEGRATIONS"
            title="Living Activity & Real-Time Stats"
            description="Real-time synchronized activity feed from GitHub commits and LeetCode problem solves."
          />

          <div className="flex items-center gap-3 mb-12 sm:mb-0">
            <span className="flex items-center gap-2 text-xs font-mono text-emerald-bright bg-forest-850 px-3 py-1.5 rounded-full border border-forest-750">
              <span className="h-2 w-2 rounded-full bg-emerald-bright animate-ping" />
              <span>Live Synced</span>
            </span>

            <button
              onClick={fetchAllData}
              disabled={isRefreshing}
              className="p-2 rounded-full bg-forest-850 hover:bg-forest-800 border border-forest-750 text-text-muted hover:text-text-primary transition-colors disabled:opacity-50"
              title="Refresh Live Data"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-emerald-bright" : ""}`} />
            </button>
          </div>
        </div>

        {/* Live Counters Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <TiltCard glowColor="emerald">
            <div className="text-xs font-mono text-text-muted">Total Contributions</div>
            <div className="text-3xl font-sans font-extrabold text-emerald-bright mt-1">
              <AnimatedCounter value={gitHubData?.totalContributions || 408} />
            </div>
            <div className="text-[11px] font-mono text-text-secondary mt-1">Past 12 Months</div>
          </TiltCard>

          <TiltCard glowColor="emerald">
            <div className="text-xs font-mono text-text-muted">Public Repositories</div>
            <div className="text-3xl font-sans font-extrabold text-text-primary mt-1">
              <AnimatedCounter value={gitHubData?.publicReposCount || 12} />
            </div>
            <div className="text-[11px] font-mono text-text-secondary mt-1">GitHub @yuvraj249</div>
          </TiltCard>

          <TiltCard glowColor="gold">
            <div className="text-xs font-mono text-text-muted">LeetCode Solved</div>
            <div className="text-3xl font-sans font-extrabold text-gold-accent mt-1">
              <AnimatedCounter value={totalSolved} />
            </div>
            <div className="text-[11px] font-mono text-text-secondary mt-1">Easy, Med & Hard</div>
          </TiltCard>

          <TiltCard glowColor="gold">
            <div className="text-xs font-mono text-text-muted">Global Ranking</div>
            <div className="text-3xl font-sans font-extrabold text-text-primary mt-1">
              <AnimatedCounter value={leetCodeStats?.ranking || 1305049} prefix="#" />
            </div>
            <div className="text-[11px] font-mono text-text-secondary mt-1">LeetCode @yuvrajbisht41</div>
          </TiltCard>
        </div>

        {/* GitHub Contribution Heatmap */}
        <div className="mb-10">
          <TiltCard className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-mono font-bold text-text-primary">
                <GitCommit className="h-4 w-4 text-emerald-bright" />
                <span>GitHub Contribution Heatmap (yuvraj249)</span>
              </div>
              <a
                href="https://github.com/yuvraj249"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-emerald-bright hover:underline flex items-center gap-1"
              >
                <span>View Profile</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Heatmap Grid */}
            <div className="p-4 rounded-xl bg-forest-950 border border-forest-750 overflow-x-auto">
              <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-[700px]">
                {gitHubData?.contributions.map((day, idx) => (
                  <motion.div
                    key={day.date + idx}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.002 }}
                    className={`h-3 w-3 rounded-sm ${getHeatmapColor(day.level)} group relative cursor-pointer`}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 px-2 py-1 bg-forest-800 text-[10px] font-mono text-text-primary rounded shadow-xl whitespace-nowrap border border-forest-700 pointer-events-none">
                      <strong>{day.count} commits</strong> on {day.date}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Heatmap Legend */}
              <div className="flex items-center justify-between text-[11px] font-mono text-text-muted mt-3 pt-3 border-t border-forest-800">
                <span>180 Days Activity</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <span className="h-2.5 w-2.5 rounded-sm bg-forest-850 border border-forest-750" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-forest-700" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-emerald-muted" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-emerald-accent" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-emerald-bright" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Live Activity Cards Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* GitHub Latest Push Event Card */}
          <div className="lg:col-span-6">
            <TiltCard className="h-full flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                    Latest GitHub Commit
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-bright">
                    <span className="h-2 w-2 rounded-full bg-emerald-bright animate-ping" />
                    <span>{gitHubData?.lastPush?.relativeTime || "Recently"}</span>
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-forest-950 border border-forest-750 font-mono text-xs space-y-2">
                  <div className="text-emerald-bright font-bold flex items-center gap-2">
                    <GitFork className="h-3.5 w-3.5" />
                    <span>{gitHubData?.lastPush?.repoName || "yuvraj249/product-catalogue"}</span>
                  </div>
                  <p className="text-text-primary italic">
                    "{gitHubData?.lastPush?.message || "feat: implement JWT authentication handler & GORM inventory models"}"
                  </p>
                </div>
              </div>

              {/* Pinned Repos Quick Badges */}
              <div className="pt-3 border-t border-forest-750">
                <span className="text-[11px] font-mono text-text-muted block mb-2">Featured Repos:</span>
                <div className="flex flex-wrap gap-2">
                  {gitHubData?.pinnedRepos.map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-forest-800 hover:bg-forest-750 border border-forest-700 text-xs font-mono text-text-primary flex items-center gap-1.5 transition-colors"
                    >
                      <Code className="h-3 w-3 text-emerald-bright" />
                      <span>{repo.name}</span>
                      <span className="text-[10px] text-gold-accent flex items-center gap-0.5">
                        <Star className="h-2.5 w-2.5" /> {repo.stars}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>

          {/* LeetCode Difficulty Breakdown Card */}
          <div className="lg:col-span-6">
            <TiltCard glowColor="gold" className="h-full flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                    LeetCode Solved Breakdown
                  </span>
                  <span className="text-xs font-mono text-gold-accent font-bold">
                    {totalSolved} Total
                  </span>
                </div>

                {/* Easy / Medium / Hard Progress Bars */}
                <div className="space-y-3 font-mono text-xs">
                  {/* Easy */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-emerald-bright font-semibold">Easy</span>
                      <span className="text-text-secondary">{leetCodeStats?.easySolved || 84} Solved</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-forest-950 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${((leetCodeStats?.easySolved || 84) / totalSolved) * 100}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-emerald-bright rounded-full"
                      />
                    </div>
                  </div>

                  {/* Medium */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gold-bright font-semibold">Medium</span>
                      <span className="text-text-secondary">{leetCodeStats?.mediumSolved || 46} Solved</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-forest-950 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${((leetCodeStats?.mediumSolved || 46) / totalSolved) * 100}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gold-accent rounded-full"
                      />
                    </div>
                  </div>

                  {/* Hard */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-red-400 font-semibold">Hard</span>
                      <span className="text-text-secondary">{leetCodeStats?.hardSolved || 3} Solved</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-forest-950 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${((leetCodeStats?.hardSolved || 3) / totalSolved) * 100}%` }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-full bg-red-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest LeetCode Submission Pill */}
              <div className="pt-3 border-t border-forest-750">
                <div className="p-3 rounded-lg bg-forest-950 border border-forest-750 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-gold-accent shrink-0" />
                    <div>
                      <div className="text-text-primary font-bold">
                        {leetCodeStats?.recentSubmission?.title || "Keyboard Row"}
                      </div>
                      <div className="text-[10px] text-emerald-bright">
                        Status: {leetCodeStats?.recentSubmission?.status || "Accepted"} &bull; {leetCodeStats?.recentSubmission?.relativeTime || "Recently"}
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://leetcode.com/u/yuvrajbisht41/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded hover:bg-forest-800 text-text-muted hover:text-text-primary"
                    title="View LeetCode Profile"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
