import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface OnlineClass {
  id: string;
  title: string;
  category: "toan" | "tin" | "ielts" | "ly" | "sat" | "khac";
  tutorName: string;
  tutorDiscord?: string;
  tutorAvatar?: string;
  schedule: string;
  meetUrl: string; // Discord Voice channel link or Google Meet link
  maxSeats: number;
  enrolledCount: number;
  description: string;
  createdAt?: string;
}

// Convert DB snake_case row to OnlineClass
function rowToClass(row: any): OnlineClass {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    tutorName: row.tutor_name,
    tutorDiscord: row.tutor_discord,
    tutorAvatar: row.tutor_avatar,
    schedule: row.schedule,
    meetUrl: row.meet_url,
    maxSeats: row.max_seats || 20,
    enrolledCount: row.enrolled_count || 0,
    description: row.description || "",
    createdAt: row.created_at,
  };
}

/**
 * Fetch all available online classes
 */
export async function fetchOnlineClasses(): Promise<OnlineClass[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch classes error:", error);
      } else if (data) {
        return data.map(rowToClass);
      }
    } catch (err) {
      console.error("Supabase query error:", err);
    }
  }

  // Fallback to LocalStorage
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("pencily_classes");
      if (saved) return JSON.parse(saved);
    } catch {}
  }
  return [];
}

/**
 * Create/Host a new online class
 */
export async function createOnlineClass(
  newClass: Omit<OnlineClass, "id" | "enrolledCount">
): Promise<OnlineClass | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("classes")
        .insert([
          {
            title: newClass.title,
            category: newClass.category,
            tutor_name: newClass.tutorName,
            tutor_discord: newClass.tutorDiscord || "",
            tutor_avatar: newClass.tutorAvatar || "",
            schedule: newClass.schedule,
            meet_url: newClass.meetUrl,
            max_seats: newClass.maxSeats || 20,
            enrolled_count: 0,
            description: newClass.description || "",
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
      } else if (data) {
        return rowToClass(data);
      }
    } catch (err) {
      console.error("Supabase createClass exception:", err);
    }
  }

  // Local fallback
  const fallbackClass: OnlineClass = {
    ...newClass,
    id: `class-${Date.now()}`,
    enrolledCount: 0,
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      const current = JSON.parse(localStorage.getItem("pencily_classes") || "[]");
      localStorage.setItem("pencily_classes", JSON.stringify([fallbackClass, ...current]));
    } catch {}
  }

  return fallbackClass;
}

/**
 * Enroll student into an online class
 */
export async function enrollOnlineClass(
  classId: string,
  studentDiscordId: string,
  studentName: string
): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from("enrollments").insert([
        {
          class_id: classId,
          student_discord_id: studentDiscordId,
          student_name: studentName,
        },
      ]);

      if (!error) {
        // Increment enrolled_count
        const { data: currentClass } = await supabase
          .from("classes")
          .select("enrolled_count")
          .eq("id", classId)
          .single();

        if (currentClass) {
          await supabase
            .from("classes")
            .update({ enrolled_count: (currentClass.enrolled_count || 0) + 1 })
            .eq("id", classId);
        }
        return true;
      }
    } catch (err) {
      console.error("Supabase enroll error:", err);
    }
  }

  return true;
}

/**
 * Cancel enrollment
 */
export async function cancelOnlineEnrollment(
  classId: string,
  studentDiscordId: string
): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from("enrollments")
        .delete()
        .eq("class_id", classId)
        .eq("student_discord_id", studentDiscordId);

      if (!error) {
        const { data: currentClass } = await supabase
          .from("classes")
          .select("enrolled_count")
          .eq("id", classId)
          .single();

        if (currentClass && currentClass.enrolled_count > 0) {
          await supabase
            .from("classes")
            .update({ enrolled_count: currentClass.enrolled_count - 1 })
            .eq("id", classId);
        }
        return true;
      }
    } catch (err) {
      console.error("Supabase cancel enrollment error:", err);
    }
  }

  return true;
}

/**
 * Fetch enrolled class IDs for student
 */
export async function fetchStudentEnrollmentIds(
  studentDiscordId: string
): Promise<string[]> {
  if (supabase && studentDiscordId) {
    try {
      const { data, error } = await supabase
        .from("enrollments")
        .select("class_id")
        .eq("student_discord_id", studentDiscordId);

      if (!error && data) {
        return data.map((item) => item.class_id);
      }
    } catch (err) {
      console.error("Supabase fetch enrollments error:", err);
    }
  }

  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("pencily_registered");
      if (saved) return JSON.parse(saved);
    } catch {}
  }
  return [];
}

/**
 * Delete an online class
 */
export async function deleteOnlineClass(classId: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from("enrollments").delete().eq("class_id", classId);
      const { error } = await supabase.from("classes").delete().eq("id", classId);
      if (!error) return true;
    } catch (err) {
      console.error("Supabase delete class error:", err);
    }
  }

  if (typeof window !== "undefined") {
    try {
      const current = JSON.parse(localStorage.getItem("pencily_classes") || "[]");
      const filtered = current.filter((c: any) => c.id !== classId);
      localStorage.setItem("pencily_classes", JSON.stringify(filtered));
    } catch {}
  }
  return true;
}
