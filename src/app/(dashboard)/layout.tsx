import { getMe } from '@/service/getMe';
import { redirect } from 'next/navigation';
import React from 'react';
import DashboardSidebar from './_components/dashboard';
import MotionReveal from '@/components/ui/MotionReveal';

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
        <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col overflow-hidden bg-[#f3f0e9] text-[#122721] md:flex-row">
            {/* Sidebar (Handles Desktop Sidebar and Mobile Drawer cleanly) */}
            <DashboardSidebar user={user} />

            {/* Main Content Area (Scrollable) */}
            <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(215,173,104,.12),transparent_30%),#f3f0e9] p-4 sm:p-8">
                <MotionReveal>{children}</MotionReveal>
            </main>
        </div>
    );
}
