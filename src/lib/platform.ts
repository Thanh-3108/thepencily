export type ClassStatus = "draft" | "pending_demo" | "needs_revision" | "approved" | "live" | "completed" | "cancelled";
export type ProgramType = "basic_science" | "flagship" | "liberal_arts" | "study_buddy";
export type PlatformRole = "learner" | "tutor" | "academic" | "admin";
export type ClassCategory = "toan" | "tin" | "ielts" | "ly" | "sat" | "khac";
export interface PlatformProfile {
  id: string; name: string; real_name: string; age: number | null; school: string;
  grade: string; avatar: string; role: PlatformRole; points: number;
  learning_minutes: number; teaching_minutes: number; sessions_attended: number;
  interests: string[]; has_completed_profile: boolean;
}
export interface ClassDraft {
  title: string; category: ClassCategory; programType: ProgramType;
  objectives: string; mainTopics: string; materialsUrl: string;
  interactiveActivities: string; practiceExercises: string; referenceSources: string;
  platform: "web" | "discord" | "meet"; meetUrl: string; scheduledTime: string;
  demoDate: string; maxSeats: number;
}
export interface PlatformClass {
  id: string; tutor_id: string | null; title: string; category: ClassCategory;
  tutor_name: string; tutor_avatar: string; tutor_school: string; schedule: string;
  meet_url: string; max_seats: number; enrolled_count: number; description: string;
  program_type: ProgramType; objectives: string; main_topics: string;
  materials_url: string; interactive_activities: string; practice_exercises: string;
  reference_sources: string; platform: "web" | "discord" | "meet";
  scheduled_time: string; demo_date: string; status: ClassStatus;
  academic_feedback: string | null; reviewed_at: string | null; created_at: string;
}
export interface TutorApplication {
  id: string; user_id: string; full_name: string; subjects: string; motivation: string;
  credentials_url: string; programs: ProgramType[]; status: "pending" | "approved" | "rejected";
  feedback: string; created_at: string;
}
export interface RoomMember {
  connection_id: string; user_id: string; class_id: string; name: string; avatar: string;
  is_host: boolean; last_seen_at: string;
}
export const STATUS_LABELS: Record<ClassStatus, string> = {
  draft: "Bản nháp", pending_demo: "Chờ demo & duyệt", needs_revision: "Cần điều chỉnh",
  approved: "Đã duyệt", live: "Đang học", completed: "Đã kết thúc", cancelled: "Đã hủy",
};
export const PROGRAM_LABELS: Record<ProgramType, string> = {
  basic_science: "Toán & KHTN", flagship: "Flagship", liberal_arts: "Khai phóng", study_buddy: "Bạn cùng tiến",
};
export const isReviewer = (role?: string) => role === "academic" || role === "admin";
export class PlatformError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}
export function asObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new PlatformError("Dữ liệu không hợp lệ.");
  return value as Record<string, unknown>;
}
export function text(value: unknown, label: string, max = 6000, required = true) {
  if (typeof value !== "string" || (required && !value.trim()) || value.length > max) throw new PlatformError(`${label} không hợp lệ (tối đa ${max} ký tự).`);
  return value.trim();
}
export function httpsUrl(value: unknown, label: string) {
  const candidate = text(value, label, 2000);
  try { const url = new URL(candidate); if (url.protocol !== "https:" || url.username || url.password) throw new Error(); return url.href; }
  catch { throw new PlatformError(`${label} phải là đường dẫn HTTPS.`); }
}
export function validateClassDraft(value: unknown, age: number | null, now = Date.now()): ClassDraft {
  const input = asObject(value);
  const programType = input.programType as ProgramType;
  if (!(Object.prototype.hasOwnProperty.call(PROGRAM_LABELS, programType))) throw new PlatformError("Chương trình không hợp lệ.");
  if ((programType === "basic_science" || programType === "flagship") && (!age || age < 16)) throw new PlatformError("Toán & KHTN và Flagship yêu cầu tutor từ 16 tuổi.");
  const category = input.category as ClassCategory;
  if (!["toan", "tin", "ielts", "ly", "sat", "khac"].includes(category)) throw new PlatformError("Môn học không hợp lệ.");
  const platform = input.platform as ClassDraft["platform"];
  if (!["web", "discord", "meet"].includes(platform)) throw new PlatformError("Nền tảng không hợp lệ.");
  const scheduledTime = new Date(text(input.scheduledTime, "Lịch học", 60));
  const demoDate = new Date(text(input.demoDate, "Lịch demo", 60));
  if (!Number.isFinite(+scheduledTime) || !Number.isFinite(+demoDate) || +scheduledTime <= now || +demoDate < now) throw new PlatformError("Lịch học và lịch demo phải ở tương lai.");
  if (+scheduledTime - +demoDate < 2 * 86400000) throw new PlatformError("Demo phải trước buổi chính thức ít nhất 2 ngày.");
  const maxSeats = Number(input.maxSeats);
  if (!Number.isInteger(maxSeats) || maxSeats < 2 || maxSeats > 100) throw new PlatformError("Sĩ số phải từ 2 đến 100.");
  if (platform === "web" && maxSeats > 6) throw new PlatformError("Phòng P2P giới hạn 6 người kể cả tutor. Lớp lớn hãy chọn Google Meet hoặc Discord.");
  let meetUrl = "";
  if (platform !== "web") {
    meetUrl = httpsUrl(input.meetUrl, "Link phòng học");
    const host = new URL(meetUrl).hostname;
    if (platform === "meet" && host !== "meet.google.com") throw new PlatformError("Vui lòng dùng link Google Meet.");
    if (platform === "discord" && !["discord.com", "discord.gg"].includes(host)) throw new PlatformError("Vui lòng dùng link Discord.");
  }
  return { title: text(input.title, "Tên lớp", 255), category, programType,
    objectives: text(input.objectives, "Mục tiêu"), mainTopics: text(input.mainTopics, "Nội dung chính"),
    materialsUrl: httpsUrl(input.materialsUrl, "Tài liệu/slide"), interactiveActivities: text(input.interactiveActivities, "Hoạt động tương tác"),
    practiceExercises: text(input.practiceExercises ?? "", "Bài tập", 6000, false), referenceSources: text(input.referenceSources, "Nguồn tham khảo"),
    platform, meetUrl, scheduledTime: scheduledTime.toISOString(), demoDate: demoDate.toISOString(), maxSeats };
}
export const REWARD_COSTS: Record<string, number> = {
  "item-placeholder-mentoring": 50, "item-placeholder-materials": 30,
  "item-placeholder-exams": 40, "item-placeholder-discord-role": 25, "item-placeholder-avatar-frame": 20,
};
