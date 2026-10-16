import { api } from "./api";
import { isSupabaseConfigured } from "./supabaseClient";
import type { ClassDraft, ClassStatus, PlatformClass, ProgramType } from "./platform";
export { supabase, isSupabaseConfigured } from "./supabaseClient";
export interface OnlineClass {
  id: string; title: string; category: "toan" | "tin" | "ielts" | "ly" | "sat" | "khac";
  tutorName: string; tutorDiscord?: string; tutorAvatar?: string; tutorSchool?: string;
  schedule: string; meetUrl: string; maxSeats: number; enrolledCount: number; description: string;
  status: ClassStatus; tutorId: string | null; programType: ProgramType; createdAt?: string;
}
export function toOnlineClass(row: PlatformClass): OnlineClass {
  return { id: row.id, title: row.title, category: row.category, tutorName: row.tutor_name,
    tutorAvatar: row.tutor_avatar, tutorSchool: row.tutor_school, schedule: row.scheduled_time || row.schedule,
    meetUrl: row.meet_url, maxSeats: row.max_seats, enrolledCount: row.enrolled_count,
    description: row.objectives || row.description, status: row.status, tutorId: row.tutor_id,
    programType: row.program_type, createdAt: row.created_at };
}
export async function fetchOnlineClasses(): Promise<OnlineClass[]> {
  if (!isSupabaseConfigured) return [];
  return (await api<{ classes: PlatformClass[] }>("/api/classes")).classes.map(toOnlineClass);
}
export async function createOnlineClass(draft: ClassDraft): Promise<OnlineClass> {
  return toOnlineClass((await api<{ classSession: PlatformClass }>("/api/classes", { method: "POST", body: JSON.stringify(draft) })).classSession);
}
export async function enrollOnlineClass(classId: string) { await api("/api/enrollments", { method: "POST", body: JSON.stringify({ classId }) }); return true; }
export async function cancelOnlineEnrollment(classId: string) { await api("/api/enrollments", { method: "POST", body: JSON.stringify({ classId, cancel: true }) }); return true; }
export async function fetchStudentEnrollmentIds() { return (await api<{ ids: string[] }>("/api/enrollments")).ids; }
export async function deleteOnlineClass(classId: string) { await api(`/api/classes/${classId}`, { method: "DELETE" }); return true; }
