"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Briefcase, Home, Users } from "lucide-react";

const propertyTypes = [
  { title: "Apartments", count: "120+ homes", image: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1793379947/ap2_dpyruy.jpg", icon: Building2, link: "/properties?type=apartment" },
  { title: "Family houses", count: "85+ homes", image: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1793423672/hm6_ko08nm.jpg", icon: Home, link: "/properties?type=house" },
  { title: "Rooms & sublets", count: "45+ homes", image: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1793423766/sublet2_fow9w6.jpg", icon: Users, link: "/properties?type=sublet" },
  { title: "Studios & workspaces", count: "30+ spaces", image: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1793379953/std1_ub5ae1.jpg", icon: Briefcase, link: "/properties?type=commercial" },
];

export default function PropertyTypes() {
  return <section className="bg-[#f3f0e9] px-5 py-24 text-[#173c38] md:px-10 lg:py-32">
    <div className="mx-auto max-w-6xl">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div><p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c48b42]">Browse by lifestyle</p><h2 className="max-w-xl font-serif text-4xl leading-none tracking-[-0.04em] md:text-5xl">A space for every kind of living.</h2></div>
        <p className="max-w-xs text-sm leading-6 text-[#173c38]/60">From a quiet room to a growing business, find a place that feels like yours.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {propertyTypes.map((type, index) => { const Icon = type.icon; return <motion.div key={type.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}><Link href={type.link} className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[#173c38]/12 bg-[#173c38] p-6 text-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl" style={{ backgroundImage: `url(${type.image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#10251e]/65 via-[#10251e]/15 to-[#10251e]/90 transition-opacity duration-500 group-hover:from-[#10251e]/45 group-hover:via-[#10251e]/10 group-hover:to-[#10251e]/95" />
          <div className="relative z-10 flex items-start justify-between"><span className="flex size-12 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md"><Icon className="size-5" /></span><ArrowUpRight className="size-5 text-[#e9c477] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
          <div className="relative z-10"><h3 className="text-xl font-medium">{type.title}</h3><p className="mt-2 text-sm text-white/70">{type.count}</p></div>
        </Link></motion.div>; })}
      </div>
    </div>
  </section>;
}
