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

export async function createPaymentAction(formData: FormData) {
  const rentalId = formData.get("rentalId")?.toString() || "";
  const amount = formData.get("amount")?.toString() || "0";

  const headers = await getAuthHeaders();
  const payload = {
    rentalId,
    amount: Number(amount) || 0,
  };

  const res = await fetch(`${API_BASE}/api/payments/create`, {
    method: "POST",
    headers,
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let parsed: any = {};

  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = { message: text };
  }

  return {
    ok: res.ok,
    status: res.status,
    data: parsed,
  };
}
