"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Headphones,
  KeyRound,
  Search,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Search with clarity",
    text: "Smart filters and thoughtfully presented listings help you spend less time scrolling and more time imagining yourself there.",
  },
  {
    icon: BadgeCheck,
    title: "Verified homes",
    text: "We bring more confidence to every listing with clear details and a verification-first experience.",
  },
  {
    icon: Building2,
    title: "List your property",
    text: "Reach the right residents with simple tools for showcasing your space and managing interest.",
  },
  {
    icon: KeyRound,
    title: "Move in smoothly",
    text: "Keep requests, agreements, and important next steps organized in one calm, focused place.",
  },
  {
    icon: ShieldCheck,
    title: "Safer connections",
    text: "Built-in guidance and transparent communication help everyone move forward with confidence.",
  },
  {
    icon: Headphones,
    title: "Human support",
    text: "When you need a hand, our support experience is designed to feel like talking to a person.",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-[#f3f0e9] text-[#173c38]">
      <section className="relative flex min-h-[560px] items-end overflow-hidden bg-[#122721] text-[#f5f1e8]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dnk0bvpym/image/upload/v1793379953/std_cotubc.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,39,33,.94),rgba(18,39,33,.48),rgba(18,39,33,.18))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#122721]/90 via-transparent to-[#122721]/15" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8 lg:px-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-[#d7ad68]">
            Built around your move
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[.98] tracking-[-.05em] md:text-7xl">
            Everything you need to find your place.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/70">
            Simple tools for a more considered rental journey, from your first
            search to the day you turn the key.
          </p>
        </motion.div>
      </section>
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-[1.75rem] border border-[#173c38]/10 bg-[#fbfaf6] p-7 shadow-[0_10px_30px_rgba(23,60,56,.04)]"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#122721] text-[#d7ad68]">
                  <Icon className="size-5" />
                </div>
                <h2 className="mt-12 text-xl font-semibold">{service.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#173c38]/60">
                  {service.text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </section>
      <section className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-[2rem] bg-[#e4e0d5] p-8 md:flex-row md:items-center md:p-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-[#c48b42]">
              Ready when you are
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-[-.04em] md:text-4xl">
              Let&apos;s find your next address.
            </h2>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-full bg-[#122721] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#255c54]"
          >
            Explore homes <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
