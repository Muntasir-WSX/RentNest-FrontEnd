import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";
import { getLandlordDashboardData } from "@/app/(dashboard)/_actions/landlordActions";

export default async function MyPropertiesRequestPage() {
  const user = await getMe();

  if (!user?.success || user.data?.role !== "LANDLORD") {
    redirect("/not-found");
  }

  console.log("User Data:", user);

  const data = await getLandlordDashboardData();

  const requests = Array.isArray(data?.requests) ? data.requests : [];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Property Requests</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage incoming booking or rental requests from tenants.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        {requests.length === 0 ? (
          <p className="text-sm text-muted-foreground">No pending requests found.</p>
        ) : (
          <div className="space-y-3">
            {requests.map((item: any, index: number) => (
              <div 
                key={item.id || index} 
                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border p-4"
              >
                <div>
                  <p className="font-medium">{item.property?.title || item.title || "Rental Request"}</p>
                  <p className="text-sm text-muted-foreground">
                    Tenant: {item.tenant?.name || item.user?.name || "Unknown"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Status: <span className="font-semibold text-primary">{item.status || "Pending"}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    ${item.totalPrice || item.price || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}