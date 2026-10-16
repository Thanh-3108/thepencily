import { authenticate, body, fail, dbError, rateLimit } from "@/lib/server/backend";
import { asObject, text, httpsUrl, PlatformError, PROGRAM_LABELS, type ProgramType } from "@/lib/platform";
export async function GET(request: Request) {
  try {
    const { db, user } = await authenticate(request);
    const result = await db.from("tutor_applications").select("*").eq("user_id", user.id).maybeSingle();
    dbError(result.error); return Response.json({ application: result.data });
  } catch (error) { return fail(error); }
}
export async function POST(request: Request) {
  try {
    const { db, user, profile } = await authenticate(request);
    await rateLimit(`tutor:${user.id}`, 5);
    if (!profile.has_completed_profile || !profile.age) throw new PlatformError("Hãy hoàn thiện họ tên, tuổi và trường học trước.");
    const input = asObject(await body(request));
    const programs = Array.isArray(input.programs) ? [...new Set(input.programs)] as ProgramType[] : [];
    if (!programs.length || programs.some((item) => !Object.prototype.hasOwnProperty.call(PROGRAM_LABELS, item))) throw new PlatformError("Hãy chọn chương trình bạn muốn dạy.");
    if (programs.some((item) => item === "flagship" || item === "basic_science") && profile.age < 16) throw new PlatformError("Chương trình này yêu cầu tutor từ 16 tuổi.");
    const credentials = input.credentialsUrl ? httpsUrl(input.credentialsUrl, "Minh chứng học thuật") : "";
    if (programs.includes("flagship") && !credentials) throw new PlatformError("Flagship yêu cầu link chứng chỉ hoặc minh chứng học thuật để Academic thẩm định.");
    const existing = await db.from("tutor_applications").select("status").eq("user_id", user.id).maybeSingle(); dbError(existing.error);
    if (existing.data?.status === "approved") throw new PlatformError("Hồ sơ đã được duyệt. Liên hệ Academic để bổ sung chuyên môn.", 409);
    const result = await db.from("tutor_applications").upsert({ user_id: user.id, full_name: profile.real_name,
      subjects: text(input.subjects, "Môn học", 1000), motivation: text(input.motivation, "Động lực và kinh nghiệm", 4000),
      credentials_url: credentials, programs, status: "pending", feedback: "", reviewed_at: null, reviewed_by: null,
    }, { onConflict: "user_id" }).select("*").single();
    dbError(result.error); return Response.json({ application: result.data });
  } catch (error) { return fail(error); }
}
