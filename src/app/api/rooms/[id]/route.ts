import { authenticate, body, dbError, fail, rateLimit } from "@/lib/server/backend";
import { asObject, text, PlatformError, isReviewer } from "@/lib/platform";
type Context = { params: Promise<{ id: string }> };
export async function GET(request: Request, context: Context) {
  try {
    const { id } = await context.params; const { db, user, profile } = await authenticate(request);
    const result = await db.from("classes").select("*").eq("id", id).single(); dbError(result.error);
    if (!result.data || (!['approved','live'].includes(result.data.status) && !(result.data.status === 'pending_demo' && (result.data.tutor_id === user.id || isReviewer(profile.role))))) throw new PlatformError("Phòng học chưa mở hoặc đã kết thúc.", 409);
    const peers = await db.from("room_members").select("connection_id,user_id,class_id,name,avatar,is_host,last_seen_at").eq("class_id", id).is("left_at", null).gt("last_seen_at", new Date(Date.now() - 90000).toISOString()); dbError(peers.error);
    return Response.json({ classSession: result.data, peers: peers.data || [] });
  } catch (error) { return fail(error); }
}
export async function POST(request: Request, context: Context) {
  try {
    const { id } = await context.params; const { db, user } = await authenticate(request);
    await rateLimit(`join:${user.id}`, 15);
    const joined = await db.rpc("join_pencily_room", { p_class: id, p_user: user.id }); dbError(joined.error);
    const iceServers: RTCIceServer[] = [{ urls: "stun:stun.l.google.com:19302" }];
    if (process.env.TURN_URL && process.env.TURN_USERNAME && process.env.TURN_CREDENTIAL) iceServers.push({ urls: process.env.TURN_URL.split(","), username: process.env.TURN_USERNAME, credential: process.env.TURN_CREDENTIAL });
    return Response.json({ connectionId: joined.data, iceServers });
  } catch (error) { return fail(error); }
}
export async function PATCH(request: Request, context: Context) {
  try {
    const { id } = await context.params; const { db, user } = await authenticate(request);
    const input = asObject(await body(request));
    const now = new Date().toISOString();
    const result = await db.from("room_members").update({ last_seen_at: now, ...(input.active === true ? { last_activity_at: now } : {}) }).eq("class_id", id).eq("connection_id", text(input.connectionId, "Phiên phòng", 50)).eq("user_id", user.id).is("left_at", null).select("connection_id").maybeSingle(); dbError(result.error);
    if (!result.data) throw new PlatformError("Phiên phòng đã đóng hoặc được mở ở tab khác.", 409);
    return Response.json({ present: true });
  } catch (error) { return fail(error); }
}
export async function DELETE(request: Request, context: Context) {
  try {
    const { id } = await context.params; const { db, user } = await authenticate(request); const input = asObject(await body(request));
    const result = await db.from("room_members").update({ left_at: new Date().toISOString() }).eq("class_id", id).eq("connection_id", text(input.connectionId, "Phiên phòng", 50)).eq("user_id", user.id); dbError(result.error);
    return Response.json({ left: true });
  } catch (error) { return fail(error); }
}
