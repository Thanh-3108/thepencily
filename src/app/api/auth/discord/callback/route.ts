import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const origin = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(`${origin}/dashboard?auth_error=cancelled`);
  }

  const clientId = process.env.DISCORD_CLIENT_ID || process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = `${origin}/api/auth/discord/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${origin}/dashboard?auth_error=missing_credentials`);
  }

  try {
    // 1. Exchange OAuth code for Access Token
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error("Discord Token Error:", errText);
      return NextResponse.redirect(`${origin}/dashboard?auth_error=token_exchange_failed`);
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2. Fetch User Profile from Discord API
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userRes.ok) {
      console.error("Discord User Fetch Error:", await userRes.text());
      return NextResponse.redirect(`${origin}/dashboard?auth_error=user_fetch_failed`);
    }

    const discordUser = await userRes.json();

    // 3. Compute Discord Avatar URL
    let avatarUrl = "";
    if (discordUser.avatar) {
      const isAnimated = discordUser.avatar.startsWith("a_");
      avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${isAnimated ? "gif" : "png"}?size=128`;
    } else {
      // Default Discord avatar index (0-5)
      const lastDigits = parseInt(discordUser.id.slice(-4) || "0", 10);
      const defaultIndex = Math.abs(lastDigits) % 5;
      avatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
    }

    // 4. Construct Student User Object
    const studentSession = {
      discordId: discordUser.id,
      name: discordUser.global_name || discordUser.username,
      handle: `@${discordUser.username}`,
      discord: discordUser.username,
      email: discordUser.email || "",
      avatar: avatarUrl,
      verified: true,
      role: "Học viên Discord • The Pencily",
      isDiscordLinked: true,
    };

    // 5. Auto-join user into Discord Server (guilds.join)
    const botToken = process.env.DISCORD_BOT_TOKEN;
    const guildId = process.env.DISCORD_GUILD_ID;
    let joinedServer = false;

    if (botToken && guildId) {
      try {
        const joinRes = await fetch(
          `https://discord.com/api/guilds/${guildId}/members/${discordUser.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bot ${botToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: accessToken,
            }),
          }
        );

        if (joinRes.status === 201) {
          console.log(`[Discord OAuth2] Đã tự động thêm ${discordUser.username} (${discordUser.id}) vào server Discord!`);
          joinedServer = true;
        } else if (joinRes.status === 204) {
          console.log(`[Discord OAuth2] Người dùng ${discordUser.username} đã có trong server Discord.`);
          joinedServer = true;
        } else {
          const errDetail = await joinRes.text();
          console.warn(`[Discord OAuth2] Không thể ép vào server (status ${joinRes.status}):`, errDetail);
        }
      } catch (joinErr) {
        console.warn("[Discord OAuth2] Lỗi gọi API add guild member:", joinErr);
      }
    } else {
      console.info("[Discord OAuth2] Chưa cài DISCORD_BOT_TOKEN hoặc DISCORD_GUILD_ID trong .env.local để kích hoạt tự động thêm vào server.");
    }

    // 6. Create redirect response and set cookie for client-side state hydration
    const redirectUrl = new URL(`${origin}/onboarding`);
    redirectUrl.searchParams.set("auth", "discord_success");
    if (joinedServer) {
      redirectUrl.searchParams.set("server_joined", "true");
    }

    const response = NextResponse.redirect(redirectUrl.toString());
    response.cookies.set("pencily_discord_user", JSON.stringify(studentSession), {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: false, // Accessible by client context to hydrate immediately
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    console.error("Discord OAuth Error:", err);
    return NextResponse.redirect(`${origin}/dashboard?auth_error=server_error`);
  }
}
