import { NextResponse } from "next/server";
import { fetchLeetCodeStats } from "@/lib/leetcode";

export const revalidate = 3600; // Hourly revalidation

export async function GET() {
  try {
    const stats = await fetchLeetCodeStats();
    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch LeetCode stats" },
      { status: 500 }
    );
  }
}
