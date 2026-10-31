"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

const cities = [
  { name: "Dhaka", properties: "150+ rentals", image: "https://static.vecteezy.com/system/resources/previews/028/244/386/large_2x/a-view-of-the-city-skyline-from-a-high-rise-building-in-dhaka-bangladesh-photo.jpg", link: "/properties?city=dhaka" },
  { name: "Chittagong", properties: "90+ rentals", image: "https://thumbs.dreamstime.com/b/aerial-view-chittagong-city-buildings-roads-trees-sunny-day-also-known-as-chattogram-second-largest-391846012.jpg", link: "/properties?city=chittagong" },
  { name: "Sylhet", properties: "60+ rentals", image: "https://c8.alamy.com/comp/3CCC7TM/aerial-view-of-sylhet-city-skyline-bangladesh-with-colourful-buildings-and-modern-high-rises-under-a-hazy-sky-3CCC7TM.jpg", link: "/properties?city=sylhet" },
];

export default function ServiceArea() {
  return <section id="locations" className="bg-[#122721] px-5 py-24 text-[#f3f0e9] md:px-10 lg:py-32">
    <div className="mx-auto max-w-6xl"><div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d6a45e]">Find your next address</p><h2 className="font-serif text-4xl leading-none tracking-[-0.04em] md:text-5xl">Rooted in the places<br className="hidden md:block" /> people love.</h2></div><p className="max-w-xs text-sm leading-6 text-white/60">Explore growing rental communities across Bangladesh.</p></div>
      <div className="grid gap-4 md:grid-cols-3">{cities.map((city, index) => <motion.div key={city.name} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}><Link href={city.link} className="group relative block h-80 overflow-hidden rounded-[1.75rem] border border-white/10"><img src={city.image} alt={`${city.name} city skyline`} className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#071f1d] via-[#071f1d]/25 to-transparent" /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6"><div><p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d6a45e]"><MapPin className="size-3" /> Bangladesh</p><h3 className="font-serif text-3xl">{city.name}</h3><p className="mt-1 text-sm text-white/60">{city.properties}</p></div><span className="flex size-11 items-center justify-center rounded-full bg-[#f3f0e9] text-[#173c38] transition duration-300 group-hover:bg-[#d6a45e]"><ArrowUpRight className="size-5" /></span></div></Link></motion.div>)}</div>
    </div>
  </section>;
}
