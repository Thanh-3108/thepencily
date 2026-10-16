import { authenticate, body, fail, dbError } from "@/lib/server/backend";
import { asObject, text } from "@/lib/platform";
export async function GET(request: Request) {
  try { const { db, user } = await authenticate(request); const result = await db.from("enrollments").select("class_id").eq("user_id", user.id); dbError(result.error); return Response.json({ ids: (result.data || []).map((item) => item.class_id) }); } catch (error) { return fail(error); }
}
export async function POST(request: Request) {
  try { const { db, user } = await authenticate(request); const input = asObject(await body(request)); const result = await db.rpc("enroll_pencily_class", { p_class: text(input.classId, "Mã lớp", 50), p_user: user.id, p_cancel: input.cancel === true }); dbError(result.error); return Response.json({ success: true }); } catch (error) { return fail(error); }
}
