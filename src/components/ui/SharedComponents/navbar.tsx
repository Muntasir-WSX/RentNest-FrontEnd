'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, User, LogOut, ChevronDown, LogIn, Loader2, LayoutDashboard, Sparkles, ExternalLink } from 'lucide-react'

import { toast } from 'sonner' 
import { logout } from '@/service/logout';

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

// Logo Component
function Logo() {
  return (
    <Link href="/" className="group flex shrink-0 items-center gap-3">
      <span className="grid size-11 place-items-center rounded-2xl bg-[#112a1d] border border-[#1f4732] shadow-md transition-transform duration-300 group-hover:scale-105">
        <svg 
          id="Logo" 
          width="24" 
          height="20" 
          viewBox="0 0 55 40" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none"
          aria-hidden="true"
        >
          <path 
            fill="#ffc861" 
            d="M23.6322 0.597911C19.9395 1.76672 16.9327 5.48248 10.9192 12.914C3.501 22.0814 -0.208097 26.665 0.00900851 30.5474C0.155095 33.1598 1.30933 35.6108 3.22485 37.3763C6.07159 40 11.9392 40 23.6745 40H24.3275C27.1975 40 29.9133 38.6992 31.7186 36.4682C37.6627 29.1224 40.6348 25.4496 44.4744 24.8957C45.4078 24.7611 46.3555 24.7611 47.2889 24.8957C49.8634 25.2671 52.048 27.0408 55 30.3839C50.2776 21.5248 41.6084 3.83856 31.37 0.597911C28.8514 -0.199304 26.1508 -0.199304 23.6322 0.597911Z"
          />
        </svg>
      </span>
      <div className="flex flex-col">
        <span className="font-bold tracking-tight text-white text-lg leading-tight">
          RentNest
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 mt-0.5">
          Find your nest
        </span>
      </div>
    </Link>
  );
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const mainLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact Us' },
  ]

  const dropdownLinks = [
    { href: '/about', label: 'About Us' },
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
    {/* Dark Green Luxury Glass Capsule Container */}
    <div className={`relative flex min-h-[76px] items-center justify-between gap-5 rounded-full border px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
      scrolled 
        ? 'border-[#ffc861]/30 bg-[#112a1d]/90 shadow-2xl shadow-[#0d2116]/60 backdrop-blur-2xl' 
        : 'border-[#1f4732]/60 bg-[#112a1d]/60 backdrop-blur-xl'
    }`}>
      
      <div className="flex shrink-0 items-center">
        <Logo />
      </div>

      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
        {mainLinks.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-4 py-2.5 text-[13px] font-medium transition-all duration-300 ${
                active 
                  ? 'text-[#ffc861] bg-[#0d2116] border border-[#1f4732]' 
                  : 'text-white/80 hover:-translate-y-0.5 hover:text-[#ffc861]'
              }`}
            >
              {active && (
                <span className="absolute inset-0 -z-10 rounded-full bg-[#0d2116] ring-1 ring-[#1f4732] animate-in fade-in zoom-in-95 duration-300" />
              )}
              {link.label}
            </Link>
          )
        })}

        <div className="relative" ref={moreRef}>
          <button
            type="button"
            onClick={() => setIsMoreOpen((open) => !open)}
            className={`flex items-center gap-1 rounded-full px-4 py-2.5 text-[13px] font-medium transition-all duration-300 ${
              moreActive || isMoreOpen ? 'text-[#ffc861] bg-[#0d2116] border border-[#1f4732]' : 'text-white/80 hover:text-[#ffc861]'
            }`}
            aria-expanded={isMoreOpen}
          >
            More <ChevronDown className={`size-3.5 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
          </button>

          {isMoreOpen && (
            <div className="absolute left-1/2 top-full mt-4 w-56 -translate-x-1/2 origin-top rounded-2xl border border-[#1f4732] bg-[#112a1d]/95 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200">
              {dropdownLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMoreOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    pathname === link.href ? 'bg-[#0d2116] font-semibold text-[#ffc861] border border-[#1f4732]' : 'text-white/80 hover:bg-white/10 hover:text-[#ffc861]'
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

      <div className="ml-auto flex items-center gap-3">
        {profileData ? (
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((open) => !open)}
              className="flex items-center gap-2 rounded-full border border-[#1f4732] bg-white/10 py-1.5 pl-1.5 pr-3 text-white transition-all hover:border-[#ffc861]/50 hover:bg-white/15"
              aria-label="Open profile menu"
              aria-expanded={isProfileOpen}
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-[#ffc861] text-sm font-semibold text-black">
                {profileData.name?.charAt(0).toUpperCase() || <User className="size-4" />}
              </span>
              <span className="hidden max-w-24 truncate text-xs font-medium sm:block text-white">
                {profileData.name}
              </span>
              <ChevronDown className={`size-3.5 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-3 w-60 rounded-2xl border border-[#1f4732] bg-[#112a1d]/95 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200">
                <div className="border-b border-white/10 px-3 pb-3 pt-2">
                  <p className="truncate text-sm font-semibold text-white">{profileData.name}</p>
                  <p className="truncate text-xs text-white/50">{profileData.email}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border bg-[#ffc861]/10 text-[#ffc861] border-[#ffc861]/20">
                      <Sparkles size={10} /> {profileData.role}
                    </span>
                  </div>
                </div>

                <Link 
                  href={dashboardLink} 
                  onClick={() => setIsProfileOpen(false)} 
                  className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/90 hover:bg-white/10 hover:text-[#ffc861]"
                >
                  <LayoutDashboard size={16} className="text-[#ffc861]" /> Dashboard
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
            className="hidden items-center gap-2 rounded-full bg-[#d7ad68] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#10251e] shadow-[0_0_0_3px_rgba(215,173,104,.15)] transition-all hover:-translate-y-0.5 hover:bg-[#e7c47e] sm:flex"
          >
            <LogIn className="size-3.5" /> Login
          </Link>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex size-10 items-center justify-center rounded-full border border-[#1f4732] bg-white/10 text-white lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
    </div>

    {isOpen && (
      <div className="mt-3 rounded-3xl border border-[#1f4732] bg-[#112a1d]/95 p-3 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-3 duration-300 lg:hidden max-h-[75vh] overflow-y-auto">
        {allMobileLinks.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block rounded-2xl px-4 py-3 text-sm transition-colors ${
                active 
                  ? 'bg-[#0d2116] font-semibold text-[#ffc861] border border-[#1f4732]' 
                  : 'text-white/80 hover:bg-white/10 hover:text-[#ffc861]'
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