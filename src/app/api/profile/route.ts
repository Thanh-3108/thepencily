import { authenticate, body, fail, dbError } from "@/lib/server/backend";
import { asObject, text, PlatformError } from "@/lib/platform";
export async function GET(request: Request) {
  try { const { profile } = await authenticate(request); return Response.json({ profile }); } catch (error) { return fail(error); }
}
export async function PATCH(request: Request) {
  try {
    const { db, user } = await authenticate(request);
    const input = asObject(await body(request));
    const age = Number(input.age);
    if (!Number.isInteger(age) || age < 1 || age > 120) throw new PlatformError("Độ tuổi không hợp lệ.");
    const result = await db.from("users").update({
      name: text(input.name, "Tên hiển thị", 100), real_name: text(input.realName, "Họ tên", 150), age,
      school: text(input.school, "Trường học", 200), grade: text(input.grade, "Khối lớp", 80),
      interests: Array.isArray(input.interests) ? input.interests.filter((item): item is string => typeof item === "string" && item.length < 100).slice(0, 15) : [],
      has_completed_profile: true,
    }).eq("id", user.id).select("*").single();
    dbError(result.error); return Response.json({ profile: result.data });
  } catch (error) { return fail(error); }
}
