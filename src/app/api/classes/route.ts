import { authenticate, backend, body, fail, dbError, rateLimit } from "@/lib/server/backend";
import { validateClassDraft, PlatformError } from "@/lib/platform";
export async function GET(request: Request) {
  try {
    const scope = new URL(request.url).searchParams.get("scope");
    const auth = request.headers.has("authorization") ? await authenticate(request) : null;
    const db = auth?.db || backend();
    let query = db.from("classes").select("*").order("scheduled_time", { ascending: true });
    if (scope === "mine") {
      if (!auth) throw new PlatformError("Hãy đăng nhập để xem lớp của bạn.", 401);
      query = query.eq("tutor_id", auth.user.id);
    } else query = query.in("status", ["approved", "live"]);
    const result = await query; dbError(result.error);
    return Response.json({ classes: result.data || [] });
  } catch (error) { return fail(error); }
}
export async function POST(request: Request) {
  try {
    const { db, user, profile } = await authenticate(request);
    await rateLimit(`classes:${user.id}`, 10);
    const draft = validateClassDraft(await body(request), profile.age);
    const application = await db.from("tutor_applications").select("status,programs").eq("user_id", user.id).maybeSingle(); dbError(application.error);
    if (!profile.has_completed_profile || application.data?.status !== "approved" || !application.data.programs.includes(draft.programType)) throw new PlatformError("Academic cần duyệt hồ sơ tutor và chuyên môn này trước khi bạn nộp lớp.", 403);
    const id = crypto.randomUUID();
    const result = await db.from("classes").insert({ id, tutor_id: user.id, title: draft.title, category: draft.category,
      tutor_name: profile.name, tutor_avatar: profile.avatar, tutor_school: profile.school, schedule: draft.scheduledTime,
      meet_url: draft.platform === "web" ? `/room/${id}` : draft.meetUrl, max_seats: draft.maxSeats, enrolled_count: 0,
      description: draft.objectives, program_type: draft.programType, objectives: draft.objectives, main_topics: draft.mainTopics,
      materials_url: draft.materialsUrl, interactive_activities: draft.interactiveActivities, practice_exercises: draft.practiceExercises,
      reference_sources: draft.referenceSources, platform: draft.platform, scheduled_time: draft.scheduledTime,
      demo_date: draft.demoDate, status: "pending_demo",
    }).select("*").single(); dbError(result.error);
    return Response.json({ classSession: result.data }, { status: 201 });
  } catch (error) { return fail(error); }
}
