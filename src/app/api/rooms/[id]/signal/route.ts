import { authenticate, body, dbError, fail, rateLimit } from "@/lib/server/backend";
import { asObject, text, PlatformError } from "@/lib/platform";
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; const { db, user } = await authenticate(request);
    const connection = new URL(request.url).searchParams.get("connectionId");
    const member = await db.from("room_members").select("connection_id").eq("connection_id", connection).eq("class_id", id).eq("user_id", user.id).is("left_at", null).maybeSingle(); dbError(member.error);
    if (!member.data) throw new PlatformError("Phiên phòng không còn hoạt động.", 409);
    const result = await db.from("room_signals").select("*").eq("to_connection_id", connection).gt("created_at", new Date(Date.now()-120000).toISOString()).order("created_at").limit(200); dbError(result.error);
    return Response.json({ signals: result.data || [] });
  } catch(error) { return fail(error); }
}
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; const { db, user } = await authenticate(request);
    await rateLimit(`signal:${user.id}`, 600);
    const input = asObject(await body(request));
    const from = text(input.connectionId, "Phiên gửi", 50); const to = text(input.toConnectionId, "Phiên nhận", 50);
    if (from === to || !["hello", "description", "ice"].includes(String(input.kind))) throw new PlatformError("Tín hiệu không hợp lệ.");
    const payload = asObject(input.payload);
    if (JSON.stringify(payload).length > 20000) throw new PlatformError("Tín hiệu quá dài.");
    if (input.kind === "description") {
      const description = asObject(payload.description);
      if (!["offer", "answer"].includes(String(description.type))) throw new PlatformError("SDP không hợp lệ.");
      text(description.sdp, "SDP", 18000);
    }
    const members = await db.from("room_members").select("connection_id,user_id").eq("class_id", id).in("connection_id", [from, to]).is("left_at", null).gt("last_seen_at", new Date(Date.now() - 90000).toISOString()); dbError(members.error);
    if (members.data?.length !== 2 || !members.data.some((member) => member.connection_id === from && member.user_id === user.id)) throw new PlatformError("Phiên gửi hoặc nhận không hợp lệ.", 403);
    const open = await db.from("classes").select("status").eq("id", id).in("status", ["approved", "live", "pending_demo"]).maybeSingle(); dbError(open.error);
    if (!open.data) throw new PlatformError("Phòng học đã đóng.", 409);
    const result = await db.from("room_signals").insert({ class_id: id, from_connection_id: from, to_connection_id: to, kind: input.kind, payload }); dbError(result.error);
    return Response.json({ sent: true });
  } catch (error) { return fail(error); }
}
