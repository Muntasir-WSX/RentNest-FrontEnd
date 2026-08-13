"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [statusMessage, setStatusMessage] = useState("Processing your payment...");

  useEffect(() => {
    if (!sessionId) return;
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token") || "";
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000";
    fetch(`${backendUrl}/api/payments/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ 
        transactionId: sessionId,
        session_id: sessionId 
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && (data.success || res.status === 200)) {
          setStatusMessage("Your payment was completed successfully. Your rental request is now active.");
          router.refresh();
        } else {
          setStatusMessage(data.message || data.error || "Payment confirmation failed.");
        }
      })
      .catch((err) => {
        console.error("Confirmation error:", err);
        setStatusMessage("Network error while confirming payment.");
      });
  }, [sessionId, router]);

  return (
    <div className="min-h-screen bg-background px-4 py-16 text-foreground">
      <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold">Payment Successful</h1>
        <p className="mt-3 text-sm text-muted-foreground">{statusMessage}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/tenantdashboard"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading payment details...</div>}>
      <SuccessContent />
    </Suspense>
  );
}