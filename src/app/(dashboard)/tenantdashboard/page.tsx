import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";
import React from 'react';

const TenantDashboardPage = async () => {
    const user = await getMe();

   
    if (!user?.success || user.data?.role !== "TENANT") {
        redirect("/not-found");
    }

    return (
        <div>Tenant Dashboard Page</div>
    );
};

export default TenantDashboardPage;