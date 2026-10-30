"use client";

import { motion } from "framer-motion";
import { Building2, Headphones, ShieldCheck, Users2 } from "lucide-react";

const features = [
  { title: "Verified listings", description: "Every listing is reviewed so you can search with clarity and confidence.", icon: Building2 },
  { title: "Secure by design", description: "Trusted agreements, protected access, and safer digital transactions.", icon: ShieldCheck },
  { title: "Made for your role", description: "Focused tools for tenants, landlords, and the people managing it all.", icon: Users2 },
  { title: "Human support", description: "A real team ready to help from your first search to move-in day.", icon: Headphones },
];

export default function WhyChooseUS() {
  return <section id="why-rentnest" className="bg-[#f3f0e9] px-5 py-24 text-[#173c38] md:px-10 lg:py-32"><div className="mx-auto max-w-6xl"><div className="mb-14 max-w-2xl"><p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c48b42]">The RentNest standard</p><h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">Renting should feel clear, not complicated.</h2></div><div className="grid border-t border-[#173c38]/15 md:grid-cols-2 lg:grid-cols-4">{features.map((feature, index) => { const Icon = feature.icon; return <motion.div key={feature.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="border-b border-[#173c38]/15 p-6 first:pl-0 md:nth-[2n]:border-l md:nth-[2n]:pl-8 lg:border-b-0 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0"><div className="mb-12 flex size-11 items-center justify-center rounded-full bg-[#173c38] text-[#d6a45e]"><Icon className="size-5" /></div><h3 className="text-lg font-medium">{feature.title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-[#173c38]/60">{feature.description}</p></motion.div>; })}</div></div></section>;
}
