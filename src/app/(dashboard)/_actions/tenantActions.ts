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
    "/api/rentals/my-rentals", 
    "/api/rentals",
    "/api/tenant/rentals",
    "/api/me/rentals",
  ]);

  const paymentsResult = await tryFetch([
    "/api/payments/my-payments", 
    "/api/payments",
    "/api/tenant/payments",
    "/api/payments/me",
  ]);

  
  const extractData = (result: any) => {
    const raw = result.data;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw.data)) return raw.data;
    if (Array.isArray(raw.rentals)) return raw.rentals;
    if (Array.isArray(raw.payments)) return raw.payments;
  
    if (typeof raw === "object" && raw !== null && (raw.id || raw._id)) return [raw];
    return [];
  };

  const rentals = extractData(rentalsResult);
  const payments = extractData(paymentsResult);

  return {
    success: rentalsResult.ok || paymentsResult.ok,
    message:
      rentalsResult.data?.message || paymentsResult.data?.message || "Dashboard data loaded.",
    rentals,
    payments,
  };
}