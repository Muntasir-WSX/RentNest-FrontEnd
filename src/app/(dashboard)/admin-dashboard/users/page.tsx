import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";
import { getAdminDashboardData } from "@/app/(dashboard)/_actions/adminActions";
import AdminUsersClient from "./_components/AdminUsersClient";

export default async function AdminUsersPage() {
  const user = await getMe();

  if (!user?.success || user.data?.role !== "ADMIN") {
    redirect("/not-found");
  }

  const data = await getAdminDashboardData();
  const users = Array.isArray(data?.users) ? data.users : [];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Manage Users</h1>
        <p className="mt-2 text-sm text-muted-foreground">Ban or unban tenant and landlord accounts.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        {users.length === 0 ? (
          <p className="text-sm text-muted-foreground">No users found.</p>
        ) : (
          <AdminUsersClient users={users} />
        )}
      </div>
    </div>
  );
}
