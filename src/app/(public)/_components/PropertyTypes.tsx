"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Briefcase, Home, Users } from "lucide-react";

const propertyTypes = [
  { title: "Apartments", count: "120+ homes", icon: Building2, link: "/properties?type=apartment" },
  { title: "Family houses", count: "85+ homes", icon: Home, link: "/properties?type=house" },
  { title: "Rooms & sublets", count: "45+ homes", icon: Users, link: "/properties?type=sublet" },
  { title: "Studios & workspaces", count: "30+ spaces", icon: Briefcase, link: "/properties?type=commercial" },
];

export default function PropertyTypes() {
  return <section className="bg-[#f3f0e9] px-5 py-24 text-[#173c38] md:px-10 lg:py-32">
    <div className="mx-auto max-w-6xl">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div><p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c48b42]">Browse by lifestyle</p><h2 className="max-w-xl font-serif text-4xl leading-none tracking-[-0.04em] md:text-5xl">A space for every kind of living.</h2></div>
        <p className="max-w-xs text-sm leading-6 text-[#173c38]/60">From a quiet room to a growing business, find a place that feels like yours.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {propertyTypes.map((type, index) => { const Icon = type.icon; return <motion.div key={type.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}><Link href={type.link} className="group flex min-h-64 flex-col justify-between rounded-[1.75rem] border border-[#173c38]/12 bg-[#e9e6dc] p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-[#173c38] hover:text-[#f3f0e9]">
          <div className="flex items-start justify-between"><span className="flex size-12 items-center justify-center rounded-full border border-current/15"><Icon className="size-5" /></span><ArrowUpRight className="size-5 text-[#c48b42] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
          <div><h3 className="text-xl font-medium">{type.title}</h3><p className="mt-2 text-sm opacity-55">{type.count}</p></div>
        </Link></motion.div>; })}
      </div>
    </div>
  </section>;
}
