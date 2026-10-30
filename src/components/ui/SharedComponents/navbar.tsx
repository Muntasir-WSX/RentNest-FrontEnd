'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, User, LogOut, ChevronDown, LogIn, Loader2, LayoutDashboard, Sparkles, ExternalLink } from 'lucide-react'

import { toast } from 'sonner' 
import { logout } from '@/service/logout';
import Logo from './logo/logo';

type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string; // "TENANT" | "LANDLORD" | "ADMIN"
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
}

type Iuser = {
  success: boolean;
  message: string;
  data?: UserProfile;
};

type NavbarProps = {
  user?: Iuser;
}

export function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isPending, startTransition] = useTransition()
  
  const pathname = usePathname()
  const router = useRouter()
  const profileRef = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLDivElement>(null)

  // Add scroll detection for smooth capsule scaling & glass animation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (!moreRef.current?.contains(target)) setIsMoreOpen(false)
      if (!profileRef.current?.contains(target)) setIsProfileOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    setIsProfileOpen(false)
    setIsOpen(false)

    startTransition(async () => {
      try {
        const res = await logout()
        if (res?.success) {
          toast.success(res.message, {
            position: 'bottom-right',
          })
          router.refresh()
          router.push('/')
        }
      } catch (error) {
        toast.error("Something went wrong during logout!", {
          position: 'bottom-right',
        })
      }
    })
  }

  // Main visible nav links
  const mainLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact Us' },
  ]

  // Suggested & extra links inside the "More" dropdown
  const dropdownLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/properties/compare', label: 'Compare Properties' },
    { href: '/favorites', label: 'Wishlist' },
    { href: '/faq', label: 'FAQ' },
    { href: '/blog', label: 'Blog & Tips' },
  ]

  const allMobileLinks = [...mainLinks, ...dropdownLinks];

  const profileData = user?.data;
  const getDashboardRoute = (role?: string) => {
    switch (role?.toUpperCase()) {
      case 'ADMIN':
        return '/admin-dashboard';
      case 'LANDLORD':
        return '/Landlord-Dashboard';
      case 'TENANT':
      default:
        return '/tenantdashboard';
    }
  }

  const dashboardLink = getDashboardRoute(profileData?.role);
  const moreActive = dropdownLinks.some((link) => pathname === link.href)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8 bg-transparent">
      <div className={`mx-auto max-w-[1440px] transition-all duration-500 ease-out ${
        scrolled ? 'max-w-[1280px]' : ''
      }`}>
        {/* Luxury Glass Capsule Container */}
        <div className={`relative flex min-h-[76px] items-center justify-between gap-5 rounded-full border px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
          scrolled 
            ? 'border-[#6BDA0A]/30 bg-black/80 shadow-2xl shadow-black/40 backdrop-blur-2xl' 
            : 'border-white/10 bg-black/40 backdrop-blur-xl'
        }`}>
          
          {/* Left Side: Logo */}
          <div className="flex shrink-0 items-center">
            <Logo />
          </div>

          {/* Middle Column: Nav Links (Strictly Centered) */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {mainLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2.5 text-[13px] font-medium transition-all duration-300 ${
                    active 
                      ? 'text-[#6BDA0A]' 
                      : 'text-white/70 hover:-translate-y-0.5 hover:text-white'
                  }`}
                >
                  {active && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-[#6BDA0A]/10 ring-1 ring-[#6BDA0A]/25 animate-in fade-in zoom-in-95 duration-300" />
                  )}
                  {link.label}
                </Link>
              )
            })}

            {/* More / Pages Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setIsMoreOpen((open) => !open)}
                className={`flex items-center gap-1 rounded-full px-4 py-2.5 text-[13px] font-medium transition-all duration-300 ${
                  moreActive || isMoreOpen ? 'text-[#6BDA0A]' : 'text-white/70 hover:text-white'
                }`}
                aria-expanded={isMoreOpen}
              >
                More <ChevronDown className={`size-3.5 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreOpen && (
                <div className="absolute left-1/2 top-full mt-4 w-56 -translate-x-1/2 origin-top rounded-2xl border border-white/10 bg-[#11110f]/95 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200">
                  {dropdownLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMoreOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                        pathname === link.href ? 'bg-[#6BDA0A]/15 font-semibold text-[#6BDA0A]' : 'text-white/70 hover:bg-white/10 hover:text-[#6BDA0A]'
                      }`}
                    >
                      {link.label}
                      <ExternalLink className="size-3.5 opacity-40" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Side: Profile / Login & Mobile Menu Button */}
          <div className="ml-auto flex items-center gap-3">
            {profileData ? (
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 py-1.5 pl-1.5 pr-3 text-white transition-all hover:border-[#6BDA0A]/50 hover:bg-white/15"
                  aria-label="Open profile menu"
                  aria-expanded={isProfileOpen}
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-[#6BDA0A] text-sm font-semibold text-black">
                    {profileData.name?.charAt(0).toUpperCase() || <User className="size-4" />}
                  </span>
                  <span className="hidden max-w-24 truncate text-xs font-medium sm:block">
                    {profileData.name}
                  </span>
                  <ChevronDown className={`size-3.5 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-60 rounded-2xl border border-white/10 bg-[#11110f]/95 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200">
                    <div className="border-b border-white/10 px-3 pb-3 pt-2">
                      <p className="truncate text-sm font-semibold text-white">{profileData.name}</p>
                      <p className="truncate text-xs text-white/45">{profileData.email}</p>
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border bg-[#6BDA0A]/10 text-[#6BDA0A] border-[#6BDA0A]/20">
                          <Sparkles size={10} /> {profileData.role}
                        </span>
                      </div>
                    </div>

                    <Link 
                      href={dashboardLink} 
                      onClick={() => setIsProfileOpen(false)} 
                      className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      <LayoutDashboard size={16} className="text-[#6BDA0A]" /> Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isPending}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-300 hover:bg-red-400/10 disabled:opacity-50 transition-colors"
                    >
                      {isPending ? <Loader2 className="size-4 animate-spin" /> : <LogOut className="size-4" />}
                      {isPending ? 'Logging out...' : 'Logout'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/login" 
                className="hidden items-center gap-2 rounded-full bg-[#6BDA0A] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-black transition-all hover:-translate-y-0.5 hover:bg-[#7beb0e] hover:shadow-lg hover:shadow-[#6BDA0A]/20 sm:flex"
              >
                <LogIn className="size-3.5" /> Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="mt-3 rounded-3xl border border-white/10 bg-[#11110f]/95 p-3 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-3 duration-300 lg:hidden max-h-[75vh] overflow-y-auto">
            {allMobileLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-sm transition-colors ${
                    active 
                      ? 'bg-[#6BDA0A] font-semibold text-black' 
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </header>
  )
}