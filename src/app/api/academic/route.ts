import { authenticate, requireReviewer, body, fail, dbError } from "@/lib/server/backend";
import { asObject, text, PlatformError } from "@/lib/platform";
import { sendPendingClassNotifications } from "@/lib/server/notifications";
export async function GET(request: Request) {
  try {
    const { db, profile } = await authenticate(request); requireReviewer(profile);
    const [classes, applications, outbox] = await Promise.all([
      db.from("classes").select("*").in("status", ["pending_demo", "needs_revision"]).order("demo_date"),
      db.from("tutor_applications").select("*,users!tutor_applications_user_id_fkey(age,school)").eq("status", "pending").order("created_at"),
      db.from("notification_outbox").select("id,status,last_error").eq("status", "pending"),
    ]);
    dbError(classes.error); dbError(applications.error); dbError(outbox.error);
    return Response.json({ classes: classes.data, applications: applications.data, pendingNotifications: outbox.data });
  } catch (error) { return fail(error); }
}
export async function POST(request: Request) {
  try {
    const { db, user, profile } = await authenticate(request); requireReviewer(profile);
    const input = asObject(await body(request));
    if (input.target === "notifications") return Response.json(await sendPendingClassNotifications());
    const feedback = text(input.feedback, "Nhận xét Academic", 4000);
    if (input.target === "tutor") {
      if (!["approve", "reject"].includes(String(input.action))) throw new PlatformError("Quyết định không hợp lệ.");
      if (input.action === "approve" && input.verifiedIdentity !== true) throw new PlatformError("Cần xác nhận đã thẩm định danh tính, tuổi và minh chứng chuyên môn.");
      const result = await db.rpc("review_pencily_tutor", { p_application: text(input.id, "Mã hồ sơ", 50), p_reviewer: user.id, p_approve: input.action === "approve", p_feedback: feedback }); dbError(result.error);
      return Response.json({ application: result.data });
    }
    if (input.action === "approve" && input.observedDemo !== true) throw new PlatformError("Cần xác nhận đã dự giờ demo trước khi phê duyệt.");
    const classId = text(input.id, "Mã lớp", 50);
    const demo = input.demoDate ? new Date(text(input.demoDate, "Lịch demo", 60)) : null;
    if (demo && !Number.isFinite(+demo)) throw new PlatformError("Lịch demo không hợp lệ.");
    const result = await db.rpc("review_pencily_class", { p_class: classId, p_reviewer: user.id, p_action: text(input.action, "Quyết định", 30), p_feedback: feedback, p_demo: demo?.toISOString() || null }); dbError(result.error);
    const notification = input.action === "approve" ? await sendPendingClassNotifications(classId) : null;
    return Response.json({ classSession: result.data, notification });
  } catch (error) { return fail(error); }
}
