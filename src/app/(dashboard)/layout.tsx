import { getMe } from '@/service/getMe';
import { redirect } from 'next/navigation';
import React from 'react';
import DashboardSidebar from './_components/dashboard';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getMe();

    if (!user || !user.success || !user.data) {
        redirect('/login');
    }

    return (
        <div className="h-screen w-screen overflow-hidden text-foreground flex flex-col md:flex-row fixed inset-0 bg-background z-50">
            {/* Sidebar (Handles Desktop Sidebar and Mobile Drawer cleanly) */}
            <DashboardSidebar user={user} />

            {/* Main Content Area (Scrollable) */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-8">
                {children}
            </main>
        </div>
    );
}