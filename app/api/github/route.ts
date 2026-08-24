import { NextResponse } from "next/server";
import { fetchGitHubData } from "@/lib/github";

export const revalidate = 3600; // Hourly revalidation

export async function GET() {
  try {
    const data = await fetchGitHubData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
