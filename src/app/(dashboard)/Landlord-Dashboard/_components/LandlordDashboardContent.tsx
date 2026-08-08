"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { createPropertyAction, updateRentalRequestAction } from "@/app/(dashboard)/_actions/landlordActions";

type LandlordDashboardContentProps = {
  data: {
    success?: boolean;
    message?: string;
    properties?: any[];
    requests?: any[];
  };
};

function normalizeList(list: any[] | undefined) {
  if (!Array.isArray(list)) return [];
  return list;
}

export default function LandlordDashboardContent({ data }: LandlordDashboardContentProps) {
  const properties = normalizeList(data?.properties);
  const requests = normalizeList(data?.requests);
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleRequestAction = async (requestId: string | number, actionType: "approve" | "reject") => {
    const result = await Swal.fire({
      title: actionType === "approve" ? "Approve request?" : "Reject request?",
      text: actionType === "approve" ? "This will approve the rental request." : "This will reject the rental request.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: actionType === "approve" ? "Yes, approve" : "Yes, reject",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setPendingId(String(requestId));
    try {
      const formData = new FormData();
      formData.set("requestId", String(requestId));
      formData.set("actionType", actionType);
      await updateRentalRequestAction(formData);
      toast.success(actionType === "approve" ? "Rental request approved." : "Rental request rejected.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update the rental request.");
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Landlord Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {data?.message || "Manage your properties and rental requests here."}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Create Property</h2>
        <form action={createPropertyAction} className="grid gap-4 md:grid-cols-2">
          <input name="title" placeholder="Title" className="rounded-lg border border-border bg-background px-3 py-2" required />
          <input name="location" placeholder="Location" className="rounded-lg border border-border bg-background px-3 py-2" required />
          <input name="price" type="number" placeholder="Price" className="rounded-lg border border-border bg-background px-3 py-2" required />
          <input name="category" placeholder="Category" className="rounded-lg border border-border bg-background px-3 py-2" />
          <textarea name="description" placeholder="Description" className="md:col-span-2 rounded-lg border border-border bg-background px-3 py-2" rows={3} required />
          <div className="md:col-span-2">
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Create Property
            </button>
          </div>
        </form>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">My Properties</h2>
          {properties.length === 0 ? (
            <p className="text-sm text-muted-foreground">No properties found.</p>
          ) : (
            <div className="space-y-3">
              {properties.map((item: any, index: number) => (
                <div key={item.id || index} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.title || item.name || "Property"}</p>
                      <p className="text-sm text-muted-foreground">{item.location || item.city || "Location"}</p>
                    </div>
                    <span className="text-sm font-medium">${item.price || item.rent || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Incoming Requests</h2>
          {requests.length === 0 ? (
            <p className="text-sm text-muted-foreground">No incoming requests.</p>
          ) : (
            <div className="space-y-3">
              {requests.map((item: any, index: number) => (
                <div key={item.id || index} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.tenant?.name || item.tenantName || "Tenant"}</p>
                      <p className="text-sm text-muted-foreground">{item.status || item.requestStatus || "Pending"}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleRequestAction(item.id || item.requestId || index, "approve")}
                        disabled={pendingId === String(item.id || item.requestId || index)}
                        className="rounded-lg border border-border px-3 py-1 text-sm"
                      >
                        {pendingId === String(item.id || item.requestId || index) ? "Working..." : "Approve"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRequestAction(item.id || item.requestId || index, "reject")}
                        disabled={pendingId === String(item.id || item.requestId || index)}
                        className="rounded-lg border border-border px-3 py-1 text-sm"
                      >
                        {pendingId === String(item.id || item.requestId || index) ? "Working..." : "Reject"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
