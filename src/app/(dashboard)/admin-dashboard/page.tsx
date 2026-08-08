import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";
import React from 'react';
import { getAdminDashboardData } from "../_actions/adminActions";
import AdminDashboardContent from "./_components/AdminDashboardContent";

const AdminDashboardPage = async () => {
    const user = await getMe();

    if (!user?.success || user.data?.role !== "ADMIN") {
        redirect("/not-found");
    }

    const data = await getAdminDashboardData();

    return <AdminDashboardContent data={data} />;
};

export default AdminDashboardPage;