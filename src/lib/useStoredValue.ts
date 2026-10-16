"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { Dispatch, SetStateAction } from "react";

const storageEvent = "pencily-storage-change";
const memoryFallback = new Map<string, string>();

function decode<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(fallback)) {
      return Array.isArray(parsed) && parsed.every((item) => typeof item === "string") ? parsed as T : fallback;
    }
    if (typeof fallback === "object" && fallback !== null) {
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fallback;
      const values = parsed as Record<string, unknown>;
      return Object.fromEntries(Object.entries(fallback).map(([key, value]) => [
        key, typeof values[key] === typeof value ? values[key] : value,
      ])) as T;
    }
    return typeof parsed === typeof fallback ? parsed as T : fallback;
  } catch {
    return fallback;
  }
}

// Storage is an external store. A server snapshot avoids hydration mismatches,
// while storage/custom events keep separate widgets and tabs in sync.
export function useStoredValue<T>(key: string, fallback: T): [T, Dispatch<SetStateAction<T>>] {
  const subscribe = useCallback((notify: () => void) => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === key || event.key === null) {
        memoryFallback.delete(key);
        notify();
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(storageEvent, notify);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(storageEvent, notify);
    };
  }, [key]);
  const getSnapshot = useCallback(() => {
    if (memoryFallback.has(key)) return memoryFallback.get(key)!;
    try { return localStorage.getItem(key); } catch { return null; }
  }, [key]);
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const value = useMemo(() => decode(raw, fallback), [raw, fallback]);
  const setValue: Dispatch<SetStateAction<T>> = useCallback((next) => {
    const previous = decode(getSnapshot(), fallback);
    const resolved = typeof next === "function" ? (next as (value: T) => T)(previous) : next;
    const serialized = JSON.stringify(resolved);
    try {
      localStorage.setItem(key, serialized);
      memoryFallback.delete(key);
    } catch {
      memoryFallback.set(key, serialized);
    }
    window.dispatchEvent(new Event(storageEvent));
  }, [key, getSnapshot, fallback]);
  return [value, setValue];
}
