"use client";

import { logout } from "@/service/logout";
import { IUser } from "@/lib/type";
import { cn } from "@/lib/utils";
import {
    Building,
    FileText,
    Home,
    LayoutDashboard,
    LogOut,
    Users,
    Menu,
    X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const getNavLinks = (role: string) => {
    switch (role) {
        case "ADMIN":
            return [
                { name: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
                { name: "Properties", href: "/admin-dashboard/properties", icon: Building },
                { name: "Users", href: "/admin-dashboard/users", icon: Users },
            ];
        case "LANDLORD":
            return [
                { name: "Dashboard", href: "/Landlord-Dashboard", icon: LayoutDashboard },
                { name: "My Properties", href: "/Landlord-Dashboard/properties", icon: Building },
                { name: "Requests", href: "/Landlord-Dashboard/requests", icon: FileText },
            ];
        case "TENANT":
            return [
                { name: "Dashboard", href: "/tenantdashboard", icon: LayoutDashboard },
                { name: "Rentals", href: "/tenantdashboard/rentals", icon: Building },
            ];
        default:
            return [];
    }
};

function SidebarInner({
    user,
    onClose,
}: {
    user: IUser;
    onClose?: () => void;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const userRole = user.data.role;
    const navLinks = getNavLinks(userRole);

    const handleLogout = async () => {
        await logout();
        toast.success("Logged out successfully!");
        router.push("/login");
    };

    return (
        <div className="flex flex-col h-full bg-card p-6 space-y-6">
            {/* Logo and Role Badge */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col items-start gap-2 px-2">
                    <Link href="/" onClick={onClose} className="shrink-0 flex items-center py-1">
                        <Image
                            src="/assets/logo.png"
                            alt="RentNest Logo"
                            width={120}
                            height={40}
                            style={{ width: 'auto', height: 'auto' }}
                            className="object-contain h-8 w-auto"
                            priority
                        />
                    </Link>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">
                        {userRole}
                    </span>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="md:hidden p-1 rounded-md hover:bg-muted transition-colors cursor-pointer self-start"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Nav Links */}
            <nav className="flex-1 space-y-1 overflow-y-auto">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                        >
                            <Icon size={18} />
                            <span>{link.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / User Profile & Logout */}
            <div className="pt-4 border-t border-border shrink-0 space-y-2">
                <div className="px-3 py-2">
                    <p className="text-sm font-semibold text-foreground truncate">{user.data.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.data.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full text-left cursor-pointer"
                >
                    <LogOut size={18} />
                    <span>Log out</span>
                </button>
                <Link
                    href="/"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                    <Home size={18} />
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    );
}

export default function DashboardSidebar({ user }: { user: IUser }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card h-full shrink-0 sticky top-0">
                <SidebarInner user={user} />
            </aside>

            {/* Mobile Top Bar */}
            <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 sm:px-8 border-b border-border bg-background/85 backdrop-blur-md md:hidden shrink-0 w-full">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/assets/logo.png"
                        alt="RentNest Logo"
                        width={100}
                        height={35}
                        style={{ width: 'auto', height: 'auto' }}
                        className="object-contain h-7 w-auto"
                        priority
                    />
                </Link>
                <button
                    onClick={() => setOpen(true)}
                    className="p-2 rounded-lg border border-border bg-card cursor-pointer hover:bg-muted transition-colors flex items-center justify-center"
                    aria-label="Open menu"
                >
                    <Menu size={20} />
                </button>
            </header>

            {/* Mobile Overlay */}
            {open && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-xs"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Mobile Drawer */}
            <div
                className={cn(
                    "md:hidden fixed top-0 left-0 h-full w-72 z-50 transition-transform duration-300 ease-in-out border-r border-border bg-card shadow-2xl",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <SidebarInner user={user} onClose={() => setOpen(false)} />
            </div>
        </>
    );
}