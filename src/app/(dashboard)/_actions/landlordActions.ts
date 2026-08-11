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

export async function getLandlordDashboardData() {
  const propertiesResult = await tryFetch([
    "/api/landlord/properties"
  ]);
  

  const requestsResult = await tryFetch([
    "/api/landlord/requests"
  ]);

  const properties =
    propertiesResult.data?.data || propertiesResult.data?.properties || propertiesResult.data || [];
  const requests =
    requestsResult.data?.data || requestsResult.data?.requests || requestsResult.data || [];

  return {
    success: propertiesResult.ok || requestsResult.ok,
    message:
      propertiesResult.data?.message || requestsResult.data?.message || "Dashboard data loaded.",
    properties,
    requests,
  };
}

export async function createPropertyAction(formData: FormData) {
  const title = formData.get("title")?.toString() || "";
  const location = formData.get("location")?.toString() || "";
  const price = formData.get("price")?.toString() || "0";
  const description = formData.get("description")?.toString() || "";

  await tryFetch(
    [
      "/api/landlord/properties",
      "/api/properties",
      "/api/landlord/properties/create",
    ],
    {
      method: "POST",
      body: JSON.stringify({ title, location, price, description }),
    }
  );

  revalidatePath("/Landlord-Dashboard");
}

export async function updateRentalRequestAction(formData: FormData) {
  const requestId = formData.get("requestId")?.toString();
  const actionType = formData.get("actionType")?.toString() || "approve";
  const status = actionType === "approve" ? "APPROVED" : "REJECTED";

  await tryFetch(
    [
      `/api/landlord/requests/${requestId}`
    ],
    {
      method: "PATCH",
      body: JSON.stringify({
        status,
        requestStatus: status,
        actionType,
        decision: actionType,
      }),
    }
  );

  revalidatePath("/Landlord-Dashboard");
}
