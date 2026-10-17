"use client";
import React, { useEffect, useRef, useState } from "react";
import { X, Save, AlertCircle } from "lucide-react";
import { PROGRAM_LABELS, type ClassDraft, type PlatformClass, type ProgramType } from "@/lib/platform";

export type TutorClassFormData = ClassDraft;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tutorName: string;
  tutorSchool?: string;
  initial?: PlatformClass;
  onSubmitCreate: (data: ClassDraft) => Promise<void>;
}

const localDate = (date: Date) => new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

export function TutorClassStudioDrawer(props: Props) {
  return props.isOpen ? <StudioForm key={props.initial?.id || "new"} {...props} /> : null;
}

function StudioForm({ onClose, tutorName, initial, onSubmitCreate }: Props) {
  const [draft, setDraft] = useState<ClassDraft>(() => ({
    title: initial?.title || "",
    category: initial?.category || "toan",
    programType: initial?.program_type || "study_buddy",
    objectives: initial?.objectives || "",
    mainTopics: initial?.main_topics || "",
    materialsUrl: initial?.materials_url || "",
    interactiveActivities: initial?.interactive_activities || "",
    practiceExercises: initial?.practice_exercises || "",
    referenceSources: initial?.reference_sources || "",
    platform: initial?.platform || "web",
    meetUrl: initial?.platform === "web" ? "" : initial?.meet_url || "",
    scheduledTime: initial?.scheduled_time || new Date(Date.now() + 4 * 86400000).toISOString(),
    demoDate: initial?.demo_date || new Date(Date.now() + 86400000).toISOString(),
    maxSeats: initial?.max_seats || 6,
  }));

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement;
    panel.current?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [onClose]);

  function change<K extends keyof ClassDraft>(key: K, value: ClassDraft[K]) {
    setDraft((old) => ({ ...old, [key]: value }));
    if (error) setError("");
  }

  function cleanHttps(url: string) {
    if (!url) return "";
    let clean = url.trim();
    if (clean && !clean.startsWith("http://") && !clean.startsWith("https://")) {
      clean = `https://${clean}`;
    }
    return clean;
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const sanitizedDraft: ClassDraft = {
        ...draft,
        title: draft.title.trim(),
        objectives: draft.objectives.trim() || "Phòng học trực tiếp cùng bạn bè và Peer Tutor.",
        mainTopics: draft.mainTopics.trim() || "Thảo luận và ôn tập kiến thức chuyên đề.",
        materialsUrl: cleanHttps(draft.materialsUrl) || "https://drive.google.com",
        interactiveActivities: draft.interactiveActivities.trim() || "Thảo luận mic, giải bài tập và chia sẻ màn hình.",
        practiceExercises: draft.practiceExercises?.trim() || "",
        referenceSources: draft.referenceSources.trim() || "Sách giáo khoa và tài liệu học tập The Pencily",
        meetUrl: draft.platform === "web" ? "" : cleanHttps(draft.meetUrl) || "https://meet.google.com/new",
      };

      await onSubmitCreate(sanitizedDraft);
      onClose();
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : "Chưa hoàn tất tạo lớp. Vui lòng kiểm tra lại thông tin.";
      setError(message);
      setTimeout(() => {
        errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    } finally {
      setBusy(false);
    }
  }

  const field = "mt-1 block w-full border-2 border-slate-300 rounded-sm p-2.5 bg-white text-sm focus:border-[#0F2747] outline-none transition";

  return (
    <aside
      ref={panel}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-label="Soạn giáo án và mở lớp học"
      className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-[#FFFDF9] text-[#0F2747] border-l-2 border-slate-300 shadow-2xl overflow-y-auto animate-drawer"
    >
      <header className="sticky top-0 bg-white border-b-2 border-slate-200 p-5 flex items-center justify-between z-10">
        <div>
          <h2 className="text-xl font-bold font-poppins text-[#0F2747]">Tutor Studio</h2>
          <p className="text-xs text-slate-500 mt-0.5">{tutorName} · Soạn đề cương & Mở phòng học</p>
        </div>
        <button
          aria-label="Đóng studio"
          onClick={onClose}
          className="p-2 rounded-sm border-2 border-transparent hover:border-slate-300 hover:bg-slate-100 transition cursor-pointer"
        >
          <X size={20} />
        </button>
      </header>

      <form onSubmit={submit} className="p-5 sm:p-7 space-y-5">
        <div className="border-2 border-blue-200 bg-blue-50/70 p-3.5 rounded-sm text-xs text-blue-900 leading-relaxed">
          Phòng học sau khi tạo sẽ được kích hoạt ngay lập tức trên hệ thống để bạn và học sinh có thể tham gia vào học ngay!
        </div>

        {error && (
          <div role="alert" className="border-2 border-red-300 bg-red-50 p-3.5 rounded-sm text-xs text-red-900 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider">
          Chương trình
          <select
            className={field}
            value={draft.programType}
            onChange={(e) => change("programType", e.target.value as ProgramType)}
          >
            {Object.entries(PROGRAM_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider">
          Tên lớp / Chuyên đề *
          <input
            className={field}
            required
            maxLength={255}
            placeholder="Ví dụ: Ôn tập hàm số Toán 12, Giải đề SAT Math, Luyện IELTS Speaking..."
            value={draft.title}
            onChange={(e) => change("title", e.target.value)}
          />
        </label>

        <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider">
          Môn học
          <select
            className={field}
            value={draft.category}
            onChange={(e) => change("category", e.target.value as ClassDraft["category"])}
          >
            {Object.entries({
              toan: "Toán",
              tin: "Tin học",
              ielts: "Tiếng Anh / IELTS",
              ly: "Vật lý",
              sat: "SAT",
              khac: "Khác",
            }).map(([key, label]) => (
              <option value={key} key={key}>
                {label}
              </option>
            ))}
          </select>
        </label>

        {([
          ["objectives", "1. Mục tiêu buổi học"],
          ["mainTopics", "2. Nội dung chính"],
          ["materialsUrl", "3. Link tài liệu / slide (Google Drive, Docs, Canva...)"],
          ["interactiveActivities", "4. Hoạt động tương tác"],
          ["practiceExercises", "5. Bài tập rèn luyện (nếu có)"],
          ["referenceSources", "6. Nguồn tham khảo"],
        ] as const).map(([key, label]) => (
          <label key={key} className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider">
            {label}
            {key === "materialsUrl" ? (
              <input
                type="text"
                className={field}
                placeholder="https://drive.google.com/... hoặc tài liệu đính kèm"
                value={draft[key]}
                onChange={(e) => change(key, e.target.value)}
              />
            ) : (
              <textarea
                className={field}
                rows={key === "practiceExercises" ? 2 : 3}
                maxLength={6000}
                placeholder={`Nhập ${label.toLowerCase()}...`}
                value={draft[key]}
                onChange={(e) => change(key, e.target.value)}
              />
            )}
          </label>
        ))}

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider">
            Nền tảng
            <select
              className={field}
              value={draft.platform}
              onChange={(e) =>
                setDraft((old) => ({
                  ...old,
                  platform: e.target.value as ClassDraft["platform"],
                  maxSeats: e.target.value === "web" ? Math.min(old.maxSeats, 6) : old.maxSeats,
                }))
              }
            >
              <option value="web">Web Pencily P2P (Bật cam, mic, bảng vẽ)</option>
              <option value="meet">Google Meet</option>
              <option value="discord">Discord Voice</option>
            </select>
          </label>
          <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider">
            Sĩ số (kể cả host)
            <input
              type="number"
              min={2}
              max={draft.platform === "web" ? 6 : 100}
              required
              className={field}
              value={draft.maxSeats}
              onChange={(e) => change("maxSeats", Number(e.target.value))}
            />
          </label>
        </div>

        {draft.platform !== "web" && (
          <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider">
            Link phòng {draft.platform === "meet" ? "Google Meet" : "Discord"} *
            <input
              type="text"
              required
              placeholder={draft.platform === "meet" ? "https://meet.google.com/abc-defg-hij" : "https://discord.gg/..."}
              className={field}
              value={draft.meetUrl}
              onChange={(e) => change("meetUrl", e.target.value)}
            />
          </label>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider">
            Lịch học chính thức
            <input
              type="datetime-local"
              required
              className={field}
              value={localDate(new Date(draft.scheduledTime))}
              onChange={(e) => {
                if (e.target.value) change("scheduledTime", new Date(e.target.value).toISOString());
              }}
            />
          </label>
          <label className="block text-xs font-bold text-[#0F2747] uppercase tracking-wider">
            Lịch demo / chuẩn bị
            <input
              type="datetime-local"
              required
              className={field}
              value={localDate(new Date(draft.demoDate))}
              onChange={(e) => {
                if (e.target.value) change("demoDate", new Date(e.target.value).toISOString());
              }}
            />
          </label>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          * Phòng Web Pencily giới hạn tối đa 6 người để đảm bảo chất lượng đường truyền video âm thanh tốt nhất.
        </p>

        {/* Error notification right above the submit button */}
        {error && (
          <div ref={errorRef} role="alert" className="border-2 border-red-300 bg-red-50 p-3.5 rounded-sm text-xs text-red-900 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <button
          disabled={busy}
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-[#0F2747] hover:bg-[#1A3E6D] text-white p-3.5 rounded-sm font-bold text-xs uppercase tracking-wider shadow-xs transition disabled:opacity-50 cursor-pointer active:scale-98"
        >
          <Save size={16} />
          {busy ? "Đang xử lý tạo lớp…" : "Tạo & Mở lớp học ngay"}
        </button>
      </form>
    </aside>
  );
}
