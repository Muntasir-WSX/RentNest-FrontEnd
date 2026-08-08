import { getMe } from '@/service/getMe';
import { redirect } from 'next/navigation';
import React from 'react';
import { headers } from 'next/headers';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getMe();

   
    if (!user || !user.success || !user.data) {
        redirect('/login');
    }

    const userRole = user.data.role;

  
    const headersList = await headers();
    const referer = headersList.get('referer') || '';
    const currentUrl = headersList.get('x-invoke-path') || headersList.get('x-url') || '';
    
   

    return (
        <div className="min-h-screen bg-background">
            {children}
        </div>
    );
}