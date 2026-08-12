"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

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

export async function getAdminDashboardData() {
  const usersResult = await tryFetch(["/api/admin/users", "/api/users"]);
  const propertiesResult = await tryFetch(["/api/admin/properties", "/api/properties"]);

  const users = usersResult.data?.data || usersResult.data?.users || usersResult.data || [];
  const properties = propertiesResult.data?.data || propertiesResult.data?.properties || propertiesResult.data || [];

  return {
    success: usersResult.ok || propertiesResult.ok,
    message: usersResult.data?.message || propertiesResult.data?.message || "Dashboard data loaded.",
    users,
    properties,
  };
}

export async function toggleUserStatusAction(formData: FormData) {
  const userId = formData.get("userId")?.toString();
  const actionType = formData.get("actionType")?.toString() || "ban";
  const isBanned = actionType === "ban";

  await tryFetch(
    [
      `/api/admin/users/${userId}`,
      `/api/admin/users/${userId}/status`,
    ],
    {
      method: "PATCH",
      body: JSON.stringify({
        isBanned,
      }),
    }
  );

  revalidatePath("/admin-dashboard");
}