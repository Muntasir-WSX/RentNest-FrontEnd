"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { updateRentalRequestAction } from "@/app/(dashboard)/_actions/landlordActions";

export default function LandlordRequestsClient({ requests }: { requests: any[] }) {
  const router = useRouter();

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
      toast.success(actionType === "approve" ? "Rental request approved." : "Rental request rejected.");
      router.refresh();
    } catch {
      toast.error("Failed to update the rental request.");
    }
  };

  return (
    <div className="space-y-3">
      {requests.map((item: any, index: number) => (
        <div key={item.id || index} className="rounded-lg border border-border p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium">{item.tenant?.name || item.tenantName || "Tenant"}</p>
              <p className="text-sm text-muted-foreground">{item.status || item.requestStatus || "Pending"}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleAction(item.id || item.requestId || index, "approve")}
                className="rounded-lg border border-border px-3 py-1.5 text-sm"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => handleAction(item.id || item.requestId || index, "reject")}
                className="rounded-lg border border-border px-3 py-1.5 text-sm"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
