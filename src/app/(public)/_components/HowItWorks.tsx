"use client";

import { motion } from "framer-motion";
import { Search, ShieldCheck, KeyRound, ArrowUpRight } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Explore your options",
    description: "Search verified homes by location, budget, and the features that matter most to you.",
    icon: Search,
  },
  {
    id: "02",
    title: "Connect with confidence",
    description: "Message trusted landlords, review transparent details, and arrange a viewing securely.",
    icon: ShieldCheck,
  },
  {
    id: "03",
    title: "Move in with ease",
    description: "Complete your agreement digitally and step into a place that feels right from day one.",
    icon: KeyRound,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#11251f] px-4 py-20 text-[#f5f1e8] sm:px-6 lg:px-8 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dnk0bvpym/image/upload/v1793379948/hm3_qzwnfy.jpg')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(110deg,rgba(17,37,31,0.98)_0%,rgba(17,37,31,0.9)_48%,rgba(17,37,31,0.68)_100%)]" />
      <div aria-hidden="true" className="absolute -right-32 -top-32 size-96 rounded-full bg-[#d7b56d]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
        >
          <div>
            <span className="inline-flex items-center rounded-full border border-[#d7b56d]/35 bg-[#d7b56d]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e4c985]">
              A simpler way to rent
            </span>
            <h2 className="mt-6 max-w-xl font-serif text-4xl leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              From searching to settling in.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#d6ded8] lg:justify-self-end lg:text-base">
            RentNest keeps every step clear, considered, and human—so finding a place feels less like paperwork and more like progress.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="group relative min-h-64 overflow-hidden rounded-3xl border border-white/15 bg-white/[0.08] p-6 backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.14] sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[#e4c985] text-[#11251f] shadow-lg shadow-black/10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <span className="font-mono text-sm text-[#e4c985]">{step.id}</span>
                </div>
                <h3 className="mt-12 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-[#c8d3cc]">{step.description}</p>
                <ArrowUpRight aria-hidden="true" className="absolute bottom-6 right-6 size-5 text-white/35 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#e4c985]" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
