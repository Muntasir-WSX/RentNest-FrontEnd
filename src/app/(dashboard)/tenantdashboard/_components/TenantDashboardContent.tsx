"use client";

import React, { useState } from "react";
import PaymentFlowCard from "./PaymentFlowCard";
import ReviewModal from "./ReviewModal";

type TenantDashboardContentProps = {
  data: {
    success?: boolean;
    message?: string;
    rentals?: any[];
    payments?: any[];
  };
};

function normalizeList(list: any[] | undefined) {
  if (!Array.isArray(list)) return [];
  return list;
}

const getStatusBadge = (status: string) => {
  const normalized = status?.toUpperCase() || "PENDING";
  switch (normalized) {
    case "PENDING":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "APPROVED":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "REJECTED":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "ACTIVE":
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    case "COMPLETED":
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

export default function TenantDashboardContent({ data }: TenantDashboardContentProps) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState<any>(null);

  const rentals = normalizeList(data?.rentals);
  const payments = normalizeList(data?.payments);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Tenant Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {data?.message || "Your rental requests and payments are shown here."}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* My Rental Requests */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">My Rental Requests</h2>
            <span className="text-sm text-muted-foreground">{rentals.length} item(s)</span>
          </div>

          {rentals.length === 0 ? (
            <p className="text-sm text-muted-foreground">No rental requests found yet.</p>
          ) : (
            <div className="space-y-3">
              {rentals.map((item: any, index: number) => {
                const status = item.status || item.requestStatus || "PENDING";
                const upperStatus = status.toUpperCase();      
                const canReview = upperStatus === "APPROVED" || upperStatus === "COMPLETED";
                const hasReviewed = Boolean(item.review);

                return (
                  <div key={item.id || index} className="rounded-lg border border-border p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">
                          {item.property?.title || item.propertyTitle || "Property"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Date: {item.startDate || item.createdAt || "N/A"}
                        </p>
                      </div>
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase ${getStatusBadge(status)}`}>
                        {status}
                      </span>
                    </div>

                    {upperStatus === "APPROVED" && (
                      <div className="pt-2 border-t border-border/50">
                        <PaymentFlowCard rental={item} />
                      </div>
                    )}

                    {canReview && (
                      <div className="flex justify-end pt-2 border-t border-border/50">
                        <button
                          disabled={hasReviewed}
                          onClick={() => {
                            setSelectedRental(item);
                            setIsReviewOpen(true);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            hasReviewed
                              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          }`}
                        >
                          {hasReviewed ? "Already Reviewed" : "Leave Review"}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Payment History */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Payment History</h2>
            <span className="text-sm text-muted-foreground">{payments.length} item(s)</span>
          </div>

          {payments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No payment history found yet.</p>
          ) : (
            <div className="space-y-3">
              {payments.map((item: any, index: number) => {
                const status = item.status || item.paymentStatus || "PENDING";

                return (
                  <div key={item.id || index} className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">
                          ${item.amount || item.totalAmount || "0"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.createdAt || item.date || "N/A"}
                        </p>
                      </div>
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase ${getStatusBadge(status)}`}>
                        {status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Review Modal Component */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        rental={selectedRental}
        onSuccess={() => {
          window.location.reload(); 
        }}
      />
    </div>
  );
}