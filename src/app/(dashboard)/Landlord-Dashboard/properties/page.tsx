import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";
import { getLandlordDashboardData } from "@/app/(dashboard)/_actions/landlordActions";

export default async function LandlordPropertiesPage() {
  const user = await getMe();

  if (!user?.success || user.data?.role !== "LANDLORD") {
    redirect("/not-found");
  }

  const data = await getLandlordDashboardData();
  const properties = Array.isArray(data?.properties) ? data.properties : [];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">My Properties</h1>
        <p className="mt-2 text-sm text-muted-foreground">Create and review your listed properties here.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        {properties.length === 0 ? (
          <p className="text-sm text-muted-foreground">No properties found.</p>
        ) : (
          <div className="space-y-3">
            {properties.map((item: any, index: number) => (
              <div key={item.id || index} className="rounded-lg border border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.title || item.name || "Property"}</p>
                    <p className="text-sm text-muted-foreground">{item.location || item.city || "Location"}</p>
                  </div>
                  <span className="text-sm font-medium">${item.price || item.rent || 0}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
