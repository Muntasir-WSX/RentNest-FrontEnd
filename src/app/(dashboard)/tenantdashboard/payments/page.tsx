import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";
import { getTenantDashboardData } from "@/app/(dashboard)/_actions/tenantActions";

export default async function TenantPaymentsPage() {
  const user = await getMe();

  if (!user?.success || user.data?.role !== "TENANT") {
    redirect("/not-found");
  }

  const data = await getTenantDashboardData();
  const payments = Array.isArray(data?.payments) ? data.payments : [];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Payments</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Approved rentals can be paid here through the checkout flow.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        {payments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No payment records found yet.</p>
        ) : (
          <div className="space-y-3">
            {payments.map((item: any, index: number) => (
              <div key={item.id || index} className="rounded-lg border border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.amount || item.totalAmount || "Payment"}</p>
                    <p className="text-sm text-muted-foreground">{item.status || item.paymentStatus || "Pending"}</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="/payment/success"
                      className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                    >
                      Pay Now
                    </a>
                    <a
                      href="/payment/cancel"
                      className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium"
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}