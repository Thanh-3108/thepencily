"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  fetchOnlineClasses,
  createOnlineClass,
  enrollOnlineClass,
  cancelOnlineEnrollment,
  fetchStudentEnrollmentIds,
  deleteOnlineClass,
} from "@/lib/supabase";

import { api } from "@/lib/api";
import { supabase } from "@/lib/supabaseClient";
import type { ClassDraft, ClassStatus, ProgramType, PlatformProfile } from "@/lib/platform";

export interface StudentUser {
  platformRole?: PlatformProfile["role"];
  interests?: string[];
  id: string;
  name: string;
  realName?: string;
  age?: number | string;
  handle: string;
  email: string;
  school: string;
  grade: string;
  discord: string;
  avatar: string;
  role: string;
  verified: boolean;
  points: number;
  learningMinutes: number;
  sessionsAttended: number;
  rank: number;
  badges: Array<{ name: string; color: string }>;
  discordId?: string;
  isDiscordLinked?: boolean;
  hasCompletedProfile?: boolean;
  tutorProgress: {
    step1_registered: boolean;
    step2_syllabus: boolean;
    step3_mock: boolean;
    isVerifiedTutor: boolean;
  };
}

export interface ClassSession {
  status?: ClassStatus;
  tutorId?: string | null;
  programType?: ProgramType;
  id: string;
  title: string;
  category: "toan" | "tin" | "ielts" | "ly" | "sat" | "khac";
  categoryLabel: string;
  badge: "BOOTCAMP" | "WORKSHOP" | "VOICE" | "OPEN";
  badgeColor: string;
  tutorName: string;
  tutorSchool?: string;
  tutorRole?: string;
  tutorDiscord?: string;
  tutorAvatar?: string;
  schedule: string;
  timeSlot?: string;
  dayLabel?: string;
  discordChannel?: string;
  discordRoom?: string;
  meetUrl: string;
  maxSeats: number;
  enrolledCount: number;
  description: string;
}

export interface ClassRequest {
  id: string;
  topic: string;
  subject: string;
  requesterName: string;
  school: string;
  votes: number;
  hasVoted?: boolean;
  createdAt: string;
}

export interface PostComment {
  id: string;
  authorName: string;
  text: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  category: "docs" | "doubt" | "announcement" | "tips";
  categoryLabel: string;
  categoryBadge: string;
  subworld: string;
  title: string;
  content: string;
  author: {
    name: string;
    school: string;
    role: string;
    verified: boolean;
    avatar: string;
  };
  timeAgo: string;
  likes: number;
  hasLiked?: boolean;
  commentsCount: number;
  comments?: PostComment[];
  discordChannel: string;
  discordThreadUrl: string;
  attachment?: {
    name: string;
    size: string;
    type: string;
  };
}

export interface AutomationActivity {
  id: string;
  timestamp: string;
  type: "session_join" | "post_created" | "tutor_advance" | "pomodoro_complete" | "badge_earned";
  text: string;
  actor: string;
  discordChannel?: string;
}

export type AppLanguage = "vi" | "en";

interface PencilyContextType {
  backendAuthenticated: boolean;
  apiNotice: string;
  clearNotice: () => void;
  refreshProfile: () => Promise<void>;
  refreshClasses: () => Promise<void>;
  redeemReward: (rewardId: string) => Promise<boolean>;

  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  user: StudentUser;
  isLoggedIn: boolean;
  loginWithDiscord: (discordData: Partial<StudentUser>) => void;
  loginWithCustomDatabase: (userData: {
    email: string;
    name: string;
    realName?: string;
    age?: number | string;
    school?: string;
    grade?: string;
    avatar?: string;
  }) => void;
  logout: () => void;
  updateUser: (data: Partial<StudentUser>) => void;
  completeProfile: (profile: { realName: string; displayName?: string; age?: number | string; school: string; grade: string; interests?: string[] }) => Promise<void>;
  addPoints: (amount: number, reason: string) => void;
  addLearningMinutes: (minutes: number) => void;
  advanceTutorStep: (step: 1 | 2 | 3) => void;
  
  classes: ClassSession[];
  addClass: (newClass: ClassDraft) => Promise<void>;
  deleteClass: (classId: string) => Promise<void>;
  registeredClassIds: string[];
  registerClass: (classId: string) => Promise<boolean>;
  cancelClassRegistration: (classId: string) => Promise<void>;
  isRegistered: (classId: string) => boolean;

  classRequests: ClassRequest[];
  requestClass: (data: { topic: string; subject: string; requesterName?: string; school?: string }) => void;
  voteClassRequest: (requestId: string) => void;
  
  posts: CommunityPost[];
  createPost: (postData: {
    category: "docs" | "doubt" | "announcement" | "tips";
    title: string;
    content: string;
    subworld: string;
    discordChannel: string;
    authorName?: string;
    authorSchool?: string;
  }) => void;
  toggleLikePost: (postId: string) => void;
  addCommentToPost: (postId: string, text: string) => void;

  activities: AutomationActivity[];
  onlineStudentsCount: number;
  activeVoiceRoomsCount: number;

  unreadNotifCount: number;
  setUnreadNotifCount: React.Dispatch<React.SetStateAction<number>>;
}


const initialUser: StudentUser = {
  id: "user-new", name: "Học sinh Pencily", handle: "@pencily_student", email: "", school: "Chưa cập nhật",
  grade: "Học sinh", discord: "", avatar: "P", role: "Học viên", platformRole: "learner", verified: false,
  points: 0, learningMinutes: 0, sessionsAttended: 0, rank: 0, badges: [],
  tutorProgress: { step1_registered: false, step2_syllabus: false, step3_mock: false, isVerifiedTutor: false },
};
function profileUser(profile: PlatformProfile): StudentUser {
  return { ...initialUser, id: profile.id, name: profile.name, realName: profile.real_name,
    age: profile.age ?? undefined, school: profile.school, grade: profile.grade, avatar: profile.avatar || profile.name.charAt(0),
    platformRole: profile.role, role: profile.role === "academic" || profile.role === "admin" ? "Academic" : profile.role === "tutor" ? "Peer Tutor" : "Học viên",
    verified: profile.role !== "learner", points: profile.points, learningMinutes: profile.learning_minutes,
    sessionsAttended: profile.sessions_attended, hasCompletedProfile: profile.has_completed_profile, interests: profile.interests,
    tutorProgress: { step1_registered: profile.role !== "learner", step2_syllabus: false, step3_mock: false, isVerifiedTutor: profile.role === "tutor" },
  };
}
const PencilyContext = createContext<PencilyContextType | null>(null);
export function PencilyProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>("vi");
  const [user, setUser] = useState<StudentUser>(initialUser);
  const [backendAuthenticated, setBackendAuthenticated] = useState(false);
  const [apiNotice, setApiNotice] = useState("");
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [registeredClassIds, setRegisteredClassIds] = useState<string[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [classRequests, setClassRequests] = useState<ClassRequest[]>([]);
  const [activities] = useState<AutomationActivity[]>([]);
  const [ready, setReady] = useState(false);
  const [unreadNotifCount, setUnreadNotifCount] = useState<number>(0);

  // Dynamic Browser Tab Title:
  // "The Pencily" by default.
  // Only shows "The Pencily | ..." when there is an active notification.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (unreadNotifCount > 0) {
      document.title = language === "vi"
        ? `The Pencily | (${unreadNotifCount}) Thông báo mới`
        : `The Pencily | (${unreadNotifCount}) New notifications`;
    } else {
      document.title = "The Pencily";
    }
  }, [unreadNotifCount, language]);
  const refreshClasses = useCallback(async () => {
    const result = await fetchOnlineClasses();
    setClasses(result.map((item) => ({ categoryLabel: item.category, badge: "OPEN" as const, badgeColor: "bg-blue-50 text-blue-700", ...item })));
  }, []);
  const refreshProfile = useCallback(async () => {
    const result = await api<{ profile: PlatformProfile }>("/api/profile");
    setUser(profileUser(result.profile)); setBackendAuthenticated(true);
  }, []);
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const lang = localStorage.getItem("pencily_lang"); if (lang === "vi" || lang === "en") setLanguageState(lang);
        const saved: Partial<StudentUser> = JSON.parse(localStorage.getItem("pencily_user") || "{}");
        // Cached data is presentation only. Never restore permissions or points from it.
        setUser({ ...initialUser, name: saved.name || initialUser.name, realName: saved.realName,
          school: saved.school || initialUser.school, grade: saved.grade || initialUser.grade, age: saved.age,
          hasCompletedProfile: saved.hasCompletedProfile, interests: saved.interests });
        const cachedPosts = JSON.parse(localStorage.getItem("pencily_posts") || "[]"); if (Array.isArray(cachedPosts)) setPosts(cachedPosts);
      } catch { /* Ignore invalid preview cache. */ }
      setReady(true);
    });
  }, []);
  useEffect(() => {
    if (!supabase) return;
    let active = true; let generation = 0;
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      const version = ++generation;
      // Leave the auth callback before calling SDK methods again.
      queueMicrotask(async () => {
        if (!active || version !== generation) return;
        if (!session) { setBackendAuthenticated(false); if (event === "SIGNED_OUT") { setUser(initialUser); setRegisteredClassIds([]); } return; }
        try {
          const result = await api<{ profile: PlatformProfile }>("/api/profile");
          if (!active || version !== generation) return;
          setUser({ ...profileUser(result.profile), email: session.user.email || "", isDiscordLinked: session.user.identities?.some((identity) => identity.provider === "discord") });
          setBackendAuthenticated(true);
        } catch (error) { if (active) setApiNotice(error instanceof Error ? error.message : "Không thể xác thực hồ sơ backend."); }
      });
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      const savedClasses = JSON.parse(localStorage.getItem("pencily_local_classes") || "[]");
      if (Array.isArray(savedClasses) && savedClasses.length > 0) {
        setClasses(savedClasses);
      }
    } catch {}

    void fetchOnlineClasses()
      .then((result) => {
        const remote = result.map((item) => ({ categoryLabel: item.category, badge: "OPEN" as const, badgeColor: "bg-blue-50 text-blue-700", ...item }));
        setClasses((prev) => {
          if (remote.length === 0) return prev;
          const remoteIds = new Set(remote.map((r) => r.id));
          const localOnly = prev.filter((p) => !remoteIds.has(p.id));
          return [...remote, ...localOnly];
        });
      })
      .catch((error) => console.warn("Remote classes fetch:", error.message));

    if (backendAuthenticated) void fetchStudentEnrollmentIds().then(setRegisteredClassIds).catch((error) => setApiNotice(error.message));
  }, [ready, backendAuthenticated, refreshClasses]);
  useEffect(() => { if (ready) { try { localStorage.setItem("pencily_user", JSON.stringify(user)); } catch {} } }, [user, ready]);
  useEffect(() => { if (ready) { try { localStorage.setItem("pencily_posts", JSON.stringify(posts)); } catch {} } }, [posts, ready]);
  const setLanguage = (value: AppLanguage) => { setLanguageState(value); try { localStorage.setItem("pencily_lang", value); } catch {} };
  const logout = () => { void supabase?.auth.signOut().catch((error) => setApiNotice(error.message)); setBackendAuthenticated(false); setUser(initialUser); setRegisteredClassIds([]); document.cookie = "pencily_discord_user=; path=/; max-age=0"; };
  const updateUser = (changes: Partial<StudentUser>) => {
    const { name, realName, age, school, grade, avatar, interests } = changes;
    const safe = Object.fromEntries(Object.entries({ name, realName, age, school, grade, avatar, interests }).filter(([,value]) => value !== undefined));
    const next = { ...user, ...safe }; setUser(next);
    if (backendAuthenticated && next.realName && next.school && next.age) {
      void api<{ profile: PlatformProfile }>("/api/profile", { method: "PATCH", body: JSON.stringify({ name: next.name, realName: next.realName, age: next.age, school: next.school, grade: next.grade, interests: next.interests || [] }) }).then((result) => setUser(profileUser(result.profile))).catch((error) => setApiNotice(error.message));
    }
  };
  const completeProfile: PencilyContextType["completeProfile"] = async (profile) => {
    const parts = profile.realName.trim().split(/\s+/);
    if (!backendAuthenticated) throw new Error("Hãy đăng nhập trước khi lưu hồ sơ.");
    const result = await api<{ profile: PlatformProfile }>("/api/profile", { method: "PATCH", body: JSON.stringify({ name: profile.displayName?.trim() || parts[parts.length - 1], realName: profile.realName.trim(), age: profile.age, school: profile.school.trim(), grade: profile.grade, interests: profile.interests || [] }) });
    setUser(profileUser(result.profile));
  };
  const addPoints = () => { setApiNotice("Điểm PP chỉ được cộng sau khi backend xác nhận hoạt động học tập. Các thao tác xem thử không cấp điểm."); };
  const addLearningMinutes = () => { setApiNotice("Phút học được server xác nhận qua heartbeat hai phía trong phòng WebRTC."); };
  const advanceTutorStep = () => { setApiNotice("Hồ sơ và lớp học cần Academic phê duyệt tại Tutor Studio."); };
  const loginWithDiscord = () => { window.location.href = "/api/auth/discord"; };
  const loginWithCustomDatabase = () => { window.location.href = "/signin"; };
  const addClass = async (draft: ClassDraft) => {
    let created: ClassSession | null = null;
    if (backendAuthenticated) {
      try {
        const onlineClass = await createOnlineClass(draft);
        created = {
          categoryLabel: onlineClass.category,
          badge: "OPEN",
          badgeColor: "bg-blue-50 text-blue-700",
          ...onlineClass,
        };
      } catch (err) {
        console.warn("Backend class creation skipped or failed, activating local session class:", err);
      }
    }

    if (!created) {
      const id = `room-${Date.now().toString(36)}`;
      const categoryLabels: Record<string, string> = {
        toan: "Toán",
        tin: "Tin học",
        ielts: "Tiếng Anh / IELTS",
        ly: "Vật lý",
        sat: "SAT",
        khac: "Khác",
      };
      created = {
        id,
        title: draft.title || "Phòng học mở",
        category: draft.category || "khac",
        categoryLabel: categoryLabels[draft.category] || "Chuyên đề",
        badge: "OPEN",
        badgeColor: "bg-[#22C55E]/15 text-[#16A34A]",
        tutorName: user.realName || user.name || "Peer Tutor",
        tutorSchool: user.school || "The Pencily",
        tutorRole: "Host phòng học",
        schedule: new Date(draft.scheduledTime).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" }),
        timeSlot: "Trực tuyến",
        dayLabel: "Hôm nay",
        discordChannel: "#voice-phong-hoc",
        discordRoom: "#voice-phong-hoc",
        meetUrl: draft.platform === "web" ? `/room/${id}` : (draft.meetUrl || `/room/${id}`),
        maxSeats: draft.maxSeats || 6,
        enrolledCount: 1,
        description: draft.objectives || "Phòng học trực tiếp trên The Pencily.",
        status: "approved",
        programType: draft.programType,
      };
    }

    setClasses((previous) => {
      const updated = [created!, ...previous.filter((c) => c.id !== created!.id)];
      try {
        localStorage.setItem("pencily_local_classes", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };
  const deleteClass = async (id: string) => { try { await deleteOnlineClass(id); await refreshClasses(); } catch (error) { setApiNotice(error instanceof Error ? error.message : "Không thể hủy lớp."); } };
  const registerClass = async (id: string) => {
    try { await enrollOnlineClass(id); setRegisteredClassIds(await fetchStudentEnrollmentIds()); await refreshClasses(); return true; }
    catch (error) { setApiNotice(error instanceof Error ? error.message : "Không thể ghi danh."); return false; }
  };
  const cancelClassRegistration = async (id: string) => { try { await cancelOnlineEnrollment(id); setRegisteredClassIds(await fetchStudentEnrollmentIds()); await refreshClasses(); } catch (error) { setApiNotice(error instanceof Error ? error.message : "Không thể hủy ghi danh."); } };
  const redeemReward = async (rewardId: string) => {
    try { const result = await api<{ profile: PlatformProfile }>("/api/rewards", { method: "POST", body: JSON.stringify({ rewardId }) }); setUser(profileUser(result.profile)); return true; }
    catch (error) { setApiNotice(error instanceof Error ? error.message : "Không thể đổi phần thưởng."); return false; }
  };
  const createPost: PencilyContextType["createPost"] = (input) => {
    setPosts((previous) => [{ id: crypto.randomUUID(), ...input, categoryLabel: input.category, categoryBadge: "bg-blue-50 text-blue-700",
      author: { name: user.name, school: user.school, role: user.role, verified: user.verified, avatar: user.avatar },
      timeAgo: "Vừa xong", likes: 0, commentsCount: 0, discordThreadUrl: "https://discord.gg/6hpEf4wC4z" }, ...previous]);
    setApiNotice("Bài viết đã lưu trên trình duyệt để xem thử. Chưa xuất bản lên cộng đồng hoặc Discord.");
  };
  const toggleLikePost = (id: string) => setPosts((previous) => previous.map((post) => post.id === id ? { ...post, hasLiked: !post.hasLiked, likes: Math.max(0, post.likes + (post.hasLiked ? -1 : 1)) } : post));
  const addCommentToPost = (id: string, value: string) => { if (!value.trim()) return; setPosts((previous) => previous.map((post) => post.id === id ? { ...post, commentsCount: post.commentsCount + 1, comments: [...(post.comments || []), { id: crypto.randomUUID(), text: value.trim(), authorName: user.name, createdAt: "Vừa xong" }] } : post)); };
  const requestClass: PencilyContextType["requestClass"] = (input) => setClassRequests((previous) => [{ id: crypto.randomUUID(), ...input, requesterName: input.requesterName || user.name, school: input.school || user.school, votes: 1, hasVoted: true, createdAt: "Vừa xong" }, ...previous]);
  const voteClassRequest = (id: string) => setClassRequests((previous) => previous.map((item) => item.id === id ? { ...item, hasVoted: !item.hasVoted, votes: item.votes + (item.hasVoted ? -1 : 1) } : item));
  return <PencilyContext.Provider value={{ user, language, setLanguage, isLoggedIn: backendAuthenticated, backendAuthenticated,
    apiNotice, clearNotice: () => setApiNotice(""), refreshProfile, refreshClasses, redeemReward,
    loginWithDiscord, loginWithCustomDatabase, logout, updateUser, completeProfile, addPoints, addLearningMinutes, advanceTutorStep,
    classes, addClass, deleteClass, registeredClassIds, registerClass, cancelClassRegistration, isRegistered: (id) => registeredClassIds.includes(id),
    posts, createPost, toggleLikePost, addCommentToPost, classRequests, requestClass, voteClassRequest, activities,
    onlineStudentsCount: 0, activeVoiceRoomsCount: 0,
    unreadNotifCount, setUnreadNotifCount }}>{children}</PencilyContext.Provider>;
}
export function usePencily() { const value = useContext(PencilyContext); if (!value) throw new Error("usePencily must be used within PencilyProvider"); return value; }
