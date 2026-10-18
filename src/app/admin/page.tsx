"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Database,
  Users,
  GraduationCap,
  Calendar,
  Upload,
  Trash2,
  Edit3,
  Plus,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Copy,
  AlertTriangle,
  ArrowLeft,
  Eye,
  Award,
  FileText,
  Check,
  Lock,
  Key,
  Server,
  Layers,
  Folder,
  HardDrive,
  Download,
  Settings,
  ChevronRight,
  TrendingUp,
  Clock,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { usePencily } from "@/context/PencilyContext";

type AdminTab =
  | "overview"
  | "users"
  | "classes"
  | "tutors"
  | "storage"
  | "redemptions"
  | "raw_db"
  | "settings";

interface AdminOverviewData {
  stats: {
    totalUsers: number;
    adminCount: number;
    academicCount: number;
    tutorCount: number;
    learnerCount: number;
    totalPoints: number;
    totalClasses: number;
    liveClasses: number;
    approvedClasses: number;
    pendingClasses: number;
    totalTutorApplications: number;
    pendingTutors: number;
    approvedTutors: number;
    totalRedemptions: number;
    totalPPSpent: number;
    totalEnrollments: number;
    totalVerifiedAttendance: number;
    totalStorageFiles: number;
    totalStorageBytes: number;
  };
  system: {
    supabaseUrl: string;
    databaseStatus: string;
    storageBucket: string;
    currentTime: string;
  };
}

export default function AdminPage() {
  const { user, language } = usePencily();
  const isVi = language === "vi";

  // Auth & Admin Key State
  const [adminKey, setAdminKey] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [keyInput, setKeyInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Tab Data States
  const [overview, setOverview] = useState<AdminOverviewData | null>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [classesList, setClassesList] = useState<any[]>([]);
  const [tutorsList, setTutorsList] = useState<any[]>([]);
  const [storageFiles, setStorageFiles] = useState<any[]>([]);
  const [redemptionsList, setRedemptionsList] = useState<any[]>([]);
  const [rawDbData, setRawDbData] = useState<{ table: string; count: number; rows: any[]; allowedTables: string[] } | null>(null);
  const [selectedTable, setSelectedTable] = useState<string>("users");
  const [siteSettings, setSiteSettings] = useState<any>(null);

  // Modals & Forms
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [isCreateUserModal, setIsCreateUserModal] = useState<boolean>(false);
  const [newUserForm, setNewUserForm] = useState({
    name: "",
    email: "",
    school: "",
    grade: "Lớp 11",
    role: "learner",
    points: 20,
    password: "",
  });

  const [editingClass, setEditingClass] = useState<any | null>(null);
  const [isCreateClassModal, setIsCreateClassModal] = useState<boolean>(false);
  const [newClassForm, setNewClassForm] = useState({
    title: "",
    category: "toan",
    tutor_name: "Huỳnh Công Thành",
    tutor_school: "Phổ Thông Năng Khiếu, ĐHQG-HCM",
    schedule: "Thứ 3 & Thứ 6 lúc 19:30",
    meet_url: "/room/demo-live",
    max_seats: 20,
    status: "approved",
    description: "",
    materials_url: "",
  });

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Raw DB edit/insert
  const [rawEditRow, setRawEditRow] = useState<any | null>(null);
  const [rawJsonInput, setRawJsonInput] = useState<string>("");

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const notify = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Helper to get headers for API
  const getHeaders = useCallback(() => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (adminKey) {
      headers["x-admin-key"] = adminKey;
    }
    // Also include supabase token if present in localStorage
    if (typeof window !== "undefined") {
      const storedKey = localStorage.getItem("pencily_admin_key");
      if (storedKey && !headers["x-admin-key"]) {
        headers["x-admin-key"] = storedKey;
      }
    }
    return headers;
  }, [adminKey]);

  // Initial Auth Check
  useEffect(() => {
    const checkAuth = async () => {
      setIsCheckingAuth(true);
      setAuthError("");

      // Check localStorage for saved admin key
      const savedKey = typeof window !== "undefined" ? localStorage.getItem("pencily_admin_key") : null;
      const keyToTry = savedKey || (user.email === "hhuuyynnhhccoonnggtthhaannhh@gmail.com" || user.role === "admin" ? "pencily_founder_admin_2026" : "");

      if (keyToTry) {
        try {
          const res = await fetch("/api/admin?tab=overview", {
            headers: { "x-admin-key": keyToTry },
          });
          if (res.ok) {
            setAdminKey(keyToTry);
            setIsAuthenticated(true);
            const data = await res.json();
            setOverview(data);
            setIsCheckingAuth(false);
            return;
          }
        } catch {}
      }

      // Check if current user is admin in context
      const isAdminContext =
        user.platformRole === "admin" ||
        user.role === "admin" ||
        user.role === "Admin" ||
        user.email === "hhuuyynnhhccoonnggtthhaannhh@gmail.com" ||
        user.email === "thepencily@gmail.com";

      if (isAdminContext) {
        // Auto-authenticate with founder master key
        const autoKey = "pencily_founder_admin_2026";
        setAdminKey(autoKey);
        setIsAuthenticated(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("pencily_admin_key", autoKey);
        }
      }

      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [user]);

  // Handle Manual Admin Login
  const handleKeyLogin = async (key: string) => {
    if (!key.trim()) return;
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin?tab=overview", {
        headers: { "x-admin-key": key.trim() },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Mã Admin Master Key không chính xác.");
      }
      setAdminKey(key.trim());
      setIsAuthenticated(true);
      setOverview(data);
      if (typeof window !== "undefined") {
        localStorage.setItem("pencily_admin_key", key.trim());
      }
      notify("Đăng nhập quyền Admin thành công!", "success");
    } catch (err: any) {
      setAuthError(err.message || "Không thể xác thực quyền Admin.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Tab Data
  const fetchTabData = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      if (activeTab === "overview") {
        const res = await fetch("/api/admin?tab=overview", { headers: getHeaders() });
        const data = await res.json();
        if (res.ok) setOverview(data);
      } else if (activeTab === "users") {
        const res = await fetch("/api/admin?tab=users", { headers: getHeaders() });
        const data = await res.json();
        if (res.ok) setUsersList(data.users || []);
      } else if (activeTab === "classes") {
        const res = await fetch("/api/admin?tab=classes", { headers: getHeaders() });
        const data = await res.json();
        if (res.ok) setClassesList(data.classes || []);
      } else if (activeTab === "tutors") {
        const res = await fetch("/api/admin?tab=tutors", { headers: getHeaders() });
        const data = await res.json();
        if (res.ok) setTutorsList(data.applications || []);
      } else if (activeTab === "storage") {
        const res = await fetch("/api/admin?tab=storage", { headers: getHeaders() });
        const data = await res.json();
        if (res.ok) setStorageFiles(data.files || []);
      } else if (activeTab === "redemptions") {
        const res = await fetch("/api/admin?tab=redemptions", { headers: getHeaders() });
        const data = await res.json();
        if (res.ok) setRedemptionsList(data.redemptions || []);
      } else if (activeTab === "raw_db") {
        const res = await fetch(`/api/admin?tab=raw_db&table=${selectedTable}&limit=100`, { headers: getHeaders() });
        const data = await res.json();
        if (res.ok) setRawDbData(data);
      } else if (activeTab === "settings") {
        const res = await fetch("/api/admin?tab=settings", { headers: getHeaders() });
        const data = await res.json();
        if (res.ok) setSiteSettings(data.settings);
      }
    } catch (err: any) {
      notify(err.message || "Lỗi tải dữ liệu", "error");
    } finally {
      setLoading(false);
    }
  }, [activeTab, isAuthenticated, selectedTable, getHeaders]);

  useEffect(() => {
    fetchTabData();
  }, [fetchTabData, refreshKey]);

  // File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "x-admin-key": adminKey,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Tải tệp lên thất bại.");

      notify(`Đã tải lên tệp: ${data.fileName}`, "success");
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      notify(err.message || "Lỗi upload", "error");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  // Delete File
  const handleDeleteFile = async (fileName: string) => {
    if (!confirm(`Bạn có chắc muốn xóa tệp "${fileName}" khỏi lưu trữ Supabase?`)) return;
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ action: "delete_file", fileName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Lỗi xóa tệp.");
      notify("Đã xóa tệp thành công.", "success");
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      notify(err.message || "Lỗi xóa tệp", "error");
    }
  };

  // Copy Link
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
    notify("Đã sao chép đường link tệp vào bộ nhớ tạm!", "success");
  };

  // User Actions
  const handleSaveUser = async () => {
    if (!editingUser) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          action: "update_user",
          userId: editingUser.id,
          updates: {
            name: editingUser.name,
            real_name: editingUser.real_name,
            school: editingUser.school,
            grade: editingUser.grade,
            role: editingUser.role,
            points: Number(editingUser.points),
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Không thể cập nhật người dùng.");
      notify(`Đã cập nhật tài khoản: ${editingUser.name}`, "success");
      setEditingUser(null);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      notify(err.message || "Lỗi cập nhật", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`CẢNH BÁO: Bạn có chắc muốn xóa vĩnh viễn tài khoản "${userName}"? Thao tác này không thể hoàn tác!`)) return;
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ action: "delete_user", userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Không thể xóa người dùng.");
      notify("Đã xóa tài khoản khỏi cơ sở dữ liệu.", "success");
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      notify(err.message || "Lỗi xóa người dùng", "error");
    }
  };

  const handleCreateUser = async () => {
    if (!newUserForm.email || !newUserForm.name) {
      alert("Vui lòng nhập Email và Họ tên.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          action: "create_user",
          ...newUserForm,
          points: Number(newUserForm.points),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Tạo tài khoản thất bại.");
      notify(`Đã tạo thành công tài khoản: ${newUserForm.name}`, "success");
      setIsCreateUserModal(false);
      setNewUserForm({
        name: "",
        email: "",
        school: "",
        grade: "Lớp 11",
        role: "learner",
        points: 20,
        password: "",
      });
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      notify(err.message || "Lỗi tạo tài khoản", "error");
    } finally {
      setLoading(false);
    }
  };

  // Class Actions
  const handleSaveClass = async (classData: any) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          action: "upsert_class",
          classData,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Không thể lưu lớp học.");
      notify(`Đã lưu lớp học: ${classData.title}`, "success");
      setEditingClass(null);
      setIsCreateClassModal(false);
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      notify(err.message || "Lỗi lưu lớp", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClass = async (classId: string, title: string) => {
    if (!confirm(`Bạn có chắc muốn xóa lớp học "${title}"?`)) return;
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ action: "delete_class", classId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Không thể xóa lớp học.");
      notify("Đã xóa lớp học thành công.", "success");
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      notify(err.message || "Lỗi xóa lớp", "error");
    }
  };

  const handleToggleClassStatus = async (cls: any, newStatus: string) => {
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          action: "upsert_class",
          classData: {
            ...cls,
            status: newStatus,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Lỗi đổi trạng thái");
      notify(`Đã đổi trạng thái lớp "${cls.title}" sang: ${newStatus.toUpperCase()}`, "success");
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      notify(err.message || "Lỗi thao tác", "error");
    }
  };

  // Tutor Review
  const handleReviewTutor = async (applicationId: string, decision: "approve" | "reject") => {
    const feedback = prompt(
      decision === "approve"
        ? "Nhập nhận xét phê duyệt (tùy chọn):"
        : "Nhập lý do từ chối đơn gia sư:"
    );
    if (decision === "reject" && feedback === null) return;

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          action: "review_tutor",
          applicationId,
          decision,
          feedback: feedback || "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Lỗi duyệt gia sư.");
      notify(
        decision === "approve"
          ? "Đã phê duyệt gia sư & cấp quyền thành công!"
          : "Đã từ chối đơn gia sư.",
        "success"
      );
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      notify(err.message || "Lỗi duyệt gia sư", "error");
    }
  };

  // Raw DB Row Delete
  const handleRawDelete = async (keyCol: string, val: any) => {
    if (!confirm(`Xác nhận xóa dòng có ${keyCol} = "${val}" khỏi bảng ${selectedTable}?`)) return;
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          action: "raw_delete",
          table: selectedTable,
          keyColumn: keyCol,
          keyValue: val,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Xóa thất bại");
      notify("Đã xóa dòng khỏi database.", "success");
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      notify(err.message || "Lỗi xóa dòng", "error");
    }
  };

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return usersList.filter((u) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        (u.name || "").toLowerCase().includes(q) ||
        (u.real_name || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        (u.school || "").toLowerCase().includes(q);
      const matchRole = roleFilter === "all" || u.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [usersList, searchQuery, roleFilter]);

  // Filtered Classes
  const filteredClasses = useMemo(() => {
    return classesList.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        (c.title || "").toLowerCase().includes(q) ||
        (c.tutor_name || "").toLowerCase().includes(q) ||
        (c.category || "").toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [classesList, searchQuery, statusFilter]);

  // ----------------------------------------------------
  // RENDER: AUTH LOCK SCREEN IF NOT ADMIN
  // ----------------------------------------------------
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#FFF9EF] flex items-center justify-center p-4">
        <div className="bg-white border-2 border-[#0F2747] p-8 rounded-sm shadow-md text-center max-w-sm w-full space-y-4">
          <RefreshCw className="w-8 h-8 animate-spin text-[#4F7ECB] mx-auto" />
          <h2 className="font-poppins font-black text-sm text-[#0F2747]">
            {isVi ? "Đang xác thực quyền Admin The Pencily..." : "Verifying Admin Permissions..."}
          </h2>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF9EF] flex items-center justify-center p-4">
        <div className="bg-white border-2 border-[#0F2747] rounded-sm p-6 sm:p-8 max-w-md w-full shadow-lg space-y-5">
          <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-sm bg-red-100 border-2 border-red-400 flex items-center justify-center text-red-700">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-poppins font-black text-base text-[#0F2747]">
                {isVi ? "Khu Vực Quản Trị Viên (Admin)" : "Admin Security Deck"}
              </h1>
              <p className="text-xs text-slate-500">
                {isVi ? "The Pencily Database & CMS Control" : "Protected Founder Access"}
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border-2 border-amber-300 p-3.5 rounded-sm text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>{isVi ? "Xác thực danh tính Quản trị viên" : "Admin Identification"}</span>
            </div>
            <p className="text-[11px] text-amber-800">
              {isVi
                ? "Khu vực này cho phép kiểm soát toàn bộ cơ sở dữ liệu Supabase, tải lên tài liệu, chỉnh sửa người dùng và lớp học."
                : "This area provides full read/write access to the database, file storage, and platform operations."}
            </p>
          </div>

          {authError && (
            <div className="bg-red-50 border-2 border-red-300 p-3 rounded-sm text-xs text-red-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                {isVi ? "Mã Admin Master Key / Passcode" : "Admin Master Key"}
              </label>
              <input
                type="password"
                placeholder="Nhập mã Admin Master Key..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleKeyLogin(keyInput)}
                className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none bg-white text-xs font-medium text-[#0F2747]"
              />
            </div>

            <button
              type="button"
              onClick={() => handleKeyLogin(keyInput)}
              disabled={loading || !keyInput.trim()}
              className="w-full py-2.5 rounded-xs bg-[#0F2747] hover:bg-[#1a385f] disabled:bg-slate-300 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Key className="w-4 h-4" />
              )}
              <span>{isVi ? "Mở Khóa Bảng Điều Khiển Admin" : "Unlock Admin Deck"}</span>
            </button>
          </div>

          <div className="pt-2 border-t-2 border-slate-100 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => handleKeyLogin("pencily_founder_admin_2026")}
              className="text-[#4F7ECB] hover:text-[#0F2747] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isVi ? "Xác thực nhanh: Huỳnh Công Thành (Founder)" : "Quick Auth: Founder"}</span>
            </button>

            <Link
              href="/dashboard"
              className="text-slate-500 hover:text-slate-800 font-semibold hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isVi ? "Về Dashboard" : "Back"}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // MAIN ADMIN INTERFACE
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FAF7EE] text-[#0F2747] flex flex-col font-sans">
      {/* TOAST NOTIFICATION */}
      {notification && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xs border-2 shadow-lg flex items-center gap-2 text-xs font-bold transition-all ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-600 text-emerald-900"
              : "bg-red-50 border-red-600 text-red-900"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* TOPBAR */}
      <header className="bg-white border-b-2 border-slate-300 sticky top-0 z-40 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="w-8 h-8 rounded-xs border-2 border-slate-300 hover:border-[#0F2747] bg-[#FAF7EE] flex items-center justify-center text-[#0F2747] transition"
            title="Về Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-poppins font-black text-sm sm:text-base text-[#0F2747] tracking-tight">
                The Pencily Control Deck
              </span>
              <span className="px-2 py-0.5 rounded-xs text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                Admin Mode
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-xs text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                Supabase Connected
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Quản trị toàn diện Cơ sở dữ liệu, Kho tệp lưu trữ, Lớp học và Người dùng
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRefreshKey((k) => k + 1)}
            disabled={loading}
            className="px-3 py-1.5 rounded-xs border-2 border-slate-300 hover:border-[#0F2747] bg-white text-xs font-bold text-[#0F2747] flex items-center gap-1.5 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">{isVi ? "Làm Mới" : "Refresh"}</span>
          </button>

          <Link
            href="/dashboard"
            className="px-3 py-1.5 rounded-xs bg-[#0F2747] hover:bg-[#1a385f] text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{isVi ? "Xem Web" : "Open App"}</span>
          </Link>
        </div>
      </header>

      {/* ADMIN WORKSPACE CONTAINER */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* LEFT NAVIGATION COLUMN */}
        <aside className="w-full md:w-64 shrink-0 space-y-4">
          <div className="bg-white border-2 border-[#0F2747] rounded-sm p-4 shadow-2xs space-y-3">
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Danh Mục Quản Trị
            </div>

            <nav className="space-y-1">
              {[
                { id: "overview" as const, label: "Tổng Quan & Chỉ Số", icon: TrendingUp },
                { id: "users" as const, label: "Quản Lý Tài Khoản", icon: Users, count: overview?.stats.totalUsers },
                { id: "classes" as const, label: "Lớp Học & Phòng Live", icon: Calendar, count: overview?.stats.totalClasses },
                { id: "tutors" as const, label: "Duyệt Đơn Gia Sư", icon: GraduationCap, count: overview?.stats.pendingTutors, badgeAlert: (overview?.stats.pendingTutors || 0) > 0 },
                { id: "storage" as const, label: "Kho Tệp & Uploads", icon: Upload, count: overview?.stats.totalStorageFiles },
                { id: "redemptions" as const, label: "Đổi Thưởng PP Shop", icon: Award, count: overview?.stats.totalRedemptions },
                { id: "raw_db" as const, label: "Trình Duyệt Bảng DB", icon: Database },
                { id: "settings" as const, label: "Cấu Hình & Banner", icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSearchQuery("");
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xs text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                      isActive
                        ? "bg-[#0F2747] text-white"
                        : "text-[#0F2747] hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </div>
                    {typeof tab.count === "number" && (
                      <span
                        className={`px-1.5 py-0.5 rounded-xs text-[10px] font-black ${
                          isActive
                            ? "bg-white/20 text-white"
                            : tab.badgeAlert
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ADMIN PROFILE CARD */}
          <div className="bg-white border-2 border-slate-300 rounded-sm p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-[#0F2747]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Đang đăng nhập với quyền:</span>
            </div>
            <div className="bg-[#FAF7EE] p-2.5 rounded-xs border border-slate-200">
              <div className="font-bold text-[#0F2747]">Huỳnh Công Thành</div>
              <div className="text-[11px] text-slate-500">Founder & Chief Admin</div>
              <div className="text-[10px] font-mono text-slate-400 truncate mt-1">
                hhuuyynnhhccoonnggtthhaannhh@gmail.com
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") localStorage.removeItem("pencily_admin_key");
                setIsAuthenticated(false);
                setAdminKey("");
              }}
              className="w-full py-1.5 text-center text-red-600 hover:text-red-700 font-bold hover:underline cursor-pointer"
            >
              Đăng xuất quyền Admin
            </button>
          </div>
        </aside>

        {/* RIGHT CONTENT WORKSPACE */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* ==================================================== */}
          {/* TAB 1: OVERVIEW & SYSTEM METRICS */}
          {/* ==================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="bg-white border-2 border-[#0F2747] rounded-sm p-5 shadow-2xs">
                <h2 className="font-poppins font-black text-base text-[#0F2747] mb-1">
                  Chỉ Số Cơ Sở Dữ Liệu Thời Gian Thực
                </h2>
                <p className="text-xs text-slate-500 mb-5">
                  Thống kê các bảng dữ liệu Supabase kết nối trực tiếp với The Pencily
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#FAF7EE] border-2 border-slate-300 p-3.5 rounded-xs">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Người Dùng</div>
                    <div className="font-poppins font-black text-2xl text-[#0F2747] mt-1">
                      {overview?.stats.totalUsers ?? "..."}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {overview?.stats.adminCount ?? 0} Admin • {overview?.stats.learnerCount ?? 0} Học viên
                    </div>
                  </div>

                  <div className="bg-[#FAF7EE] border-2 border-slate-300 p-3.5 rounded-xs">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Lớp Học</div>
                    <div className="font-poppins font-black text-2xl text-[#0F2747] mt-1">
                      {overview?.stats.totalClasses ?? "..."}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {overview?.stats.liveClasses ?? 0} Đang học • {overview?.stats.approvedClasses ?? 0} Đã duyệt
                    </div>
                  </div>

                  <div className="bg-[#FAF7EE] border-2 border-slate-300 p-3.5 rounded-xs">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Điểm PP Lưu Thông</div>
                    <div className="font-poppins font-black text-2xl text-amber-600 mt-1">
                      {overview?.stats.totalPoints?.toLocaleString() ?? "..."}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {overview?.stats.totalPPSpent ?? 0} PP đã đổi thưởng
                    </div>
                  </div>

                  <div className="bg-[#FAF7EE] border-2 border-slate-300 p-3.5 rounded-xs">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Tệp Tin Uploads</div>
                    <div className="font-poppins font-black text-2xl text-[#4F7ECB] mt-1">
                      {overview?.stats.totalStorageFiles ?? "..."}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {overview?.stats.totalStorageBytes
                        ? `${(overview.stats.totalStorageBytes / (1024 * 1024)).toFixed(2)} MB`
                        : "0 MB"}
                    </div>
                  </div>
                </div>
              </div>

              {/* QUICK ACTIONS DOCK */}
              <div className="bg-white border-2 border-slate-300 rounded-sm p-5 space-y-3">
                <div className="font-poppins font-bold text-sm text-[#0F2747]">
                  Thao Tác Nhanh Quản Trị
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("classes");
                      setIsCreateClassModal(true);
                    }}
                    className="p-3.5 rounded-xs border-2 border-slate-300 hover:border-[#0F2747] hover:bg-[#FAF7EE] text-left transition cursor-pointer space-y-1"
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-[#0F2747]">
                      <Plus className="w-4 h-4 text-[#4F7ECB]" />
                      <span>Đăng Lớp Học Mới</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Tạo lớp học trực tuyến, kích hoạt ngay trạng thái Live hoặc Mở đăng ký.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("users");
                      setIsCreateUserModal(true);
                    }}
                    className="p-3.5 rounded-xs border-2 border-slate-300 hover:border-[#0F2747] hover:bg-[#FAF7EE] text-left transition cursor-pointer space-y-1"
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-[#0F2747]">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span>Tạo Tài Khoản Mới</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Thêm tài khoản học sinh, gia sư hoặc admin trực tiếp vào DB.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("storage")}
                    className="p-3.5 rounded-xs border-2 border-slate-300 hover:border-[#0F2747] hover:bg-[#FAF7EE] text-left transition cursor-pointer space-y-1"
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-[#0F2747]">
                      <Upload className="w-4 h-4 text-amber-600" />
                      <span>Upload Tài Liệu & Ảnh</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Tải tệp PDF, ảnh, tài liệu lên kho lưu trữ đám mây Supabase.
                    </p>
                  </button>
                </div>
              </div>

              {/* SYSTEM INFORMATION */}
              <div className="bg-white border-2 border-slate-300 rounded-sm p-5 space-y-3">
                <div className="font-poppins font-bold text-sm text-[#0F2747]">
                  Thông Tin Kết Nối Hạ Tầng
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 bg-[#FAF7EE] rounded-xs border border-slate-200">
                    <span className="text-slate-500">Supabase Database Endpoint:</span>
                    <span className="font-bold text-[#0F2747] truncate max-w-xs">{overview?.system.supabaseUrl}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#FAF7EE] rounded-xs border border-slate-200">
                    <span className="text-slate-500">Storage Bucket:</span>
                    <span className="font-bold text-emerald-700">pencily-uploads (Public CDN)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#FAF7EE] rounded-xs border border-slate-200">
                    <span className="text-slate-500">Chế độ RLS & Quyền:</span>
                    <span className="font-bold text-[#0F2747]">Service Role Bypass Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: USERS MANAGEMENT */}
          {/* ==================================================== */}
          {activeTab === "users" && (
            <div className="space-y-4">
              <div className="bg-white border-2 border-[#0F2747] rounded-sm p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Tìm theo tên, email, trường học..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs font-medium text-[#0F2747]"
                    />
                  </div>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs font-bold text-[#0F2747] bg-white"
                  >
                    <option value="all">Tất cả vai trò</option>
                    <option value="admin">Admin</option>
                    <option value="academic">Academic</option>
                    <option value="tutor">Peer Tutor</option>
                    <option value="learner">Học viên</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCreateUserModal(true)}
                  className="px-4 py-2 rounded-xs bg-[#0F2747] hover:bg-[#1a385f] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tạo Tài Khoản Mới</span>
                </button>
              </div>

              {/* USERS TABLE */}
              <div className="bg-white border-2 border-slate-300 rounded-sm overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF7EE] border-b-2 border-slate-300 text-[#0F2747] font-black uppercase tracking-wider text-[11px]">
                        <th className="p-3">Học Sinh / Tài Khoản</th>
                        <th className="p-3">Email & Trường Học</th>
                        <th className="p-3">Vai Trò</th>
                        <th className="p-3">Điểm PP</th>
                        <th className="p-3 text-right">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                            Không tìm thấy tài khoản phù hợp với tìm kiếm.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((u) => (
                          <tr key={u.id} className="hover:bg-slate-50 transition">
                            <td className="p-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xs bg-[#FFC83D] border border-slate-400 text-[#0F2747] font-black text-xs flex items-center justify-center shrink-0">
                                  {(u.real_name || u.name || "P").charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-[#0F2747] truncate">
                                    {u.real_name || u.name}
                                  </div>
                                  <div className="text-[10px] text-slate-500 truncate">
                                    {u.name !== u.real_name ? `(${u.name})` : ""}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="p-3">
                              <div className="font-medium text-[#0F2747] truncate max-w-xs">
                                {u.email || "Chưa liên kết email"}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate max-w-xs">
                                {u.school || "Chưa cập nhật trường"} • <span className="font-bold">{u.grade || "THPT"}</span>
                              </div>
                            </td>

                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-xs text-[10px] font-black uppercase tracking-wider ${
                                  u.role === "admin"
                                    ? "bg-purple-100 text-purple-900 border border-purple-300"
                                    : u.role === "academic"
                                    ? "bg-blue-100 text-blue-900 border border-blue-300"
                                    : u.role === "tutor"
                                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                    : "bg-slate-100 text-slate-800 border border-slate-300"
                                }`}
                              >
                                {u.role === "admin"
                                  ? "Admin"
                                  : u.role === "academic"
                                  ? "Academic"
                                  : u.role === "tutor"
                                  ? "Peer Tutor"
                                  : "Học Viên"}
                              </span>
                            </td>

                            <td className="p-3 font-mono font-bold text-amber-600">
                              {u.points ?? 0} PP
                            </td>

                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setEditingUser(u)}
                                  className="p-1.5 rounded-xs border border-slate-300 hover:border-[#0F2747] hover:bg-slate-100 text-[#0F2747] transition cursor-pointer"
                                  title="Chỉnh sửa tài khoản"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteUser(u.id, u.real_name || u.name)}
                                  className="p-1.5 rounded-xs border border-red-300 hover:bg-red-50 text-red-600 transition cursor-pointer"
                                  title="Xóa tài khoản"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 3: CLASSES MANAGEMENT */}
          {/* ==================================================== */}
          {activeTab === "classes" && (
            <div className="space-y-4">
              <div className="bg-white border-2 border-[#0F2747] rounded-sm p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Tìm lớp học, môn, gia sư..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs font-medium text-[#0F2747]"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs font-bold text-[#0F2747] bg-white"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="live">Đang học (Live)</option>
                    <option value="approved">Đã duyệt (Approved)</option>
                    <option value="pending_demo">Chờ demo</option>
                    <option value="draft">Bản nháp</option>
                    <option value="completed">Đã hoàn thành</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCreateClassModal(true)}
                  className="px-4 py-2 rounded-xs bg-[#0F2747] hover:bg-[#1a385f] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Đăng Lớp Mới</span>
                </button>
              </div>

              {/* CLASSES LIST */}
              <div className="space-y-3">
                {filteredClasses.length === 0 ? (
                  <div className="bg-white border-2 border-slate-300 rounded-sm p-8 text-center text-slate-500 font-medium">
                    Không có lớp học nào phù hợp. Bấm "Đăng Lớp Mới" để tạo lớp học đầu tiên!
                  </div>
                ) : (
                  filteredClasses.map((cls) => (
                    <div
                      key={cls.id}
                      className="bg-white border-2 border-slate-300 hover:border-[#0F2747] rounded-sm p-4 transition shadow-2xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`px-2 py-0.5 rounded-xs text-[10px] font-black uppercase tracking-wider ${
                                cls.status === "live"
                                  ? "bg-red-100 text-red-800 border border-red-300"
                                  : cls.status === "approved"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                  : cls.status === "pending_demo"
                                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                                  : "bg-slate-100 text-slate-700 border border-slate-300"
                              }`}
                            >
                              {cls.status.toUpperCase()}
                            </span>
                            <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase bg-blue-50 text-blue-800 border border-blue-200">
                              {cls.category}
                            </span>
                            <h3 className="font-poppins font-black text-sm text-[#0F2747]">
                              {cls.title}
                            </h3>
                          </div>
                          <div className="text-xs text-slate-600">
                            Gia sư: <span className="font-bold text-[#0F2747]">{cls.tutor_name}</span> ({cls.tutor_school || "The Pencily"}) • Lịch: <span className="font-bold text-[#0F2747]">{cls.schedule}</span>
                          </div>
                        </div>

                        {/* STATUS TOGGLE SHORTCUT BUTTONS */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {cls.status !== "live" && (
                            <button
                              type="button"
                              onClick={() => handleToggleClassStatus(cls, "live")}
                              className="px-2 py-1 rounded-xs bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold uppercase tracking-wider transition cursor-pointer"
                            >
                              Kích Hoạt Live
                            </button>
                          )}
                          {cls.status !== "approved" && (
                            <button
                              type="button"
                              onClick={() => handleToggleClassStatus(cls, "approved")}
                              className="px-2 py-1 rounded-xs bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold uppercase tracking-wider transition cursor-pointer"
                            >
                              Duyệt Mở Đăng Ký
                            </button>
                          )}
                          {cls.status !== "completed" && (
                            <button
                              type="button"
                              onClick={() => handleToggleClassStatus(cls, "completed")}
                              className="px-2 py-1 rounded-xs bg-slate-600 hover:bg-slate-700 text-white text-[11px] font-bold uppercase tracking-wider transition cursor-pointer"
                            >
                              Kết Thúc
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                        <div className="flex items-center gap-4 flex-wrap">
                          <div>
                            Link phòng:{" "}
                            <a
                              href={cls.meet_url}
                              target="_blank"
                              rel="noreferrer"
                              className="font-mono text-[#4F7ECB] hover:underline font-bold"
                            >
                              {cls.meet_url}
                            </a>
                          </div>
                          <div>
                            Ghế: <span className="font-bold text-[#0F2747]">{cls.enrolled_count ?? 0}/{cls.max_seats ?? 20}</span>
                          </div>
                          {cls.materials_url && (
                            <div>
                              Tài liệu:{" "}
                              <a
                                href={cls.materials_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#4F7ECB] hover:underline font-bold"
                              >
                                Xem Link
                              </a>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingClass(cls)}
                            className="px-2.5 py-1 rounded-xs border border-slate-300 hover:border-[#0F2747] text-[#0F2747] font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Sửa</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteClass(cls.id, cls.title)}
                            className="px-2.5 py-1 rounded-xs border border-red-300 hover:bg-red-50 text-red-600 font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Xóa</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 4: TUTOR APPLICATIONS */}
          {/* ==================================================== */}
          {activeTab === "tutors" && (
            <div className="space-y-4">
              <div className="bg-white border-2 border-[#0F2747] rounded-sm p-4 shadow-2xs">
                <h2 className="font-poppins font-black text-sm text-[#0F2747]">
                  Duyệt Đơn Đăng Ký Peer Tutor
                </h2>
                <p className="text-xs text-slate-500">
                  Thẩm định danh tính, học lực và động lực giảng dạy của học sinh trước khi cấp quyền đứng lớp
                </p>
              </div>

              <div className="space-y-3">
                {tutorsList.length === 0 ? (
                  <div className="bg-white border-2 border-slate-300 rounded-sm p-8 text-center text-slate-500 font-medium">
                    Hiện chưa có đơn đăng ký gia sư nào trong cơ sở dữ liệu.
                  </div>
                ) : (
                  tutorsList.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white border-2 border-slate-300 rounded-sm p-4 shadow-2xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-xs text-[10px] font-black uppercase tracking-wider ${
                                app.status === "approved"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                  : app.status === "rejected"
                                  ? "bg-red-100 text-red-800 border border-red-300"
                                  : "bg-amber-100 text-amber-800 border border-amber-300"
                              }`}
                            >
                              {app.status.toUpperCase()}
                            </span>
                            <div className="font-poppins font-black text-sm text-[#0F2747]">
                              {app.full_name}
                            </div>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            Trường: {app.users?.school || "Chưa rõ"} • Khối: {app.users?.grade || "THPT"} • Tuổi: {app.users?.age || "Chưa cập nhật"}
                          </div>
                        </div>

                        {app.status === "pending" && (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleReviewTutor(app.id, "approve")}
                              className="px-3 py-1.5 rounded-xs bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Phê Duyệt Ngay</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReviewTutor(app.id, "reject")}
                              className="px-3 py-1.5 rounded-xs bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-1"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Từ Chối</span>
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#FAF7EE] p-3 rounded-xs border border-slate-200">
                        <div>
                          <div className="font-bold text-[#0F2747]">Môn giảng dạy:</div>
                          <p className="text-slate-700 mt-0.5">{app.subjects}</p>
                        </div>
                        <div>
                          <div className="font-bold text-[#0F2747]">Minh chứng chuyên môn / Bằng cấp:</div>
                          {app.credentials_url ? (
                            <a
                              href={app.credentials_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#4F7ECB] hover:underline font-bold mt-0.5 flex items-center gap-1 truncate"
                            >
                              <span>{app.credentials_url}</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          ) : (
                            <p className="text-slate-400 italic">Không đính kèm</p>
                          )}
                        </div>
                      </div>

                      {app.motivation && (
                        <div className="text-xs text-slate-600">
                          <span className="font-bold text-[#0F2747]">Động lực giảng dạy:</span> {app.motivation}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 5: STORAGE & UPLOADS */}
          {/* ==================================================== */}
          {activeTab === "storage" && (
            <div className="space-y-4">
              <div className="bg-white border-2 border-[#0F2747] rounded-sm p-5 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="font-poppins font-black text-sm text-[#0F2747]">
                      Kho Tệp Tin & Lưu Trữ Đám Mây (Supabase Storage)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Bucket: <span className="font-mono font-bold text-emerald-700">pencily-uploads</span> • Hỗ trợ tệp PDF, Tài liệu, Hình ảnh, Bài giảng (tối đa 50MB)
                    </p>
                  </div>

                  <label className="px-4 py-2.5 rounded-xs bg-[#0F2747] hover:bg-[#1a385f] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2">
                    <Upload className={`w-4 h-4 ${isUploading ? "animate-spin" : ""}`} />
                    <span>{isUploading ? "Đang Tải Lên..." : "Tải Lên Tệp Mới"}</span>
                    <input
                      type="file"
                      disabled={isUploading}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* FILES LIST */}
              <div className="bg-white border-2 border-slate-300 rounded-sm overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF7EE] border-b-2 border-slate-300 text-[#0F2747] font-black uppercase tracking-wider text-[11px]">
                        <th className="p-3">Tên Tệp Tin</th>
                        <th className="p-3">Kích Thước</th>
                        <th className="p-3">Định Dạng</th>
                        <th className="p-3">Đường Link Công Khai (Public URL)</th>
                        <th className="p-3 text-right">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {storageFiles.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                            Chưa có tệp tin nào trong kho lưu trữ. Hãy bấm "Tải Lên Tệp Mới"!
                          </td>
                        </tr>
                      ) : (
                        storageFiles.map((file) => (
                          <tr key={file.id || file.name} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-bold text-[#0F2747] flex items-center gap-2">
                              <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                              <span className="truncate max-w-xs">{file.name}</span>
                            </td>
                            <td className="p-3 font-mono text-slate-600">
                              {(file.size / 1024).toFixed(1)} KB
                            </td>
                            <td className="p-3 font-mono text-slate-500">
                              {file.mimetype || "application/octet-stream"}
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  readOnly
                                  value={file.publicUrl}
                                  className="w-48 sm:w-64 px-2 py-1 rounded-xs border border-slate-300 bg-[#FAF7EE] text-[11px] font-mono text-slate-600 truncate"
                                />
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(file.publicUrl)}
                                  className="p-1 rounded-xs border border-slate-300 hover:border-[#0F2747] bg-white text-[#0F2747] cursor-pointer"
                                  title="Sao chép Link"
                                >
                                  {copiedUrl === file.publicUrl ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                                <a
                                  href={file.publicUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1 rounded-xs border border-slate-300 hover:border-[#0F2747] bg-white text-[#0F2747]"
                                  title="Xem trực tiếp"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleDeleteFile(file.name)}
                                className="p-1.5 rounded-xs border border-red-300 hover:bg-red-50 text-red-600 transition cursor-pointer"
                                title="Xóa tệp khỏi kho"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 6: REDEMPTIONS */}
          {/* ==================================================== */}
          {activeTab === "redemptions" && (
            <div className="space-y-4">
              <div className="bg-white border-2 border-[#0F2747] rounded-sm p-4 shadow-2xs">
                <h2 className="font-poppins font-black text-sm text-[#0F2747]">
                  Lịch Sử Đổi Thưởng Điểm Pencily Points (PP)
                </h2>
                <p className="text-xs text-slate-500">
                  Danh sách học sinh đã đổi tài liệu, vật phẩm hoặc vai trò từ Cửa Hàng PP
                </p>
              </div>

              <div className="bg-white border-2 border-slate-300 rounded-sm overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF7EE] border-b-2 border-slate-300 text-[#0F2747] font-black uppercase tracking-wider text-[11px]">
                        <th className="p-3">Học Sinh Đổi Quà</th>
                        <th className="p-3">Mã Vật Phẩm (Reward ID)</th>
                        <th className="p-3">Số Điểm PP</th>
                        <th className="p-3">Thời Gian Đổi</th>
                        <th className="p-3 text-right">Trạng Thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {redemptionsList.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                            Chưa có lượt đổi thưởng nào.
                          </td>
                        </tr>
                      ) : (
                        redemptionsList.map((r, idx) => (
                          <tr key={`${r.user_id}_${r.reward_id}_${idx}`} className="hover:bg-slate-50 transition">
                            <td className="p-3">
                              <div className="font-bold text-[#0F2747]">
                                {r.users?.real_name || r.users?.name || "Học sinh"}
                              </div>
                              <div className="text-[11px] text-slate-500">
                                {r.users?.school || "The Pencily"}
                              </div>
                            </td>
                            <td className="p-3 font-mono font-bold text-[#4F7ECB]">
                              {r.reward_id}
                            </td>
                            <td className="p-3 font-mono font-bold text-amber-600">
                              -{r.cost} PP
                            </td>
                            <td className="p-3 text-slate-500 font-mono text-[11px]">
                              {new Date(r.created_at).toLocaleString("vi-VN")}
                            </td>
                            <td className="p-3 text-right">
                              <span className="px-2 py-0.5 rounded-xs text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                                Đã Ghi Nhận
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 7: RAW DATABASE EXPLORER */}
          {/* ==================================================== */}
          {activeTab === "raw_db" && (
            <div className="space-y-4">
              <div className="bg-white border-2 border-[#0F2747] rounded-sm p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h2 className="font-poppins font-black text-sm text-[#0F2747]">
                    Trình Duyệt & Chỉnh Sửa Bảng Dữ Liệu Trực Tiếp
                  </h2>
                  <p className="text-xs text-slate-500">
                    Truy vấn và hiệu chỉnh dữ liệu tầng sâu của mọi bảng trong Supabase
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-600">Chọn bảng:</label>
                  <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="px-3 py-1.5 rounded-xs border-2 border-[#0F2747] font-bold text-xs bg-[#FAF7EE] text-[#0F2747]"
                  >
                    {[
                      "users",
                      "classes",
                      "tutor_applications",
                      "enrollments",
                      "reward_redemptions",
                      "points_ledger",
                      "attendance_records",
                      "room_members",
                      "notification_outbox",
                    ].map((tbl) => (
                      <option key={tbl} value={tbl}>
                        {tbl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* RAW DATA TABLE */}
              <div className="bg-white border-2 border-slate-300 rounded-sm overflow-hidden shadow-2xs">
                <div className="p-3 bg-[#FAF7EE] border-b-2 border-slate-300 flex items-center justify-between text-xs font-bold text-[#0F2747]">
                  <span>
                    Bảng: <span className="font-mono text-[#4F7ECB]">{selectedTable}</span> ({rawDbData?.count ?? 0} dòng)
                  </span>
                  <span className="text-[11px] text-slate-500">Hiển thị tối đa 100 dòng</span>
                </div>

                <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                  {!rawDbData || rawDbData.rows.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 font-medium text-xs">
                      Bảng này hiện chưa có dòng dữ liệu nào.
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse text-[11px] font-mono">
                      <thead className="sticky top-0 bg-slate-100 z-10 border-b border-slate-300">
                        <tr>
                          {Object.keys(rawDbData.rows[0]).map((col) => (
                            <th key={col} className="p-2.5 font-bold text-[#0F2747] whitespace-nowrap border-r border-slate-200">
                              {col}
                            </th>
                          ))}
                          <th className="p-2.5 font-bold text-[#0F2747] text-right">Xóa</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {rawDbData.rows.map((row, idx) => {
                          const idCol = Object.keys(row).find((k) => k === "id" || k === "connection_id" || k === "user_id") || Object.keys(row)[0];
                          const idVal = row[idCol];
                          return (
                            <tr key={idx} className="hover:bg-amber-50/50 transition">
                              {Object.keys(row).map((col) => (
                                <td key={col} className="p-2.5 text-slate-700 whitespace-nowrap border-r border-slate-100 max-w-xs truncate">
                                  {typeof row[col] === "object" ? JSON.stringify(row[col]) : String(row[col] ?? "")}
                                </td>
                              ))}
                              <td className="p-2.5 text-right whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => handleRawDelete(idCol, idVal)}
                                  className="text-red-600 hover:text-red-800 font-bold hover:underline cursor-pointer"
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 8: SITE SETTINGS & ANNOUNCEMENTS */}
          {/* ==================================================== */}
          {activeTab === "settings" && (
            <div className="space-y-4">
              <div className="bg-white border-2 border-[#0F2747] rounded-sm p-5 shadow-2xs space-y-4">
                <h2 className="font-poppins font-black text-sm text-[#0F2747]">
                  Cấu Hình Trang Web & Thông Báo Khẩn Cấp
                </h2>
                <p className="text-xs text-slate-500">
                  Điều chỉnh thanh thông báo banner trên cùng, chế độ bảo trì, và các thiết lập toàn hệ thống
                </p>

                {siteSettings && (
                  <div className="space-y-4 pt-2">
                    <div className="border-2 border-slate-200 p-4 rounded-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-xs text-[#0F2747]">
                          Thanh Banner Thông Báo Toàn Trang (Header Alert)
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={siteSettings.bannerNotice?.enabled}
                            onChange={(e) =>
                              setSiteSettings({
                                ...siteSettings,
                                bannerNotice: {
                                  ...siteSettings.bannerNotice,
                                  enabled: e.target.checked,
                                },
                              })
                            }
                            className="w-4 h-4 accent-[#0F2747]"
                          />
                          <span className="text-xs font-bold">Kích hoạt banner</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            Nội dung Tiếng Việt:
                          </label>
                          <input
                            type="text"
                            value={siteSettings.bannerNotice?.textVi || ""}
                            onChange={(e) =>
                              setSiteSettings({
                                ...siteSettings,
                                bannerNotice: {
                                  ...siteSettings.bannerNotice,
                                  textVi: e.target.value,
                                },
                              })
                            }
                            className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            Nội dung Tiếng Anh:
                          </label>
                          <input
                            type="text"
                            value={siteSettings.bannerNotice?.textEn || ""}
                            onChange={(e) =>
                              setSiteSettings({
                                ...siteSettings,
                                bannerNotice: {
                                  ...siteSettings.bannerNotice,
                                  textEn: e.target.value,
                                },
                              })
                            }
                            className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={async () => {
                        setLoading(true);
                        try {
                          const res = await fetch("/api/admin", {
                            method: "POST",
                            headers: getHeaders(),
                            body: JSON.stringify({
                              action: "update_settings",
                              settings: siteSettings,
                            }),
                          });
                          const data = await res.json();
                          if (!res.ok) throw new Error(data.error);
                          notify("Đã lưu cấu hình trang web thành công!", "success");
                        } catch (err: any) {
                          notify(err.message || "Lỗi lưu cấu hình", "error");
                        } finally {
                          setLoading(false);
                        }
                      }}
                      disabled={loading}
                      className="px-5 py-2.5 rounded-xs bg-[#0F2747] hover:bg-[#1a385f] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                    >
                      Lưu Thay Đổi Cấu Hình
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==================================================== */}
      {/* MODAL: EDIT USER */}
      {/* ==================================================== */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#0F2747] rounded-sm p-6 max-w-md w-full shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-poppins font-black text-sm text-[#0F2747]">
                Chỉnh Sửa Tài Khoản: {editingUser.real_name || editingUser.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                  Họ & Tên
                </label>
                <input
                  type="text"
                  value={editingUser.real_name || editingUser.name || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, real_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                    Vai Trò (Role)
                  </label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none font-bold"
                  >
                    <option value="learner">Học viên (learner)</option>
                    <option value="tutor">Peer Tutor (tutor)</option>
                    <option value="academic">Academic (academic)</option>
                    <option value="admin">Quản trị viên (admin)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                    Điểm Pencily (PP)
                  </label>
                  <input
                    type="number"
                    value={editingUser.points ?? 0}
                    onChange={(e) => setEditingUser({ ...editingUser, points: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                  Trường THPT
                </label>
                <input
                  type="text"
                  value={editingUser.school || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, school: e.target.value })}
                  className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                  Khối Lớp
                </label>
                <input
                  type="text"
                  value={editingUser.grade || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, grade: e.target.value })}
                  className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-xs border border-slate-300 text-slate-700 font-bold text-xs"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSaveUser}
                disabled={loading}
                className="px-5 py-2 rounded-xs bg-[#0F2747] hover:bg-[#1a385f] text-white font-bold text-xs uppercase tracking-wider transition"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: CREATE USER */}
      {/* ==================================================== */}
      {isCreateUserModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#0F2747] rounded-sm p-6 max-w-md w-full shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-poppins font-black text-sm text-[#0F2747]">
                Tạo Tài Khoản Người Dùng Mới
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateUserModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                  Email Đăng Nhập *
                </label>
                <input
                  type="email"
                  placeholder="student@gmail.com"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                  Họ & Tên *
                </label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                    Vai Trò
                  </label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none font-bold"
                  >
                    <option value="learner">Học viên</option>
                    <option value="tutor">Peer Tutor</option>
                    <option value="academic">Academic</option>
                    <option value="admin">Quản trị viên (Admin)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                    Điểm Khởi Đầu (PP)
                  </label>
                  <input
                    type="number"
                    value={newUserForm.points}
                    onChange={(e) => setNewUserForm({ ...newUserForm, points: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                  Trường THPT
                </label>
                <input
                  type="text"
                  placeholder="THPT Chuyên..."
                  value={newUserForm.school}
                  onChange={(e) => setNewUserForm({ ...newUserForm, school: e.target.value })}
                  className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                  Mật Khẩu Ban Đầu (Mặc định: Pencily123456@)
                </label>
                <input
                  type="text"
                  placeholder="Để trống sẽ dùng Pencily123456@"
                  value={newUserForm.password}
                  onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                  className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsCreateUserModal(false)}
                className="px-4 py-2 rounded-xs border border-slate-300 text-slate-700 font-bold text-xs"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleCreateUser}
                disabled={loading}
                className="px-5 py-2 rounded-xs bg-[#0F2747] hover:bg-[#1a385f] text-white font-bold text-xs uppercase tracking-wider transition"
              >
                Tạo Tài Khoản
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: CREATE / EDIT CLASS */}
      {/* ==================================================== */}
      {(isCreateClassModal || editingClass) && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#0F2747] rounded-sm p-6 max-w-lg w-full shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-poppins font-black text-sm text-[#0F2747]">
                {editingClass ? `Sửa Lớp: ${editingClass.title}` : "Đăng Lớp Học Trực Tuyến Mới"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsCreateClassModal(false);
                  setEditingClass(null);
                }}
                className="text-slate-400 hover:text-slate-700"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {(() => {
              const currentForm = editingClass || newClassForm;
              const setForm = (updater: any) => {
                if (editingClass) {
                  setEditingClass((prev: any) => ({ ...prev, ...updater }));
                } else {
                  setNewClassForm((prev) => ({ ...prev, ...updater }));
                }
              };

              return (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                      Tiêu Đề Lớp Học *
                    </label>
                    <input
                      type="text"
                      placeholder="Ôn tập Giải tích 12: Đạo hàm & Khảo sát hàm số"
                      value={currentForm.title}
                      onChange={(e) => setForm({ title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                        Môn Học
                      </label>
                      <select
                        value={currentForm.category}
                        onChange={(e) => setForm({ category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none font-bold"
                      >
                        <option value="toan">Toán học</option>
                        <option value="tin">Tin học / Lập trình</option>
                        <option value="ielts">IELTS / Tiếng Anh</option>
                        <option value="ly">Vật lý</option>
                        <option value="sat">SAT Prep</option>
                        <option value="khac">Khác</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                        Trạng Thái
                      </label>
                      <select
                        value={currentForm.status}
                        onChange={(e) => setForm({ status: e.target.value })}
                        className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none font-bold"
                      >
                        <option value="approved">Đã duyệt (Mở đăng ký)</option>
                        <option value="live">Đang học (Live Now)</option>
                        <option value="pending_demo">Chờ demo duyệt</option>
                        <option value="draft">Bản nháp</option>
                        <option value="completed">Đã kết thúc</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                        Gia Sư Phụ Trách
                      </label>
                      <input
                        type="text"
                        value={currentForm.tutor_name}
                        onChange={(e) => setForm({ tutor_name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                        Trường Gia Sư
                      </label>
                      <input
                        type="text"
                        value={currentForm.tutor_school || ""}
                        onChange={(e) => setForm({ tutor_school: e.target.value })}
                        className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                        Lịch Học
                      </label>
                      <input
                        type="text"
                        placeholder="Thứ 3 & Thứ 6 lúc 19:30"
                        value={currentForm.schedule}
                        onChange={(e) => setForm({ schedule: e.target.value })}
                        className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                        Số Lượng Chỗ (Max Seats)
                      </label>
                      <input
                        type="number"
                        value={currentForm.max_seats || 20}
                        onChange={(e) => setForm({ max_seats: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                      Đường Dẫn Phòng Học (Meet URL) *
                    </label>
                    <input
                      type="text"
                      placeholder="/room/toan-12 hoặc https://meet.google.com/..."
                      value={currentForm.meet_url}
                      onChange={(e) => setForm({ meet_url: e.target.value })}
                      className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                      Đường Dẫn Tài Liệu (Materials URL)
                    </label>
                    <input
                      type="text"
                      placeholder="Link Drive hoặc link tệp tải lên từ Kho Tệp..."
                      value={currentForm.materials_url || ""}
                      onChange={(e) => setForm({ materials_url: e.target.value })}
                      className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#0F2747] mb-1">
                      Mô Tả / Nội Dung Trọng Tâm
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mô tả nội dung bài giảng và phương pháp học..."
                      value={currentForm.description || ""}
                      onChange={(e) => setForm({ description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xs border-2 border-slate-300 focus:border-[#0F2747] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreateClassModal(false);
                        setEditingClass(null);
                      }}
                      className="px-4 py-2 rounded-xs border border-slate-300 text-slate-700 font-bold text-xs"
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveClass(currentForm)}
                      disabled={loading || !currentForm.title}
                      className="px-5 py-2 rounded-xs bg-[#0F2747] hover:bg-[#1a385f] text-white font-bold text-xs uppercase tracking-wider transition"
                    >
                      Lưu Lớp Học
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
