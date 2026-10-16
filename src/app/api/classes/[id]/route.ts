import { authenticate, body, fail, dbError } from "@/lib/server/backend";
import { validateClassDraft, PlatformError, asObject } from "@/lib/platform";
type Context = { params: Promise<{ id: string }> };
export async function PATCH(request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const { db, user, profile } = await authenticate(request);
    const current = await db.from("classes").select("*").eq("id", id).eq("tutor_id", user.id).single(); dbError(current.error);
    if (!["draft", "pending_demo", "needs_revision"].includes(current.data.status)) throw new PlatformError("Lớp đã duyệt không thể sửa đề cương trực tiếp.", 409);
    const draft = validateClassDraft(await body(request), profile.age);
    const application = await db.from("tutor_applications").select("status,programs").eq("user_id", user.id).single(); dbError(application.error);
    if (!application.data) throw new PlatformError("Chưa có hồ sơ tutor được duyệt.", 403);
    if (application.data.status !== "approved" || !application.data.programs.includes(draft.programType)) throw new PlatformError("Chương trình này chưa được duyệt cho hồ sơ tutor của bạn.", 403);
    const result = await db.from("classes").update({ title: draft.title, category: draft.category, program_type: draft.programType,
      objectives: draft.objectives, description: draft.objectives, main_topics: draft.mainTopics, materials_url: draft.materialsUrl,
      interactive_activities: draft.interactiveActivities, practice_exercises: draft.practiceExercises, reference_sources: draft.referenceSources,
      platform: draft.platform, meet_url: draft.platform === "web" ? `/room/${id}` : draft.meetUrl, max_seats: draft.maxSeats,
      scheduled_time: draft.scheduledTime, schedule: draft.scheduledTime, demo_date: draft.demoDate,
      status: "pending_demo", academic_feedback: null, reviewed_by: null, reviewed_at: null, updated_at: new Date().toISOString(),
    }).eq("id", id).eq("status", current.data.status).select("*").single(); dbError(result.error);
    return Response.json({ classSession: result.data });
  } catch (error) { return fail(error); }
}
export async function POST(request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const { db, user } = await authenticate(request);
    const input = asObject(await body(request));
    const current = await db.from("classes").select("*").eq("id", id).eq("tutor_id", user.id).single(); dbError(current.error);
    if (input.action === "start") {
      if (current.data.status !== "approved" || Date.now() < Date.parse(current.data.scheduled_time) - 15 * 60000) throw new PlatformError("Chỉ bắt đầu lớp đã duyệt, tối đa 15 phút trước giờ học.", 409);
    } else if (input.action !== "complete" || current.data.status !== "live") throw new PlatformError("Thao tác lớp học không hợp lệ.", 409);
    const result = await db.from("classes").update({ status: input.action === "start" ? "live" : "completed", updated_at: new Date().toISOString() }).eq("id", id).eq("status", current.data.status).select("*").single(); dbError(result.error);
    if (input.action === "complete") { const closed = await db.from("room_members").update({ left_at: new Date().toISOString() }).eq("class_id", id).is("left_at", null); dbError(closed.error); }
    return Response.json({ classSession: result.data });
  } catch (error) { return fail(error); }
}
export async function DELETE(request: Request, context: Context) {
  try {
    const { id } = await context.params; const { db, user } = await authenticate(request);
    const result = await db.from("classes").update({ status: "cancelled" }).eq("id", id).eq("tutor_id", user.id).in("status", ["draft", "pending_demo", "needs_revision", "approved"]).select("id").single(); dbError(result.error);
    return Response.json({ cancelled: true });
  } catch (error) { return fail(error); }
}
