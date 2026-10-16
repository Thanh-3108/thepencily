import { authenticate, body, dbError, fail, rateLimit } from "@/lib/server/backend";
import { asObject, text, PlatformError } from "@/lib/platform";
export async function POST(request: Request) {
  try {
    const { db, user } = await authenticate(request); const input = asObject(await body(request));
    await rateLimit(`attendance:${user.id}`, 25);
    const connectionId = text(input.connectionId, "Phiên học", 50);
    const member = await db.from("room_members").select("connection_id").eq("connection_id", connectionId).eq("user_id", user.id).is("left_at", null).maybeSingle(); dbError(member.error);
    if (!member.data) throw new PlatformError("Phiên học không còn hoạt động.", 409);
    if (input.phase === "challenge") {
      const result = await db.rpc("issue_attendance_challenge", { p_connection: connectionId, p_user: user.id }); dbError(result.error);
      return Response.json({ challenge: result.data });
    }
    if (input.phase === "ack") {
      const result = await db.rpc("ack_attendance_challenge", { p_challenge: text(input.challengeId, "Yêu cầu", 50), p_nonce: text(input.nonce, "Mã xác nhận", 50), p_connection: connectionId, p_student: text(input.peerConnectionId, "Phiên học viên", 50), p_user: user.id }); dbError(result.error);
      return Response.json({ acknowledged: true });
    }
    if (input.phase === "claim") {
      const result = await db.rpc("claim_attendance_minute", { p_challenge: text(input.challengeId, "Yêu cầu", 50), p_user: user.id }); dbError(result.error);
      const profile = await db.from("users").select("*").eq("id", user.id).single(); dbError(profile.error);
      return Response.json({ profile: profile.data });
    }
    throw new PlatformError("Heartbeat không hợp lệ. Server yêu cầu challenge và xác nhận từ tutor; không chấp nhận peerConnected đơn lẻ.");
  } catch (error) { return fail(error); }
}
