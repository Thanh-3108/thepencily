"use client";
import { supabase } from "./supabaseClient";
export class ApiError extends Error { constructor(message:string,public status:number){super(message);} }
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const session = supabase ? (await supabase.auth.getSession()).data.session : null;
  const headers = new Headers(init.headers);
  if (session) headers.set("Authorization", `Bearer ${session.access_token}`);
  if (init.body) headers.set("Content-Type", "application/json");
  const response = await fetch(path, { ...init, headers, cache: "no-store" });
  const value = await response.json();
  if (!response.ok) throw new ApiError(value.error || "Không thể kết nối backend.", response.status);
  return value as T;
}
