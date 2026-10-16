import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) { return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin}/signin?auth_error=legacy_discord_flow`); }
