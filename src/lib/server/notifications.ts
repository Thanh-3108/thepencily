import "server-only";
import { backend, dbError } from "./backend";
export async function sendPendingClassNotifications(classId?: string) {
  const url = process.env.DISCORD_CLASS_WEBHOOK_URL;
  if (!url) return { sent: 0, pending: true };
  try { const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.hostname !== "discord.com" || !parsed.pathname.startsWith("/api/webhooks/")) return { sent: 0, pending: true };
  } catch { return { sent: 0, pending: true }; }
  const db = backend();
  let query = db.from("notification_outbox").select("id,class_id").eq("status", "pending").limit(20);
  if (classId) query = query.eq("class_id", classId);
  const pending = await query; dbError(pending.error); let sent = 0;
  for (const entry of pending.data || []) {
    const claimed = await db.from("notification_outbox").update({ status: "sending" }).eq("id", entry.id).eq("status", "pending").select("id").maybeSingle(); dbError(claimed.error);
    if (!claimed.data) continue;
    try {
      const result = await db.from("classes").select("title,tutor_name,scheduled_time,status").eq("id", entry.class_id).single(); dbError(result.error);
      if (!result.data) throw new Error("Class no longer exists");
      if (!["approved", "live"].includes(result.data.status)) { await db.from("notification_outbox").update({ status: "cancelled" }).eq("id", entry.id); continue; }
      const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.timeout(10000), body: JSON.stringify({ allowed_mentions: { parse: [] }, embeds: [{ title: result.data.title.slice(0, 255), description: `Tutor: ${result.data.tutor_name}\nLịch: ${result.data.scheduled_time}`, url: `${origin}/dashboard?tab=classes`, color: 0x0F2747 }] }) });
      if (!response.ok) throw new Error(`Discord ${response.status}`);
      const update = await db.from("notification_outbox").update({ status: "sent", sent_at: new Date().toISOString(), last_error: null }).eq("id", entry.id); dbError(update.error); sent++;
    } catch (error) {
      await db.from("notification_outbox").update({ status: "pending", last_error: error instanceof Error ? error.message : "Notification failed" }).eq("id", entry.id);
    }
  }
  return { sent, pending: sent < (pending.data?.length || 0) };
}
