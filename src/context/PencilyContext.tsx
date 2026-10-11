"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchOnlineClasses,
  createOnlineClass,
  enrollOnlineClass,
  cancelOnlineEnrollment,
  fetchStudentEnrollmentIds,
  deleteOnlineClass,
  OnlineClass,
} from "@/lib/supabase";

export interface StudentUser {
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

interface PencilyContextType {
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
  completeProfile: (profile: { realName: string; displayName?: string; age?: number | string; school: string; grade: string }) => void;
  addPoints: (amount: number, reason: string) => void;
  addLearningMinutes: (minutes: number) => void;
  advanceTutorStep: (step: 1 | 2 | 3) => void;
  
  classes: ClassSession[];
  addClass: (newClass: Omit<ClassSession, "id" | "enrolledCount">) => void;
  deleteClass: (classId: string) => void;
  registeredClassIds: string[];
  registerClass: (classId: string) => boolean;
  cancelClassRegistration: (classId: string) => void;
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
}

const initialUser: StudentUser = {
  id: "user-new",
  name: "Học sinh Pencily",
  handle: "@pencily_student",
  email: "",
  school: "Chưa cập nhật",
  grade: "Học sinh",
  discord: "",
  avatar: "P",
  role: "Học viên • The Pencily Gen 1.0",
  verified: false,
  points: 0,
  learningMinutes: 0,
  sessionsAttended: 0,
  rank: 1,
  badges: [],
  tutorProgress: {
    step1_registered: false,
    step2_syllabus: false,
    step3_mock: false,
    isVerifiedTutor: false,
  },
};

const initialClasses: ClassSession[] = [];

const initialPosts: CommunityPost[] = [];

const initialActivities: AutomationActivity[] = [];

const PencilyContext = createContext<PencilyContextType | null>(null);

export function PencilyProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StudentUser>(initialUser);
  const [classes, setClasses] = useState<ClassSession[]>(initialClasses);
  const [classRequests, setClassRequests] = useState<ClassRequest[]>([]);
  const [registeredClassIds, setRegisteredClassIds] = useState<string[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
  const [activities, setActivities] = useState<AutomationActivity[]>(initialActivities);
  const [onlineStudentsCount] = useState(0);
  const [activeVoiceRoomsCount] = useState(0);

  // Initialize from LocalStorage (with version check to clear legacy fake data)
  useEffect(() => {
    try {
      const STORAGE_VERSION = "v4_clean_authentic";
      const currentVersion = localStorage.getItem("pencily_version");
      if (currentVersion !== STORAGE_VERSION) {
        localStorage.removeItem("pencily_user");
        localStorage.removeItem("pencily_registered");
        localStorage.removeItem("pencily_posts");
        localStorage.removeItem("pencily_classes");
        localStorage.removeItem("pencily_requests");
        localStorage.setItem("pencily_version", STORAGE_VERSION);
        return;
      }

      const savedUser = localStorage.getItem("pencily_user");
      if (savedUser) setUser(JSON.parse(savedUser));

      // Hydrate Discord OAuth session if present in cookie
      if (typeof document !== "undefined") {
        const match = document.cookie.match(/(?:^|;\s*)pencily_discord_user=([^;]*)/);
        if (match && match[1]) {
          try {
            const discordData = JSON.parse(decodeURIComponent(match[1]));
            setUser((prev) => {
              const merged = {
                ...prev,
                ...discordData,
                id: discordData.discordId ? `discord-${discordData.discordId}` : prev.id,
                isDiscordLinked: true,
                verified: true,
              };
              localStorage.setItem("pencily_user", JSON.stringify(merged));
              return merged;
            });
          } catch {}
        }
      }

      const savedClasses = localStorage.getItem("pencily_classes");
      if (savedClasses) setClasses(JSON.parse(savedClasses));

      // Fetch online classes from Supabase database
      fetchOnlineClasses().then((cloudClasses) => {
        if (cloudClasses && cloudClasses.length > 0) {
          setClasses(cloudClasses as any);
        }
      });

      const savedRequests = localStorage.getItem("pencily_requests");
      if (savedRequests) setClassRequests(JSON.parse(savedRequests));

      const savedRegistered = localStorage.getItem("pencily_registered");
      if (savedRegistered) setRegisteredClassIds(JSON.parse(savedRegistered));

      const savedPosts = localStorage.getItem("pencily_posts");
      if (savedPosts) setPosts(JSON.parse(savedPosts));
    } catch {
      // ignore storage parsing error
    }
  }, []);

  // Sync enrollments from Supabase when user logs in with Discord
  useEffect(() => {
    if (user.discordId) {
      fetchStudentEnrollmentIds(user.discordId).then((ids) => {
        if (ids && ids.length > 0) {
          setRegisteredClassIds((prev) => Array.from(new Set([...prev, ...ids])));
        }
      });
    }
  }, [user.discordId]);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem("pencily_user", JSON.stringify(user));
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem("pencily_classes", JSON.stringify(classes));
    } catch {}
  }, [classes]);

  useEffect(() => {
    try {
      localStorage.setItem("pencily_requests", JSON.stringify(classRequests));
    } catch {}
  }, [classRequests]);

  useEffect(() => {
    try {
      localStorage.setItem("pencily_registered", JSON.stringify(registeredClassIds));
    } catch {}
  }, [registeredClassIds]);

  useEffect(() => {
    try {
      localStorage.setItem("pencily_posts", JSON.stringify(posts));
    } catch {}
  }, [posts]);

  // Auth state & Actions
  const isLoggedIn = Boolean(user.isDiscordLinked || (user.id && user.id !== "user-new"));

  const loginWithDiscord = (data: Partial<StudentUser>) => {
    setUser((prev) => {
      const merged: StudentUser = {
        ...prev,
        ...data,
        id: data.discordId ? `discord-${data.discordId}` : (prev.id === "user-new" ? `discord-${Date.now()}` : prev.id),
        isDiscordLinked: true,
        verified: true,
      };
      try {
        localStorage.setItem("pencily_user", JSON.stringify(merged));
      } catch {}
      return merged;
    });

    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        timestamp: "Vừa xong",
        type: "badge_earned",
        text: "đã đăng nhập và liên kết tài khoản Discord!",
        actor: data.name || "Học sinh mới",
      },
      ...prev.slice(0, 10),
    ]);
  };

  const loginWithCustomDatabase = (data: {
    email: string;
    name: string;
    realName?: string;
    age?: number | string;
    school?: string;
    grade?: string;
    avatar?: string;
  }) => {
    setUser((prev) => {
      const displayName = data.realName || data.name;
      const initials = displayName
        ? displayName
            .trim()
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "P";
      const merged: StudentUser = {
        ...prev,
        ...data,
        id: `pencily-db-${Date.now()}`,
        name: displayName || "Học sinh Pencily",
        realName: data.realName || displayName,
        age: data.age || prev.age,
        email: data.email,
        school: data.school || "The Pencily Academy",
        grade: data.grade || "Học sinh",
        avatar: data.avatar || initials,
        role: "Học viên • The Pencily Gen 1.0",
        verified: true,
        hasCompletedProfile: Boolean(data.realName || (data.name && !data.name.includes("#") && !data.name.startsWith("@"))),
      };
      try {
        localStorage.setItem("pencily_user", JSON.stringify(merged));
      } catch {}
      return merged;
    });

    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        timestamp: "Vừa xong",
        type: "badge_earned",
        text: "đã đăng nhập vào hệ thống học tập The Pencily!",
        actor: data.name || "Học sinh mới",
      },
      ...prev.slice(0, 10),
    ]);
  };

  const logout = () => {
    if (typeof document !== "undefined") {
      document.cookie = "pencily_discord_user=; path=/; max-age=0;";
    }
    setUser(initialUser);
    try {
      localStorage.removeItem("pencily_user");
      localStorage.removeItem("pencily_registered");
    } catch {}
  };

  const updateUser = (data: Partial<StudentUser>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const completeProfile = (profile: { realName: string; displayName?: string; age?: number | string; school: string; grade: string }) => {
    setUser((prev) => {
      const trimmedName = profile.realName.trim();
      const parts = trimmedName.split(/\s+/).filter(Boolean);
      const defaultGivenName = parts.length > 0 ? parts[parts.length - 1] : trimmedName;
      const finalDisplayName = profile.displayName?.trim() ? profile.displayName.trim().slice(0, 9) : defaultGivenName;
      const updated: StudentUser = {
        ...prev,
        name: finalDisplayName,
        realName: trimmedName,
        age: profile.age || prev.age,
        school: profile.school.trim() || prev.school,
        grade: profile.grade || prev.grade,
        hasCompletedProfile: true,
      };
      try {
        localStorage.setItem("pencily_user", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const addPoints = (amount: number, reason: string) => {
    setUser((prev) => {
      const newPoints = Math.max(0, prev.points + amount);
      return { ...prev, points: newPoints };
    });
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        timestamp: "Vừa xong",
        type: "badge_earned",
        text: amount >= 0 ? `nhận +${amount} PP (${reason})` : `đã đổi ${Math.abs(amount)} PP (${reason})`,
        actor: user.name,
      },
      ...prev.slice(0, 10),
    ]);
  };

  const addLearningMinutes = (minutes: number) => {
    setUser((prev) => ({
      ...prev,
      learningMinutes: prev.learningMinutes + minutes,
    }));
    addPoints(Math.floor(minutes / 12), "Học tập trung");
  };

  const advanceTutorStep = (step: 1 | 2 | 3) => {
    setUser((prev) => {
      const progress = { ...prev.tutorProgress };
      if (step === 1) progress.step1_registered = true;
      if (step === 2) progress.step2_syllabus = true;
      if (step === 3) {
        progress.step3_mock = true;
        progress.isVerifiedTutor = true;
      }
      return {
        ...prev,
        tutorProgress: progress,
        role: progress.isVerifiedTutor ? "Verified Peer Tutor Gen 1.0" : prev.role,
      };
    });

    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        timestamp: "Vừa xong",
        type: "tutor_advance",
        text: step === 3
          ? "đã hoàn thành vòng thử việc và chính thức trở thành Verified Peer Tutor!"
          : `đã hoàn thành bước ${step} lộ trình Peer Tutor`,
        actor: user.name,
        discordChannel: "#thong-bao-tutor",
      },
      ...prev.slice(0, 10),
    ]);

    addPoints(15, `Hoàn thành bước ${step} Tutor`);
  };

  const registerClass = (classId: string) => {
    if (registeredClassIds.includes(classId)) return false;

    const targetClass = classes.find((c) => c.id === classId);
    if (!targetClass) return false;

    // Automate registration
    setRegisteredClassIds((prev) => [...prev, classId]);
    setClasses((prev) =>
      prev.map((c) =>
        c.id === classId ? { ...c, enrolledCount: c.enrolledCount + 1 } : c
      )
    );

    // Persist to Supabase database
    enrollOnlineClass(classId, user.discordId || user.id, user.name);

    return true;
  };

  const cancelClassRegistration = (classId: string) => {
    setRegisteredClassIds((prev) => prev.filter((id) => id !== classId));
    setClasses((prev) =>
      prev.map((c) =>
        c.id === classId ? { ...c, enrolledCount: Math.max(0, c.enrolledCount - 1) } : c
      )
    );

    // Persist cancel to Supabase database
    cancelOnlineEnrollment(classId, user.discordId || user.id);
  };

  const isRegistered = (classId: string) => registeredClassIds.includes(classId);

  const createPost = (postData: {
    category: "docs" | "doubt" | "announcement" | "tips";
    title: string;
    content: string;
    subworld: string;
    discordChannel: string;
    authorName?: string;
    authorSchool?: string;
  }) => {
    const categoryConfig = {
      docs: { label: "Tài Liệu Cornell", badge: "bg-[#4F7ECB]/15 text-[#4F7ECB]" },
      doubt: { label: "Doubt-Clearing", badge: "bg-[#FFC83D]/30 text-[#92400E]" },
      announcement: { label: "Thông Báo Lớp", badge: "bg-[#22C55E]/15 text-[#16A34A]" },
      tips: { label: "Kinh Nghiệm Học", badge: "bg-[#9333EA]/15 text-[#9333EA]" },
    }[postData.category];

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      category: postData.category,
      categoryLabel: categoryConfig.label,
      categoryBadge: categoryConfig.badge,
      subworld: postData.subworld,
      title: postData.title,
      content: postData.content,
      author: {
        name: postData.authorName || user.name,
        school: postData.authorSchool || user.school,
        role: user.role,
        verified: user.verified,
        avatar: user.avatar,
      },
      timeAgo: "Vừa xong",
      likes: 1,
      hasLiked: true,
      commentsCount: 0,
      discordChannel: postData.discordChannel,
      discordThreadUrl: "https://discord.gg/6hpEf4wC4z",
    };

    setPosts((prev) => [newPost, ...prev]);
    addPoints(5, "Đóng góp bài viết cộng đồng");

    // Community Automation Log
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        timestamp: "Vừa xong",
        type: "post_created",
        text: `vừa đăng bài: "${newPost.title}"`,
        actor: user.name,
        discordChannel: postData.discordChannel,
      },
      ...prev.slice(0, 10),
    ]);
  };

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const willLike = !p.hasLiked;
        return {
          ...p,
          hasLiked: willLike,
          likes: willLike ? p.likes + 1 : Math.max(0, p.likes - 1),
        };
      })
    );
  };

  const addClass = (newClassData: Omit<ClassSession, "id" | "enrolledCount">) => {
    const newSession: ClassSession = {
      ...newClassData,
      id: `class-${Date.now()}`,
      enrolledCount: 1,
      meetUrl: newClassData.meetUrl || "https://discord.gg/6hpEf4wC4z",
    };
    setClasses((prev) => [newSession, ...prev]);
    setRegisteredClassIds((prev) => [...prev, newSession.id]);

    // Persist to Supabase database
    createOnlineClass({
      title: newSession.title,
      category: newSession.category,
      tutorName: newSession.tutorName,
      tutorDiscord: newSession.tutorDiscord || user.discord,
      tutorAvatar: newSession.tutorAvatar || user.avatar,
      schedule: newSession.schedule,
      meetUrl: newSession.meetUrl,
      maxSeats: newSession.maxSeats,
      description: newSession.description,
    }).then((created) => {
      if (created && created.id !== newSession.id) {
        setClasses((prev) =>
          prev.map((c) => (c.id === newSession.id ? { ...c, id: created.id } : c))
        );
        setRegisteredClassIds((prev) =>
          prev.map((id) => (id === newSession.id ? created.id : id))
        );
      }
    });
  };

  const deleteClass = (classId: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== classId));
    setRegisteredClassIds((prev) => prev.filter((id) => id !== classId));
    deleteOnlineClass(classId);
  };

  const requestClass = (data: { topic: string; subject: string; requesterName?: string; school?: string }) => {
    const newReq: ClassRequest = {
      id: `req-${Date.now()}`,
      topic: data.topic,
      subject: data.subject,
      requesterName: data.requesterName || user.name,
      school: data.school || user.school,
      votes: 1,
      hasVoted: true,
      createdAt: "Vừa xong",
    };
    setClassRequests((prev) => [newReq, ...prev]);
    addPoints(5, "Đề xuất môn học");
  };

  const voteClassRequest = (requestId: string) => {
    setClassRequests((prev) =>
      prev.map((req) => {
        if (req.id !== requestId) return req;
        const willVote = !req.hasVoted;
        return {
          ...req,
          hasVoted: willVote,
          votes: willVote ? req.votes + 1 : Math.max(0, req.votes - 1),
        };
      })
    );
  };

  const addCommentToPost = (postId: string, text: string) => {
    if (!text.trim()) return;
    const newComment: PostComment = {
      id: `comment-${Date.now()}`,
      authorName: user.name,
      text: text.trim(),
      createdAt: "Vừa xong",
    };
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const currentComments = p.comments || [];
        return {
          ...p,
          commentsCount: (p.commentsCount || 0) + 1,
          comments: [...currentComments, newComment],
        };
      })
    );
    addPoints(2, "Trả lời thắc mắc cộng đồng");
  };

  return (
    <PencilyContext.Provider
      value={{
        user,
        isLoggedIn,
        loginWithDiscord,
        loginWithCustomDatabase,
        logout,
        updateUser,
        completeProfile,
        addPoints,
        addLearningMinutes,
        advanceTutorStep,
        classes,
        addClass,
        deleteClass,
        registeredClassIds,
        registerClass,
        cancelClassRegistration,
        isRegistered,
        classRequests,
        requestClass,
        voteClassRequest,
        posts,
        createPost,
        toggleLikePost,
        addCommentToPost,
        activities,
        onlineStudentsCount,
        activeVoiceRoomsCount,
      }}
    >
      {children}
    </PencilyContext.Provider>
  );
}

export function usePencily() {
  const context = useContext(PencilyContext);
  if (!context) {
    throw new Error("usePencily must be used within a PencilyProvider");
  }
  return context;
}

