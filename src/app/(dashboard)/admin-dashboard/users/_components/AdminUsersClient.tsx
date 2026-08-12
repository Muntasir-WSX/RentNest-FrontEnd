"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { toggleUserStatusAction } from "@/app/(dashboard)/_actions/adminActions";

export default function AdminUsersClient({ users }: { users: any[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleStatus = async (userId: string | number, actionType: "ban" | "unban") => {
    const isBanAction = actionType === "ban";
    
    const result = await Swal.fire({
      title: isBanAction ? "Ban this user?" : "Unban this user?",
      text: isBanAction ? "This will suspend the account." : "This will restore the account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: isBanAction ? "Yes, ban" : "Yes, unban",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setPendingId(String(userId));
    try {
      const formData = new FormData();
      formData.set("userId", String(userId));
      formData.set("actionType", actionType);
      
      await toggleUserStatusAction(formData);
      
      toast.success(isBanAction ? "User banned successfully." : "User unbanned successfully.");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update user status.");
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className="space-y-3">
      {users.map((user: any, index: number) => {
        const userId = user.id || index;
        const isBanned = Boolean(user.isBanned ?? user.banned);
        const isPending = pendingId === String(userId);

        return (
          <div key={userId} className="rounded-lg border border-border p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium">{user.name || user.email || "User"}</p>
                <p className="text-sm text-muted-foreground">{user.role || "USER"}</p>
                <p className="text-xs mt-1">
                  Status: <span className={isBanned ? "text-destructive font-semibold" : "text-green-600 font-semibold"}>
                    {isBanned ? "Banned" : "Active"}
                  </span>
                </p>
              </div>

              {/* পাশে দুটি বাটন: Ban এবং Unban */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStatus(userId, "ban")}
                  disabled={isBanned || isPending}
                  className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                    isBanned 
                      ? "bg-muted text-muted-foreground border-border opacity-50 cursor-not-allowed" 
                      : "bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
                  }`}
                >
                  {isPending && isBanned ? "Processing..." : "Ban"}
                </button>

                <button
                  type="button"
                  onClick={() => handleStatus(userId, "unban")}
                  disabled={!isBanned || isPending}
                  className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                    !isBanned 
                      ? "bg-muted text-muted-foreground border-border opacity-50 cursor-not-allowed" 
                      : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                  }`}
                >
                  {isPending && !isBanned ? "Processing..." : "Unban"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}