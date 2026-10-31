'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import Logo from './logo/logo';

const footerLinks = {
  Explore: [
    ['Home', '/'],
    ['Featured properties', '/properties'],
    ['About us', '/about'],
    ['Browse locations', '/properties'],
  ],
  Locations: [
    ['Dhaka rentals', '/properties?city=dhaka'],
    ['Chittagong rentals', '/properties?city=chittagong'],
    ['Sylhet rentals', '/properties?city=sylhet'],
  ],
}

const socials = [
  { label: 'Facebook', icon: FaFacebookF },
  { label: 'Twitter', icon: FaTwitter },
  { label: 'Instagram', icon: FaInstagram },
  { label: 'LinkedIn', icon: FaLinkedinIn },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#10251f] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dnk0bvpym/image/upload/v1793379947/hm4_y9obgq.jpg')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(115deg,rgba(8,22,17,.98)_0%,rgba(11,35,28,.9)_48%,rgba(8,22,17,.96)_100%)]" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        
        {/* Top CTA Banner */}
        <div className="mb-14 flex flex-col gap-6 rounded-[2rem] border border-white/15 bg-white/[0.08] p-7 shadow-2xl backdrop-blur-xl sm:p-9 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#d7ad68]">Your next chapter starts here</p>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Find a place that feels like home.</h2>
          </div>
          <div className="flex items-center">
            <Link 
              href="/properties" 
              className="inline-flex items-center gap-3 rounded-full bg-[#d7ad68] px-6 py-3.5 text-sm font-semibold text-[#10251e] shadow-[0_0_0_4px_rgba(215,173,104,.16),0_12px_30px_rgba(215,173,104,.24)] transition-all hover:-translate-y-0.5 hover:bg-[#e7c47e]"
            >
              Explore homes <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_1fr_1.2fr] lg:gap-10">
          <div>
            <Logo />
            <p className="max-w-sm text-sm leading-7 text-white/95 mt-4">Discover verified rentals, connect with trusted landlords, and move into a space made for your next season.</p>
            <div className="mt-6 flex gap-2.5">
              {socials.map(({ label, icon: Icon }) => (
                <a key={label} href="#" aria-label={label} className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/75 transition-colors hover:border-[#d7ad68] hover:bg-[#d7ad68] hover:text-[#10251f]">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#d7ad68]">{title}</h3>
              <ul className="flex flex-col gap-3.5 text-sm text-white/65">
                {links.map(([label, href]) => <li key={label}><Link href={href} className="transition-colors hover:text-white">{label}</Link></li>)}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#d7ad68]">Contact us</h3>
            <ul className="flex flex-col gap-4 text-sm text-white/65">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 shrink-0 text-[#d7ad68]" size={17} /><span>Chittagong, Bangladesh</span></li>
              <li className="flex items-center gap-3"><Phone className="shrink-0 text-[#d7ad68]" size={17} /><span>+880 1234 567890</span></li>
              <li className="flex items-center gap-3"><Mail className="shrink-0 text-[#d7ad68]" size={17} /><span>support@rentnest.com</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RentNest. All rights reserved.</p>
          <div className="flex gap-6"><Link href="/privacy" className="transition-colors hover:text-white">Privacy policy</Link><Link href="/terms" className="transition-colors hover:text-white">Terms of service</Link></div>
        </div>
      </div>
    </footer>
  )
}