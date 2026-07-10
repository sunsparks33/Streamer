import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://botrix.live/api/public/leaderboard?platform=kick&user=reda-3x", {
      next: { revalidate: 25 }, // Cache the leaderboard data for 25 seconds
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    if (!res.ok) {
      return NextResponse.json({ error: `BotRix responded with status: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
