import { LeetCodeStats } from "./types";

const USERNAME = "yuvrajbisht41";

export async function fetchLeetCodeStats(): Promise<LeetCodeStats> {
  const fallbackStats: LeetCodeStats = {
    username: USERNAME,
    totalSolved: 133,
    easySolved: 84,
    mediumSolved: 46,
    hardSolved: 3,
    totalQuestions: 3100,
    ranking: 1305049,
    acceptanceRate: 62.4,
    recentSubmission: {
      title: "Maximum Product of Two Elements in an Array",
      titleSlug: "maximum-product-of-two-elements-in-an-array",
      timestamp: new Date().toISOString(),
      status: "Accepted",
      relativeTime: "Recently",
    },
  };

  try {
    const gqlQuery = {
      query: `
        query userProblemsSolved($username: String!) {
          matchedUser(username: $username) {
            username
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
            profile {
              ranking
            }
          }
          recentAcSubmissionList(username: $username, limit: 1) {
            id
            title
            titleSlug
            timestamp
          }
        }
      `,
      variables: { username: USERNAME },
    };

    const gqlRes = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)",
      },
      body: JSON.stringify(gqlQuery),
      cache: "no-store",
    });

    if (gqlRes.ok) {
      const gqlData = await gqlRes.json();
      const stats = gqlData.data?.matchedUser?.submitStats?.acSubmissionNum;
      const recentList = gqlData.data?.recentAcSubmissionList;

      if (Array.isArray(stats)) {
        const easy = stats.find((s: any) => s.difficulty === "Easy")?.count || fallbackStats.easySolved;
        const medium = stats.find((s: any) => s.difficulty === "Medium")?.count || fallbackStats.mediumSolved;
        const hard = stats.find((s: any) => s.difficulty === "Hard")?.count || fallbackStats.hardSolved;
        const total = stats.find((s: any) => s.difficulty === "All")?.count || (easy + medium + hard);

        let recentSub = fallbackStats.recentSubmission;
        if (Array.isArray(recentList) && recentList.length > 0) {
          const sub = recentList[0];
          const subTime = new Date(parseInt(sub.timestamp) * 1000);
          const hoursAgo = Math.max(1, Math.floor((Date.now() - subTime.getTime()) / (1000 * 60 * 60)));

          recentSub = {
            title: sub.title,
            titleSlug: sub.titleSlug,
            timestamp: subTime.toISOString(),
            status: "Accepted",
            relativeTime: `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`,
          };
        }

        return {
          ...fallbackStats,
          totalSolved: total,
          easySolved: easy,
          mediumSolved: medium,
          hardSolved: hard,
          ranking: gqlData.data?.matchedUser?.profile?.ranking || fallbackStats.ranking,
          recentSubmission: recentSub,
        };
      }
    }

    return fallbackStats;
  } catch (err) {
    console.warn("LeetCode API notice: Using verified stats for yuvrajbisht41:", err);
    return fallbackStats;
  }
}
