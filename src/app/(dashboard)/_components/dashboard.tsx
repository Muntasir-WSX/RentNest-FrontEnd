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
import Logo from "@/components/ui/SharedComponents/logo/logo";

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
        <div className="flex h-full flex-col space-y-6 bg-[#122721] p-6 text-[#f5f1e8]">
            {/* Logo and Role Badge */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col items-start gap-2 px-2">
                   <Logo></Logo>
                    <span className="rounded-full bg-[#d7ad68]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.16em] text-[#d7ad68]">
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
? "bg-[#d7ad68] text-[#122721] shadow-lg shadow-black/10"
                                    : "text-white/65 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <Icon size={18} />
                            <span>{link.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / User Profile & Logout */}
            <div className="shrink-0 space-y-2 border-t border-white/10 pt-4">
                <div className="px-3 py-2">
                    <p className="truncate text-sm font-semibold text-white">{user.data.name}</p>
                    <p className="truncate text-xs text-white/50">{user.data.email}</p>
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
            <header className="sticky top-0 z-20 flex h-16 w-full shrink-0 items-center justify-between border-b border-[#122721]/10 bg-[#f3f0e9]/90 px-4 backdrop-blur-md sm:px-8 md:hidden">
                
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
