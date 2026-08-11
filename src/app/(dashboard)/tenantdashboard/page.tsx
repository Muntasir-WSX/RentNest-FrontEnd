import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";
import React from 'react';
import { getTenantDashboardData } from "../_actions/tenantActions";
import TenantDashboardContent from "./_components/TenantDashboardContent";

export default async function TenantDashboardPage() {
  const data = await getTenantDashboardData();

 
  if (!data.success && data.message?.includes("token")) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <TenantDashboardContent data={data} />
    </div>
  );
}
