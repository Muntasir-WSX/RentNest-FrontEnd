import React from "react";

type TenantDashboardContentProps = {
  data: {
    success?: boolean;
    message?: string;
    rentals?: any[];
    payments?: any[];
  };
};

function normalizeList(list: any[] | undefined) {
  if (!Array.isArray(list)) return [];
  return list;
}

export default function TenantDashboardContent({ data }: TenantDashboardContentProps) {
  const rentals = normalizeList(data?.rentals);
  const payments = normalizeList(data?.payments);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Tenant Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {data?.message || "Your rental requests and payments are shown here."}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">My Rental Requests</h2>
            <span className="text-sm text-muted-foreground">{rentals.length} item(s)</span>
          </div>

          {rentals.length === 0 ? (
            <p className="text-sm text-muted-foreground">No rental requests found yet.</p>
          ) : (
            <div className="space-y-3">
              {rentals.map((item: any, index: number) => (
                <div key={item.id || index} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.property?.title || item.propertyTitle || "Property"}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.status || item.requestStatus || "Pending"}
                      </p>
                    </div>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-foreground">
                      {item.startDate || item.createdAt || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Payment History</h2>
            <span className="text-sm text-muted-foreground">{payments.length} item(s)</span>
          </div>

          {payments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No payment history found yet.</p>
          ) : (
            <div className="space-y-3">
              {payments.map((item: any, index: number) => (
                <div key={item.id || index} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.amount || item.totalAmount || "Amount"}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.status || item.paymentStatus || "Pending"}
                      </p>
                    </div>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-foreground">
                      {item.createdAt || item.date || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
