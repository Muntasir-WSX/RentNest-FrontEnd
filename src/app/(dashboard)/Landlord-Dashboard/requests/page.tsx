import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";
import { getLandlordDashboardData } from "@/app/(dashboard)/_actions/landlordActions";
import LandlordRequestsClient from "./_components/LandlordRequestsClient";

export default async function LandlordRequestsPage() {
  const user = await getMe();

  if (!user?.success || user.data?.role !== "LANDLORD") {
    redirect("/not-found");
  }

  const data = await getLandlordDashboardData();
  const requests = Array.isArray(data?.requests) ? data.requests : [];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Rental Requests</h1>
        <p className="mt-2 text-sm text-muted-foreground">Review incoming requests and approve or reject them.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        {requests.length === 0 ? (
          <p className="text-sm text-muted-foreground">No rental requests found.</p>
        ) : (
          <LandlordRequestsClient requests={requests} />
        )}
      </div>
    </div>
  );
}
