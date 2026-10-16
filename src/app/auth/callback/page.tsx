"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
let exchange: { code: string; result: ReturnType<NonNullable<typeof supabase>["auth"]["exchangeCodeForSession"]> } | null = null;
export default function AuthCallback() {
  const [error, setError] = useState(""); const [recovery, setRecovery] = useState(false);
  const [password, setPassword] = useState(""); const [busy, setBusy] = useState(false);
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (!code || !supabase) { queueMicrotask(() => setError("Liên kết không hợp lệ hoặc Supabase chưa sẵn sàng.")); return; }
    if (exchange?.code !== code) exchange = { code, result: supabase.auth.exchangeCodeForSession(code) };
    let active = true;
    void exchange.result.then(({ error: result }) => {
      if (!active) return;
      if (result) setError(result.message);
      else if (new URL(window.location.href).searchParams.get("recovery") === "1") setRecovery(true);
      else window.location.replace("/onboarding");
    });
    return () => { active = false; };
  }, []);
  async function reset(event: React.FormEvent) {
    event.preventDefault(); if (!supabase) return; setBusy(true);
    const { error: result } = await supabase.auth.updateUser({ password });
    if (result) { setError(result.message); setBusy(false); } else window.location.replace("/dashboard");
  }
  return <main className="min-h-screen bg-[#FFF9EF] p-8 text-[#0F2747]"><div className="max-w-lg mx-auto space-y-5"><h1 className="text-2xl font-bold">{recovery ? "Đặt mật khẩu mới" : "Hoàn tất đăng nhập"}</h1>{error ? <p role="alert">{error}</p> : !recovery && <p>Đang xác thực phiên đăng nhập…</p>}{recovery && <form onSubmit={reset} className="space-y-4"><label className="block">Mật khẩu mới<input type="password" minLength={8} autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full border-2 border-slate-300 p-3"/></label><button disabled={busy} className="bg-[#0F2747] text-white p-3">Lưu mật khẩu</button></form>}<Link href="/signin" className="underline">Quay lại đăng nhập</Link></div></main>;
}
