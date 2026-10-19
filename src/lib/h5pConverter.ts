/**
 * H5P Interactive Video Standard Converter & Parser for The Pencily
 * Allows 100% cloud-free interactive videos using YouTube video IDs.
 * Conforms to Joubel H5P.InteractiveVideo content.json schema.
 */

import { VideoLesson, VideoMilestone } from "@/components/ClassVideoLibrary";

export function parseYouTubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  // If it's already an 11-char YouTube ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Handle various YouTube URL formats:
  // - https://www.youtube.com/watch?v=dQw4w9WgXcQ
  // - https://youtu.be/dQw4w9WgXcQ
  // - https://www.youtube.com/embed/dQw4w9WgXcQ
  // - https://www.youtube.com/v/dQw4w9WgXcQ
  // - https://youtube.com/shorts/dQw4w9WgXcQ
  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function formatSecondsToTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export function parseTimeToSeconds(timeStr: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(":").map((p) => parseInt(p, 10) || 0);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return parseInt(timeStr, 10) || 0;
}

/**
 * Exports a VideoLesson into standard H5P Interactive Video JSON
 */
export function exportH5PFormat(lesson: VideoLesson) {
  return {
    title: lesson.title,
    h5p: {
      title: lesson.title,
      language: "vi",
      mainLibrary: "H5P.InteractiveVideo",
      preloadedDependencies: [
        { machineName: "H5P.InteractiveVideo", majorVersion: 1, minorVersion: 26 },
        { machineName: "H5P.MultiChoice", majorVersion: 1, minorVersion: 16 },
      ],
    },
    interactiveVideo: {
      video: {
        files: [
          {
            path: `https://www.youtube.com/watch?v=${lesson.youtubeId}`,
            mime: "video/YouTube",
          },
        ],
        startScreenOptions: {
          title: lesson.title,
          hideStartTitle: false,
          shortStartDescription: lesson.subject,
        },
      },
      assets: {
        interactions: lesson.milestones.map((m, idx) => ({
          x: 50,
          y: 50,
          width: 80,
          height: 70,
          duration: {
            from: m.seconds,
            to: m.seconds,
          },
          pause: true,
          label: m.title,
          action: {
            library: "H5P.MultiChoice 1.16",
            params: {
              question: m.question,
              answers: m.options.map((opt) => ({
                text: opt.text,
                correct: opt.isCorrect,
                tipsAndFeedback: {
                  chosenFeedback: opt.explanation,
                },
              })),
              behaviour: {
                enableRetry: true,
                enableSolutionsButton: true,
                autoCheck: false,
                points: m.points || 5,
              },
            },
          },
        })),
        bookmarks: lesson.syllabus.map((c) => ({
          time: c.seconds,
          label: c.title,
        })),
      },
    },
  };
}

/**
 * Imports an H5P JSON or generic format into a VideoLesson
 */
export function importH5PFormat(
  rawJson: any,
  defaultSubject = "Học liệu số Tương tác"
): Partial<VideoLesson> | null {
  try {
    let youtubeId = "";
    let title = rawJson.title || "Bài giảng tương tác H5P";
    const milestones: VideoMilestone[] = [];

    // Extract video source
    const files =
      rawJson.interactiveVideo?.video?.files ||
      rawJson.video?.files ||
      rawJson.files ||
      [];

    if (Array.isArray(files)) {
      for (const file of files) {
        if (typeof file?.path === "string") {
          const parsed = parseYouTubeId(file.path);
          if (parsed) {
            youtubeId = parsed;
            break;
          }
        }
      }
    }

    if (!youtubeId && typeof rawJson.youtubeId === "string") {
      youtubeId = parseYouTubeId(rawJson.youtubeId) || rawJson.youtubeId;
    }

    // Extract interactions / milestones
    const interactions =
      rawJson.interactiveVideo?.assets?.interactions ||
      rawJson.assets?.interactions ||
      rawJson.interactions ||
      [];

    if (Array.isArray(interactions)) {
      interactions.forEach((item, idx) => {
        const fromSec =
          typeof item?.duration?.from === "number"
            ? item.duration.from
            : typeof item?.seconds === "number"
            ? item.seconds
            : 0;

        const actionParams = item?.action?.params || item;
        const qText =
          actionParams?.question ||
          actionParams?.text ||
          item?.label ||
          `Câu hỏi mốc ${formatSecondsToTime(fromSec)}`;

        const answers = actionParams?.answers || actionParams?.options || [];
        const options = Array.isArray(answers)
          ? answers.map((ans: any, aIdx: number) => ({
              id: `opt-${idx + 1}-${String.fromCharCode(97 + aIdx)}`,
              text: ans?.text || ans?.label || `Lựa chọn ${aIdx + 1}`,
              isCorrect: Boolean(ans?.correct ?? ans?.isCorrect ?? aIdx === 0),
              explanation:
                ans?.tipsAndFeedback?.chosenFeedback ||
                ans?.explanation ||
                (ans?.correct ? "Chính xác tuyệt vời!" : "Chưa chính xác."),
            }))
          : [];

        if (options.length > 0) {
          milestones.push({
            id: `m-imported-${idx + 1}`,
            seconds: Math.floor(fromSec),
            timeFormatted: formatSecondsToTime(fromSec),
            title: item?.label || `Cột mốc ${idx + 1} (${formatSecondsToTime(fromSec)})`,
            question: qText,
            options,
            points: actionParams?.behaviour?.points || 5,
            hint: actionParams?.hint || undefined,
          });
        }
      });
    }

    // Sort milestones ascending by time
    milestones.sort((a, b) => a.seconds - b.seconds);

    return {
      id: `lesson-${Date.now()}`,
      youtubeId,
      title,
      subject: defaultSubject,
      gradeLevel: "Chuẩn H5P Interactive Video",
      milestones,
    };
  } catch (err) {
    console.error("Failed to parse H5P format:", err);
    return null;
  }
}

/**
 * Triggers a client-side download of the H5P JSON content
 */
export function downloadH5PFile(lesson: VideoLesson) {
  const data = exportH5PFormat(lesson);
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${lesson.id || "interactive-lesson"}.h5p.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
