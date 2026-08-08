import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";
import React from 'react';


const AdminDashboardPage = async () => {
    const user = await getMe();
    
    if (!user?.success || user.data?.role !== "ADMIN") {
        redirect("/not-found");
    }

    return (
        <div>Admin Dashboard Page</div>
    );
};

export default AdminDashboardPage;