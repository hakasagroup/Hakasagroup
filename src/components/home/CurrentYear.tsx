"use client";

import { useSyncExternalStore } from "react";

/**
 * Tahun copyright yang client-side-only.
 *
 * Catatan: Di Next.js 16 (Static Prerendering default), `new Date()` TIDAK
 * boleh dipanggil saat server render. React 19 + React Compiler juga melarang
 * `setState` sinkron di dalam `useEffect` (aturan `react-hooks/set-state-in-effect`).
 *
 * Solusi idiomatic: `useSyncExternalStore` untuk membaca "external state"
 * (tahun saat ini) dengan snapshot server yang stabil + subscription client.
 * - Server: return `INITIAL_YEAR` (literal, tidak ada `new Date()`)
 * - Client: subscribe ke `getCurrentYear` yang dipanggil saat hydration
 *
 * Saat tahun berganti, cukup update literal `INITIAL_YEAR` di bawah.
 */
const INITIAL_YEAR = 2026;

function getCurrentYear(): number {
  return new Date().getFullYear();
}

function getServerSnapshot(): number {
  // Snapshot server SELALU literal — tidak pernah memanggil `new Date()`.
  // Ini yang membuat static prerendering aman di Next.js 16.
  return INITIAL_YEAR;
}

export default function CurrentYear() {
  const year = useSyncExternalStore(
    // subscribe: di client, paksa re-render saat subscription berubah.
    // Untuk kasus ini, kita subscribe sekali di mount (tidak ada perubahan).
    () => () => {},
    // getSnapshot: di client, baca tahun saat ini.
    getCurrentYear,
    // getServerSnapshot: di server, return literal agar deterministic.
    getServerSnapshot,
  );

  return <>{year}</>;
}


