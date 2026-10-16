import "server-only";
import { createClient } from "@supabase/supabase-js";
import { PlatformError, type PlatformProfile, isReviewer } from "@/lib/platform";

export function backend() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new PlatformError("Backend chưa cấu hình Supabase. Xem BACKEND_SETUP.md.", 503);
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
export async function authenticate(request: Request) {
  const token = request.headers.get("authorization")?.match(/^Bearer (.+)$/i)?.[1];
  if (!token) throw new PlatformError("Hãy đăng nhập bằng email hoặc Discord để tiếp tục.", 401);
  const db = backend();
  const { data, error } = await db.auth.getUser(token);
  if (error || !data.user) throw new PlatformError("Phiên đăng nhập đã hết hạn.", 401);
  const result = await db.from("users").select("*").eq("id", data.user.id).single();
  if (result.error) throw new PlatformError("Chưa có hồ sơ backend. Hãy chạy migration Supabase.", 503);
  return { db, user: data.user, profile: result.data as PlatformProfile };
}
export function requireReviewer(profile: PlatformProfile) {
  if (!isReviewer(profile.role)) throw new PlatformError("Chỉ ban Academic được duyệt hồ sơ và lớp học.", 403);
}
export async function body(request: Request) {
  if (Number(request.headers.get("content-length")) > 32000) throw new PlatformError("Nội dung gửi quá dài.", 413);
  const raw = await request.text();
  if (Buffer.byteLength(raw) > 32000) throw new PlatformError("Nội dung gửi quá dài.", 413);
  try { return JSON.parse(raw) as unknown; } catch { throw new PlatformError("JSON không hợp lệ."); }
}
export function fail(error: unknown) {
  if (error instanceof PlatformError) return Response.json({ error: error.message }, { status: error.status });
  console.error("Pencily backend:", error instanceof Error ? error.message : "database operation failed");
  return Response.json({ error: "Không thể hoàn thành thao tác. Vui lòng thử lại." }, { status: 500 });
}
export function dbError(error: { message: string } | null) {
  if (!error) return;
  // Business-rule exceptions from our RPC functions carry safe user-facing text.
  if (/^PENCILY:/.test(error.message)) throw new PlatformError(error.message.replace(/^PENCILY:\s*/, ""), 409);
  throw new Error(error.message);
}
export async function rateLimit(key: string, limit = 20) {
  const { data, error } = await backend().rpc("take_api_quota", { p_key: key, p_limit: limit });
  dbError(error);
  if (!data) throw new PlatformError("Bạn thao tác quá nhanh. Vui lòng chờ một phút.", 429);
}
