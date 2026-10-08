import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.DISCORD_CLIENT_ID || process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const isConfigured = Boolean(clientId && clientSecret);

  return NextResponse.json({
    configured: isConfigured,
    clientId: clientId || null,
  });
}
