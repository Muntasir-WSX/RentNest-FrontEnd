"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { toggleUserStatusAction } from "@/app/(dashboard)/_actions/adminActions";

export default function AdminUsersClient({ users }: { users: any[] }) {
  const router = useRouter();

  const handleStatus = async (userId: string | number, actionType: "ban" | "unban") => {
    const result = await Swal.fire({
      title: actionType === "ban" ? "Ban this user?" : "Unban this user?",
      text: actionType === "ban" ? "This will suspend the account." : "This will restore the account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: actionType === "ban" ? "Yes, ban" : "Yes, unban",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const formData = new FormData();
      formData.set("userId", String(userId));
      formData.set("actionType", actionType);
      await toggleUserStatusAction(formData);
      toast.success(actionType === "ban" ? "User banned successfully." : "User unbanned successfully.");
      router.refresh();
    } catch {
      toast.error("Failed to update user status.");
    }
  };

  return (
    <div className="space-y-3">
      {users.map((user: any, index: number) => (
        <div key={user.id || index} className="rounded-lg border border-border p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium">{user.name || user.email || "User"}</p>
              <p className="text-sm text-muted-foreground">{user.role || "USER"}</p>
            </div>
            <button
              type="button"
              onClick={() => handleStatus(user.id || index, user.banned ? "unban" : "ban")}
              className="rounded-lg border border-border px-3 py-1.5 text-sm"
            >
              {user.banned ? "Unban" : "Ban"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
