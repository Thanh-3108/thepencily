import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.DISCORD_CLIENT_ID || process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;

  const origin = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
  const redirectUri = `${origin}/api/auth/discord/callback`;

  if (!clientId) {
    // If not configured, redirect back with query notification so the user sees a helpful prompt
    return NextResponse.redirect(`${origin}/dashboard?auth_error=missing_discord_credentials`);
  }

  // Generate Discord OAuth2 authorization URL with guilds.join to auto-add user to server
  const scope = encodeURIComponent("identify email guilds.join");
  const encodedRedirectUri = encodeURIComponent(redirectUri);
  const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodedRedirectUri}&scope=${scope}`;

  return NextResponse.redirect(discordAuthUrl);
}
