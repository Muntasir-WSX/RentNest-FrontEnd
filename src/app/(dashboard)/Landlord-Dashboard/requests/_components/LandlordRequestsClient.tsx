"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { updateRentalRequestAction } from "@/app/(dashboard)/_actions/landlordActions";

export default function LandlordRequestsClient({ requests: initialRequests }: { requests: any[] }) {
  const router = useRouter();
  const [requests, setRequests] = useState(initialRequests);

  const handleAction = async (requestId: string | number, actionType: "approve" | "reject") => {
    const result = await Swal.fire({
      title: actionType === "approve" ? "Approve rental request?" : "Reject rental request?",
      text: actionType === "approve" ? "Proceed to approve this request." : "Proceed to reject this request.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: actionType === "approve" ? "Yes, approve" : "Yes, reject",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const formData = new FormData();
      formData.set("requestId", String(requestId));
      formData.set("actionType", actionType);
      await updateRentalRequestAction(formData);
      setRequests((prev) =>
        prev.map((item) =>
          (item.id === requestId || item.requestId === requestId)
            ? { ...item, status: actionType === "approve" ? "APPROVED" : "REJECTED" }
            : item
        )
      );

      toast.success(actionType === "approve" ? "Rental request approved." : "Rental request rejected.");
      router.refresh();
    } catch {
      toast.error("Failed to update the rental request.");
    }
  };

  return (
    <div className="space-y-3">
      {requests.map((item: any, index: number) => {
        const currentStatus = (item.status || item.requestStatus || "").toUpperCase();
        const isProcessed = currentStatus === "APPROVED" || currentStatus === "REJECTED";

        return (
          <div key={item.id || index} className="rounded-lg border border-border p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium">{item.tenant?.name || item.tenantName || "Tenant"}</p>
                <p className="text-sm text-muted-foreground">
                  Status: <span className="font-semibold">{currentStatus || "Pending"}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={isProcessed}
                  onClick={() => handleAction(item.id || item.requestId || index, "approve")}
                  className={`rounded-lg border border-border px-3 py-1.5 text-sm ${
                    isProcessed ? "opacity-50 cursor-not-allowed bg-muted" : "hover:bg-primary/10"
                  }`}
                >
                  Approve
                </button>
                <button
                  type="button"
                  disabled={isProcessed}
                  onClick={() => handleAction(item.id || item.requestId || index, "reject")}
                  className={`rounded-lg border border-border px-3 py-1.5 text-sm ${
                    isProcessed ? "opacity-50 cursor-not-allowed bg-muted" : "hover:bg-destructive/10"
                  }`}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}