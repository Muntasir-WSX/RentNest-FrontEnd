"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Tag } from "lucide-react";

type Property = {
  id: string;
  title: string;
  description: string;
  price: number | string;
  location: string;
  images: string[];
  isAvailable: boolean;
  category?: { name: string };
};

export default function FeaturedPropertyGrid({ properties }: { properties: Property[] }) {
  if (properties.length === 0) {
    return <div className="rounded-[2rem] border border-[#173c38]/12 bg-[#e9e6dc] px-6 py-16 text-center"><p className="text-sm text-[#173c38]/60">No featured properties found.</p></div>;
  }

  return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
    {properties.map((property, index) => {
      const propertyImage = property.images?.[0] || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=85&w=1200";
      return <motion.article key={property.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, delay: index * 0.08 }} className="group overflow-hidden rounded-[1.75rem] border border-[#173c38]/10 bg-[#fbfaf6] shadow-[0_12px_35px_rgba(23,60,56,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(23,60,56,0.14)]">
        <div className="relative h-64 overflow-hidden bg-[#dcded5]">
          <img src={propertyImage} alt={property.title} className="size-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10251e]/65 via-transparent to-transparent opacity-80" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-[#10251e]/65 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md"><Tag size={12} className="text-[#e4c985]" />{property.category?.name || "General"}</span>
          <span className="absolute bottom-4 left-4 rounded-full bg-[#e4c985] px-3 py-1 text-[11px] font-semibold text-[#10251e]">{property.isAvailable ? "Available now" : "Recently listed"}</span>
        </div>
        <div className="p-5 sm:p-6">
          <div className="min-h-28"><h3 className="line-clamp-1 text-xl font-semibold tracking-tight text-[#173c38]">{property.title}</h3><p className="mt-2 flex items-center gap-1.5 text-xs text-[#173c38]/55"><MapPin size={14} className="text-[#c48b42]" /><span className="truncate">{property.location}</span></p><p className="mt-4 line-clamp-2 text-sm leading-6 text-[#173c38]/60">{property.description}</p></div>
          <div className="mt-5 flex items-end justify-between gap-3 border-t border-[#173c38]/10 pt-5"><div><span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#173c38]/45">Monthly rent</span><span className="mt-1 block text-xl font-bold text-[#173c38]">${property.price}<span className="ml-1 text-xs font-normal text-[#173c38]/50">/mo</span></span></div><Link href="/properties" className="group/link inline-flex items-center gap-2 rounded-full bg-[#173c38] px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#255c54]"><span>View home</span><ArrowUpRight size={14} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" /></Link></div>
        </div>
      </motion.article>;
    })}
  </div>;
}
