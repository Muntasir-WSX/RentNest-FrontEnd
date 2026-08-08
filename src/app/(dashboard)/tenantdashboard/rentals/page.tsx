import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";
import { getTenantDashboardData } from "@/app/(dashboard)/_actions/tenantActions";
import PaymentFlowCard from "../_components/PaymentFlowCard";

export default async function TenantRentalsPage() {
  const user = await getMe();

  if (!user?.success || user.data?.role !== "TENANT") {
    redirect("/not-found");
  }

  const data = await getTenantDashboardData();
  const rentals = Array.isArray(data?.rentals) ? data.rentals : [];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">My Rentals</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your requested rentals and their current status.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        {rentals.length === 0 ? (
          <p className="text-sm text-muted-foreground">No rental requests found.</p>
        ) : (
          <div className="space-y-3">
            {rentals.map((item: any, index: number) => {
              const isApproved = item.status === "APPROVED" || item.requestStatus === "APPROVED";
              return (
                <div key={item.id || index} className="rounded-lg border border-border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.property?.title || item.propertyTitle || "Property"}</p>
                      <p className="text-sm text-muted-foreground">{item.status || item.requestStatus || "Pending"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-foreground">
                        {item.status || item.requestStatus || "Pending"}
                      </span>
                      {isApproved ? <PaymentFlowCard rental={item} /> : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
