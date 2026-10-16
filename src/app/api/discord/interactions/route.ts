import { createPublicKey, verify } from "node:crypto";
import { after } from "next/server";
import { askPencily } from "@/lib/server/ai";
import { rateLimit } from "@/lib/server/backend";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const signature = request.headers.get("x-signature-ed25519") || "";
  const timestamp = request.headers.get("x-signature-timestamp") || "";
  const key = process.env.DISCORD_PUBLIC_KEY;
  if (!key || !/^[0-9a-f]{64}$/i.test(key) || !/^[0-9a-f]{128}$/i.test(signature) || !/^\d+$/.test(timestamp) || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return new Response("Invalid signature", { status: 401 });
  const raw = await request.text(); if (Buffer.byteLength(raw) > 32000) return new Response("Too large", { status: 413 });
  const publicKey = createPublicKey({ key: Buffer.from(`302a300506032b6570032100${key}`, "hex"), format: "der", type: "spki" });
  if (!verify(null, Buffer.from(timestamp + raw), publicKey, Buffer.from(signature, "hex"))) return new Response("Invalid signature", { status: 401 });
  const event = JSON.parse(raw) as { type: number; application_id: string; guild_id?: string; token: string; member?: { user?: { id: string } }; user?: { id: string }; data?: { name: string; options?: { name: string; value: unknown }[] } };
  if (event.type === 1) return Response.json({ type: 1 });
  if (!process.env.DISCORD_GUILD_ID || event.guild_id !== process.env.DISCORD_GUILD_ID || event.application_id !== process.env.DISCORD_APPLICATION_ID) return Response.json({ type: 4, data: { content: "Lệnh chỉ hoạt động trong máy chủ The Pencily đã cấu hình.", flags: 64 } });
  const question = event.data?.options?.find((option) => option.name === "question")?.value;
  if (event.type !== 2 || event.data?.name !== "ask" || typeof question !== "string" || !question.trim() || question.length > 2000) return Response.json({ type: 4, data: { content: "Dùng /ask question:<câu hỏi tối đa 2000 ký tự>.", flags: 64 } });
  after(async () => {
    let answer: string;
    try { const user = event.member?.user?.id || event.user?.id; if (!user) throw new Error("Không xác định được người hỏi."); await rateLimit(`discord-ai:${user}`, 10); answer = await askPencily(question); }
    catch (error) { answer = error instanceof Error ? error.message : "AI tạm thời chưa hoạt động."; }
    await fetch(`https://discord.com/api/v10/webhooks/${event.application_id}/${event.token}/messages/@original`, { method: "PATCH", headers: { "Content-Type": "application/json" }, signal: AbortSignal.timeout(10000), body: JSON.stringify({ content: answer.slice(0, 1950), allowed_mentions: { parse: [] } }) });
  });
  return Response.json({ type: 5, data: { flags: 64 } });
}
