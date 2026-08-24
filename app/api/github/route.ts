import { NextResponse } from "next/server";
import { fetchGitHubData } from "@/lib/github";

export const dynamic = "force-dynamic";
export const revalidate = 60; // 60 seconds revalidation

export async function GET() {
  try {
    const data = await fetchGitHubData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
