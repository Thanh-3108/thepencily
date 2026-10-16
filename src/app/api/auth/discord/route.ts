import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  const origin = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
  const ready = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_DISCORD_ENABLED === "true");
  // PKCE starts in the browser SDK, which stores the verifier for the callback.
  return NextResponse.redirect(`${origin}/signin?${ready ? "provider=discord" : "auth_error=discord_not_configured"}`);
}
