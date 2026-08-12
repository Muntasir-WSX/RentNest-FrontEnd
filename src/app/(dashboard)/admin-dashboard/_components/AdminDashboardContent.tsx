"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { toggleUserStatusAction } from "@/app/(dashboard)/_actions/adminActions";

type AdminDashboardContentProps = {
  data: {
    success?: boolean;
    message?: string;
    users?: any[];
    properties?: any[];
  };
};

function normalizeList(list: any[] | undefined) {
  if (!Array.isArray(list)) return [];
  return list;
}

export default function AdminDashboardContent({ data }: AdminDashboardContentProps) {
  const users = normalizeList(data?.users);
  const properties = normalizeList(data?.properties);
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleUserStatus = async (userId: string | number, currentIsBanned: boolean) => {
    const actionType = currentIsBanned ? "unban" : "ban";
    const result = await Swal.fire({
      title: actionType === "ban" ? "Ban this user?" : "Unban this user?",
      text: actionType === "ban" ? "This will suspend the user account." : "This will restore the user account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: actionType === "ban" ? "Yes, ban" : "Yes, unban",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setPendingId(String(userId));
    try {
      const formData = new FormData();
      formData.set("userId", String(userId));
      formData.set("actionType", actionType);
      await toggleUserStatusAction(formData);
      toast.success(actionType === "ban" ? "User banned successfully." : "User unbanned successfully.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update user status.");
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {data?.message || "Admin overview and user moderation are shown here."}
        </p>
      </div>

      {/* Grid layout দুই কলামে নামিয়ে আনা হলো কারণ rentals বাদ দেওয়া হয়েছে */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Users Section */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Users</h2>
          {users.length === 0 ? (
            <p className="text-sm text-muted-foreground">No users found.</p>
          ) : (
            <div className="space-y-3">
              {users.map((user: any, index: number) => {
                const userId = user.id || index;
                const isBanned = Boolean(user.isBanned ?? user.banned);
                const isPending = pendingId === String(userId);

                return (
                  <div key={userId} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{user.name || user.email || "User"}</p>
                        <p className="text-sm text-muted-foreground">{user.role || "USER"}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleUserStatus(userId, isBanned)}
                        disabled={isPending}
                        className={`rounded-lg border border-border px-3 py-1 text-sm transition-colors ${
                          isBanned 
                            ? "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20" 
                            : "hover:bg-muted"
                        }`}
                      >
                        {isPending ? "Working..." : isBanned ? "Banned (Unban)" : "Ban"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Properties Section */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Properties</h2>
          {properties.length === 0 ? (
            <p className="text-sm text-muted-foreground">No properties found.</p>
          ) : (
            <div className="space-y-3">
              {properties.map((item: any, index: number) => (
                <div key={item.id || index} className="rounded-lg border border-border p-3">
                  <p className="font-medium">{item.title || item.name || "Property"}</p>
                  <p className="text-sm text-muted-foreground">{item.location || item.city || "Location"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}