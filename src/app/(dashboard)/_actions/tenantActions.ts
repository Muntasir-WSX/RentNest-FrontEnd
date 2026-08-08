"use server";

import { cookies } from "next/headers";

const API_BASE = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.APP_URL || "http://localhost:5000";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return headers;
}

async function tryFetch(paths: string[], init?: RequestInit) {
  if (!API_BASE) {
    return {
      ok: false,
      status: 500,
      data: { success: false, message: "Backend URL is not configured." },
    };
  }

  const headers = await getAuthHeaders();

  for (const path of paths) {
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers,
        cache: "no-store",
        credentials: "include",
      });

      const text = await res.text();
      let parsed: any = {};

      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = { message: text };
      }

      if (res.ok) {
        return { ok: true, status: res.status, data: parsed };
      }

      if (res.status !== 404) {
        return { ok: false, status: res.status, data: parsed };
      }
    } catch {
      // try next endpoint
    }
  }

  return {
    ok: false,
    status: 404,
    data: { success: false, message: "No compatible endpoint was found." },
  };
}

export async function getTenantDashboardData() {
  const rentalsResult = await tryFetch([
    "/api/rentals",
    "/api/tenant/rentals",
    "/api/me/rentals",
    "/api/rentals/my",
  ]);

  const paymentsResult = await tryFetch([
    "/api/payments",
    "/api/tenant/payments",
    "/api/payments/me",
  ]);

  const rentals =
    rentalsResult.data?.data || rentalsResult.data?.rentals || rentalsResult.data || [];
  const payments =
    paymentsResult.data?.data || paymentsResult.data?.payments || paymentsResult.data || [];

  return {
    success: rentalsResult.ok || paymentsResult.ok,
    message:
      rentalsResult.data?.message || paymentsResult.data?.message || "Dashboard data loaded.",
    rentals,
    payments,
  };
}
