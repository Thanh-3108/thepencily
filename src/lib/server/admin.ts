import "server-only";
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs/promises";
import path from "node:path";
import { PlatformError } from "@/lib/platform";

export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new PlatformError("Chưa cấu hình Supabase Service Role Key trong môi trường máy chủ.", 503);
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const ADMIN_EMAILS = [
  "hhuuyynnhhccoonnggtthhaannhh@gmail.com",
  "thepencily@gmail.com",
];

export async function verifyAdminAuth(request: Request) {
  const adminKey = request.headers.get("x-admin-key") || new URL(request.url).searchParams.get("admin_key");
  const configuredSecret = process.env.ADMIN_SECRET_KEY || "pencily_founder_admin_2026";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // 1. Direct admin master key bypass
  if (adminKey && (adminKey === configuredSecret || adminKey === serviceRoleKey)) {
    return {
      type: "master_key",
      user: {
        id: "founder-admin",
        email: "hhuuyynnhhccoonnggtthhaannhh@gmail.com",
        name: "Huỳnh Công Thành (Founder Admin)",
      },
      role: "admin" as const,
    };
  }

  // 2. Bearer token auth via Supabase
  const token = request.headers.get("authorization")?.match(/^Bearer (.+)$/i)?.[1];
  if (!token) {
    throw new PlatformError("Yêu cầu quyền Quản trị viên (Admin). Vui lòng đăng nhập bằng tài khoản Admin hoặc cung cấp Admin Master Key.", 401);
  }

  const db = getAdminClient();
  const { data: authData, error: authError } = await db.auth.getUser(token);
  if (authError || !authData.user) {
    throw new PlatformError("Phiên đăng nhập đã hết hạn.", 401);
  }

  const email = (authData.user.email || "").toLowerCase();
  const { data: profile, error: profileError } = await db
    .from("users")
    .select("*")
    .eq("id", authData.user.id)
    .single();

  const isEmailAdmin = ADMIN_EMAILS.includes(email);
  const isRoleAdmin = profile && (profile.role === "admin" || profile.role === "academic");

  if (!isEmailAdmin && !isRoleAdmin) {
    throw new PlatformError("Tài khoản của bạn không có quyền Quản trị viên (Admin Access Denied).", 403);
  }

  return {
    type: "bearer",
    user: authData.user,
    profile,
    role: "admin" as const,
  };
}

// ----------------------------------------------------
// DATABASE OVERVIEW & METRICS
// ----------------------------------------------------
export async function getDatabaseOverview() {
  const db = getAdminClient();

  const [
    usersRes,
    classesRes,
    tutorsRes,
    redemptionsRes,
    enrollmentsRes,
    attendanceRes,
    storageRes,
  ] = await Promise.all([
    db.from("users").select("role, points, has_completed_profile", { count: "exact" }),
    db.from("classes").select("status, program_type", { count: "exact" }),
    db.from("tutor_applications").select("status", { count: "exact" }),
    db.from("reward_redemptions").select("cost", { count: "exact" }),
    db.from("enrollments").select("id", { count: "exact" }),
    db.from("attendance_records").select("verified_minutes", { count: "exact" }),
    db.storage.from("pencily-uploads").list(),
  ]);

  const users = usersRes.data || [];
  const classes = classesRes.data || [];
  const tutors = tutorsRes.data || [];
  const redemptions = redemptionsRes.data || [];
  const storageFiles = storageRes.data || [];

  const totalPoints = users.reduce((sum, u) => sum + (u.points || 0), 0);
  const totalPPSpent = redemptions.reduce((sum, r) => sum + (r.cost || 0), 0);
  const totalStorageBytes = storageFiles.reduce((sum, f) => sum + (f.metadata?.size || 0), 0);

  return {
    stats: {
      totalUsers: usersRes.count || 0,
      adminCount: users.filter((u) => u.role === "admin").length,
      academicCount: users.filter((u) => u.role === "academic").length,
      tutorCount: users.filter((u) => u.role === "tutor").length,
      learnerCount: users.filter((u) => u.role === "learner").length,
      totalPoints,

      totalClasses: classesRes.count || 0,
      liveClasses: classes.filter((c) => c.status === "live").length,
      approvedClasses: classes.filter((c) => c.status === "approved").length,
      pendingClasses: classes.filter((c) => c.status === "pending_demo").length,

      totalTutorApplications: tutorsRes.count || 0,
      pendingTutors: tutors.filter((t) => t.status === "pending").length,
      approvedTutors: tutors.filter((t) => t.status === "approved").length,

      totalRedemptions: redemptionsRes.count || 0,
      totalPPSpent,

      totalEnrollments: enrollmentsRes.count || 0,
      totalVerifiedAttendance: attendanceRes.count || 0,

      totalStorageFiles: storageFiles.length,
      totalStorageBytes,
    },
    system: {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      databaseStatus: "CONNECTED",
      storageBucket: "pencily-uploads",
      currentTime: new Date().toISOString(),
    },
  };
}

// ----------------------------------------------------
// USERS CRUD
// ----------------------------------------------------
export async function listAllUsers() {
  const db = getAdminClient();

  const [usersRes, authUsersRes] = await Promise.all([
    db.from("users").select("*").order("created_at", { ascending: false }),
    db.auth.admin.listUsers({ perPage: 1000 }),
  ]);

  if (usersRes.error) throw new PlatformError(usersRes.error.message, 500);

  const authMap = new Map((authUsersRes.data?.users || []).map((u) => [u.id, u.email]));

  return (usersRes.data || []).map((u) => ({
    ...u,
    email: authMap.get(u.id) || "",
  }));
}

export async function updateUser(
  userId: string,
  updates: {
    name?: string;
    real_name?: string;
    school?: string;
    grade?: string;
    role?: "learner" | "tutor" | "academic" | "admin";
    points?: number;
    age?: number | null;
    learning_minutes?: number;
  },
  adminName = "Admin"
) {
  const db = getAdminClient();

  // If points are being adjusted, log to points_ledger
  if (typeof updates.points === "number") {
    const { data: current } = await db.from("users").select("points").eq("id", userId).single();
    const prevPoints = current?.points || 0;
    const diff = updates.points - prevPoints;

    if (diff !== 0) {
      await db.from("points_ledger").insert({
        user_id: userId,
        amount: diff,
        reason: `Điều chỉnh thủ công bởi ${adminName} (${diff > 0 ? "+" : ""}${diff} PP)`,
        reference: `admin_adjust_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      });
    }
  }

  const { data, error } = await db
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw new PlatformError(error.message, 500);
  return data;
}

export async function deleteUser(userId: string) {
  const db = getAdminClient();

  // Delete from public.users first
  const { error: profileError } = await db.from("users").delete().eq("id", userId);
  if (profileError) throw new PlatformError(profileError.message, 500);

  // Attempt delete from auth.users (if user exists there)
  try {
    await db.auth.admin.deleteUser(userId);
  } catch (err) {
    console.warn("Could not delete from auth.users:", err);
  }

  return { success: true, deletedId: userId };
}

export async function createDirectUser(payload: {
  email: string;
  name: string;
  real_name?: string;
  school?: string;
  grade?: string;
  role?: "learner" | "tutor" | "academic" | "admin";
  points?: number;
  password?: string;
}) {
  const db = getAdminClient();

  // Create in Auth
  const { data: authData, error: authError } = await db.auth.admin.createUser({
    email: payload.email,
    password: payload.password || "Pencily123456@",
    email_confirm: true,
    user_metadata: {
      full_name: payload.name,
      name: payload.name,
      school: payload.school || "The Pencily",
      grade: payload.grade || "THPT",
    },
  });

  if (authError || !authData.user) {
    throw new PlatformError(authError?.message || "Không thể tạo tài khoản người dùng.", 400);
  }

  // Create or update in public.users
  const { data: userProfile, error: userError } = await db
    .from("users")
    .upsert({
      id: authData.user.id,
      name: payload.name,
      real_name: payload.real_name || payload.name,
      school: payload.school || "The Pencily",
      grade: payload.grade || "THPT",
      role: payload.role || "learner",
      points: payload.points || 0,
      has_completed_profile: true,
    })
    .select()
    .single();

  if (userError) throw new PlatformError(userError.message, 500);

  return {
    user: userProfile,
    email: payload.email,
  };
}

// ----------------------------------------------------
// CLASSES CRUD
// ----------------------------------------------------
export async function listAllClasses() {
  const db = getAdminClient();
  const { data, error } = await db
    .from("classes")
    .select("*, enrollments(count)")
    .order("created_at", { ascending: false });

  if (error) throw new PlatformError(error.message, 500);
  return data || [];
}

export async function upsertClass(payload: {
  id?: string;
  title: string;
  category: string;
  tutor_name: string;
  tutor_school?: string;
  tutor_id?: string | null;
  schedule: string;
  meet_url: string;
  max_seats?: number;
  description?: string;
  program_type?: string;
  objectives?: string;
  main_topics?: string;
  materials_url?: string;
  status: "draft" | "pending_demo" | "needs_revision" | "approved" | "live" | "completed" | "cancelled";
  platform?: "web" | "discord" | "meet";
}) {
  const db = getAdminClient();

  const classData = {
    title: payload.title,
    category: payload.category || "khac",
    tutor_name: payload.tutor_name,
    tutor_school: payload.tutor_school || "The Pencily Academy",
    tutor_id: payload.tutor_id || null,
    schedule: payload.schedule || "Lịch linh hoạt",
    meet_url: payload.meet_url || "/room/demo",
    max_seats: payload.max_seats || 20,
    description: payload.description || "",
    program_type: payload.program_type || "study_buddy",
    objectives: payload.objectives || "",
    main_topics: payload.main_topics || "",
    materials_url: payload.materials_url || "",
    status: payload.status || "approved",
    platform: payload.platform || "web",
    updated_at: new Date().toISOString(),
  };

  if (payload.id) {
    const { data, error } = await db
      .from("classes")
      .update(classData)
      .eq("id", payload.id)
      .select()
      .single();

    if (error) throw new PlatformError(error.message, 500);
    return data;
  } else {
    const { data, error } = await db
      .from("classes")
      .insert(classData)
      .select()
      .single();

    if (error) throw new PlatformError(error.message, 500);
    return data;
  }
}

export async function deleteClass(classId: string) {
  const db = getAdminClient();
  const { error } = await db.from("classes").delete().eq("id", classId);
  if (error) throw new PlatformError(error.message, 500);
  return { success: true, deletedId: classId };
}

// ----------------------------------------------------
// TUTOR APPLICATIONS
// ----------------------------------------------------
export async function listAllTutorApplications() {
  const db = getAdminClient();
  const { data, error } = await db
    .from("tutor_applications")
    .select("*, users!tutor_applications_user_id_fkey(name, real_name, school, grade, age, avatar)")
    .order("created_at", { ascending: false });

  if (error) throw new PlatformError(error.message, 500);
  return data || [];
}

export async function reviewTutorDirect(
  applicationId: string,
  action: "approve" | "reject",
  feedback = ""
) {
  const db = getAdminClient();

  const { data: app, error: appError } = await db
    .from("tutor_applications")
    .select("*")
    .eq("id", applicationId)
    .single();

  if (appError || !app) throw new PlatformError("Không tìm thấy đơn đăng ký gia sư.", 404);

  const updatedStatus = action === "approve" ? "approved" : "rejected";

  const { error: updateAppError } = await db
    .from("tutor_applications")
    .update({
      status: updatedStatus,
      feedback: feedback || (action === "approve" ? "Đã duyệt bởi Admin" : "Chưa đạt tiêu chí"),
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", applicationId);

  if (updateAppError) throw new PlatformError(updateAppError.message, 500);

  // If approved, elevate user role to 'tutor'
  if (action === "approve") {
    await db.from("users").update({ role: "tutor" }).eq("id", app.user_id);
  }

  return { success: true, applicationId, status: updatedStatus };
}

// ----------------------------------------------------
// STORAGE & UPLOADS
// ----------------------------------------------------
export async function listStorageObjects() {
  const db = getAdminClient();
  const { data, error } = await db.storage.from("pencily-uploads").list("", {
    limit: 100,
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error) throw new PlatformError(error.message, 500);

  return (data || []).map((file) => {
    const { data: urlData } = db.storage.from("pencily-uploads").getPublicUrl(file.name);
    return {
      name: file.name,
      id: file.id,
      size: file.metadata?.size || 0,
      mimetype: file.metadata?.mimetype || "application/octet-stream",
      created_at: file.created_at,
      publicUrl: urlData.publicUrl,
    };
  });
}

export async function deleteStorageObject(fileName: string) {
  const db = getAdminClient();
  const { data, error } = await db.storage.from("pencily-uploads").remove([fileName]);
  if (error) throw new PlatformError(error.message, 500);
  return { success: true, data };
}

// ----------------------------------------------------
// REWARD REDEMPTIONS
// ----------------------------------------------------
export async function listAllRedemptions() {
  const db = getAdminClient();
  const { data, error } = await db
    .from("reward_redemptions")
    .select("*, users(name, real_name, school, grade)")
    .order("created_at", { ascending: false });

  if (error) throw new PlatformError(error.message, 500);
  return data || [];
}

// ----------------------------------------------------
// RAW DATABASE EXPLORER & TABLE MUTATIONS
// ----------------------------------------------------
const ALLOWED_TABLES = [
  "users",
  "classes",
  "tutor_applications",
  "enrollments",
  "reward_redemptions",
  "points_ledger",
  "attendance_records",
  "attendance_challenges",
  "room_members",
  "class_reviews",
  "notification_outbox",
];

export async function rawTableQuery(
  table: string,
  limit = 50,
  offset = 0
) {
  if (!ALLOWED_TABLES.includes(table)) {
    throw new PlatformError(`Bảng '${table}' không nằm trong danh mục bảng được phép truy cập.`, 400);
  }

  const db = getAdminClient();
  const { data, count, error } = await db
    .from(table)
    .select("*", { count: "exact" })
    .range(offset, offset + limit - 1);

  if (error) throw new PlatformError(error.message, 500);

  return {
    table,
    count: count || 0,
    rows: data || [],
    allowedTables: ALLOWED_TABLES,
  };
}

export async function rawTableInsert(table: string, record: Record<string, unknown>) {
  if (!ALLOWED_TABLES.includes(table)) {
    throw new PlatformError(`Không được phép ghi vào bảng '${table}'.`, 400);
  }

  const db = getAdminClient();
  const { data, error } = await db.from(table).insert(record).select();
  if (error) throw new PlatformError(error.message, 500);
  return data;
}

export async function rawTableUpdate(
  table: string,
  keyColumn: string,
  keyValue: unknown,
  record: Record<string, unknown>
) {
  if (!ALLOWED_TABLES.includes(table)) {
    throw new PlatformError(`Không được phép cập nhật bảng '${table}'.`, 400);
  }

  const db = getAdminClient();
  const { data, error } = await db
    .from(table)
    .update(record)
    .eq(keyColumn, keyValue)
    .select();

  if (error) throw new PlatformError(error.message, 500);
  return data;
}

export async function rawTableDelete(
  table: string,
  keyColumn: string,
  keyValue: unknown
) {
  if (!ALLOWED_TABLES.includes(table)) {
    throw new PlatformError(`Không được phép xóa từ bảng '${table}'.`, 400);
  }

  const db = getAdminClient();
  const { data, error } = await db
    .from(table)
    .delete()
    .eq(keyColumn, keyValue)
    .select();

  if (error) throw new PlatformError(error.message, 500);
  return { success: true, deleted: data };
}

// ----------------------------------------------------
// SITE SETTINGS & ANNOUNCEMENTS
// ----------------------------------------------------
const SETTINGS_FILE_PATH = path.join(process.cwd(), "data", "site-settings.json");

export interface SiteSettings {
  bannerNotice: {
    enabled: boolean;
    textVi: string;
    textEn: string;
    type: "info" | "warning" | "success";
    linkUrl?: string;
  };
  maintenanceMode: boolean;
  allowNewRegistrations: boolean;
  announcements: Array<{
    id: string;
    title: string;
    content: string;
    publishedAt: string;
    author: string;
  }>;
}

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  bannerNotice: {
    enabled: false,
    textVi: "Chào mừng các bạn đến với học kỳ mới tại The Pencily!",
    textEn: "Welcome to the new study semester at The Pencily!",
    type: "info",
    linkUrl: "/dashboard",
  },
  maintenanceMode: false,
  allowNewRegistrations: true,
  announcements: [
    {
      id: "ann-welcome",
      title: "Khởi động The Pencily Platform 2026",
      content: "Nền tảng học nhóm & gia sư đồng trang lứa chính thức mở các phòng học tương tác và thư viện bài tập.",
      publishedAt: new Date().toISOString(),
      author: "Huỳnh Công Thành",
    },
  ],
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const raw = await fs.readFile(SETTINGS_FILE_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    // If not exists, ensure dir and write default
    try {
      await fs.mkdir(path.dirname(SETTINGS_FILE_PATH), { recursive: true });
      await fs.writeFile(SETTINGS_FILE_PATH, JSON.stringify(DEFAULT_SITE_SETTINGS, null, 2), "utf8");
    } catch {}
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const updated: SiteSettings = {
    ...current,
    ...settings,
    bannerNotice: {
      ...current.bannerNotice,
      ...(settings.bannerNotice || {}),
    },
  };

  await fs.mkdir(path.dirname(SETTINGS_FILE_PATH), { recursive: true });
  await fs.writeFile(SETTINGS_FILE_PATH, JSON.stringify(updated, null, 2), "utf8");
  return updated;
}
