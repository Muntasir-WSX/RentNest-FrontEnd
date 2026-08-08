import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";
import React from 'react';
import { getTenantDashboardData } from "../_actions/tenantActions";
import TenantDashboardContent from "./_components/TenantDashboardContent";

const TenantDashboardPage = async () => {
    const user = await getMe();

    if (!user?.success || user.data?.role !== "TENANT") {
        redirect("/not-found");
    }

    const data = await getTenantDashboardData();

    return <TenantDashboardContent data={data} />;
};

export default TenantDashboardPage;