"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Check,
  Home,
  ShieldCheck,
  Users2,
} from "lucide-react";

const values = [
  {
    icon: Building2,
    title: "Places with potential",
    text: "A considered collection of homes, rooms, and workspaces for every season of life.",
  },
  {
    icon: ShieldCheck,
    title: "Trust built in",
    text: "Clear listings, safer connections, and tools designed to make every step feel secure.",
  },
  {
    icon: Users2,
    title: "People at the center",
    text: "A platform that works for tenants, landlords, and the communities they share.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#f3f0e9] text-[#173c38]">
      <section className="relative flex min-h-[620px] items-end overflow-hidden bg-[#10251e] text-[#f5f1e8] md:min-h-[700px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dnk0bvpym/image/upload/v1793379953/std4_ul44r0.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,19,.92)_0%,rgba(7,25,19,.55)_48%,rgba(7,25,19,.15)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081912]/85 via-transparent to-[#081912]/20" />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8 md:pb-24 lg:px-12"
        >
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3 text-sm font-medium text-[#e4c985]">
              <span className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                <Home className="size-4" />
              </span>
              <span className="uppercase tracking-[0.22em]">
                The story behind RentNest
              </span>
            </div>
            <h1 className="font-serif text-5xl leading-[.96] tracking-[-.05em] sm:text-6xl md:text-8xl">
              Making room for
              <br />
              <span className="text-[#e4c985]">better living.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/75 md:text-lg">
              RentNest brings the search, the people, and the place together—so
              moving forward feels a little more like coming home.
            </p>
            <Link
              href="/properties"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d7ad68] px-6 py-3.5 text-sm font-semibold text-[#10251e] shadow-[0_0_0_4px_rgba(215,173,104,.16),0_12px_30px_rgba(215,173,104,.24)] transition-all hover:-translate-y-0.5 hover:bg-[#e7c47e]"
            >
              <span>Explore homes</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-[#c48b42]">
              What we believe
            </p>
            <h2 className="mt-5 max-w-md font-serif text-4xl leading-[1.04] tracking-[-.04em] md:text-5xl">
              A home is more than an address.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl space-y-6 text-base leading-8 text-[#173c38]/70"
          >
            <p>
              We believe finding a place to live should feel hopeful, not
              overwhelming. RentNest is built to bring more clarity to a process
              that too often feels complicated.
            </p>
            <p>
              From the first scroll to the first key, we create thoughtful tools
              for real people—helping tenants find spaces they love and
              landlords connect with the right residents.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#122721] px-5 py-24 text-[#f5f1e8] sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.22em] text-[#d7ad68]">
                The RentNest difference
              </p>
              <h2 className="font-serif text-4xl leading-none tracking-[-.04em] md:text-5xl">
                Thoughtful by design.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/60">
              Every detail is designed to make the rental journey feel more
              transparent, personal, and possible.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.article
                  key={value.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-[1.75rem] border border-white/15 bg-white/[.07] p-7 backdrop-blur-md"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[#d7ad68] text-[#173c38]">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-14 text-xl font-semibold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {value.text}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.22em] text-[#c48b42]">
              Our promise
            </p>
            <h2 className="max-w-2xl font-serif text-4xl leading-[1.03] tracking-[-.04em] md:text-6xl">
              More confidence in every move.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#122721]">
              We are building a rental experience where good spaces are easier
              to discover, good communication is easier to have, and everyone
              can move with a little more confidence.
            </p>
           <Link
  href="/register"
  className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#122721] px-6 py-3.5 text-sm font-semibold text-[#e4c985] shadow-[0_0_0_4px_rgba(18,39,33,.12),0_12px_30px_rgba(18,39,33,.18)] transition-all hover:-translate-y-0.5 hover:bg-[#1a3830]"
>
  <span>Join RentNest</span> <ArrowUpRight className="size-4" />
</Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[2rem] bg-[#e5e1d6] p-7 sm:p-9"
          >
            <div className="space-y-5 text-sm text-[#173c38]/70">
              <p className="flex items-start gap-3">
                <Check className="mt-0.5 size-5 shrink-0 text-[#c48b42]" />
                Verified homes and clearer property details.
              </p>
              <p className="flex items-start gap-3">
                <Check className="mt-0.5 size-5 shrink-0 text-[#c48b42]" />
                Purpose-built tools for every rental role.
              </p>
              <p className="flex items-start gap-3">
                <Check className="mt-0.5 size-5 shrink-0 text-[#c48b42]" />A
                more human way to find your next place.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}