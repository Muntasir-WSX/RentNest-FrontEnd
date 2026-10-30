"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Home, Search } from "lucide-react";

const slides = [
  {
    id: 1,
    eyebrow: "Find your next address",
    title: "A better place to call home.",
    description: "Browse beautifully kept homes in neighborhoods you will love, with clear pricing and people you can trust.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=88&w=2200",
    action: "Explore homes",
    href: "/properties",
    location: "Verified listings · Every day",
  },
  {
    id: 2,
    eyebrow: "Rent with confidence",
    title: "Good homes. Good people. Less hassle.",
    description: "From your first search to move-in day, RentMy keeps the entire rental journey simple and human.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=88&w=2200",
    action: "How it works",
    href: "/about",
    location: "Verified listings · Every day",
  },
  {
    id: 3,
    eyebrow: "Make room for more",
    title: "Live somewhere that fits your life.",
    description: "Discover spaces with character, comfort, and the little details that make a house feel like yours.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=88&w=2200",
    action: "View all properties",
    href: "/properties",
    location: "Flexible stays · Real support",
  },
];

export default function HomeSlider() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  useEffect(() => {
    const timer = window.setInterval(() => setCurrent((index) => (index + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: 1 | -1) => setCurrent((index) => (index + direction + slides.length) % slides.length);

  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-[#10251e] text-white md:min-h-[760px]" aria-label="Featured rental homes">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={slide.id}
          className="absolute inset-0 -z-20"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={slide.image} alt="" className="h-full w-full object-cover" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,25,20,.9)_0%,rgba(8,25,20,.62)_44%,rgba(8,25,20,.12)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#081912]/80 via-transparent to-[#081912]/20" />

      <div className="mx-auto flex min-h-[680px] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 md:min-h-[760px] md:pb-24 lg:px-12">
        <motion.div
          key={`content-${slide.id}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-3xl"
        >
          <div className="mb-6 flex items-center gap-3 text-sm font-medium text-[#e9c477]">
            <span className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md"><Home className="size-4" aria-hidden="true" /></span>
            <span className="uppercase tracking-[0.22em]">{slide.eyebrow}</span>
          </div>
          <h1 className="max-w-3xl font-heading text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[6.7rem]">{slide.title}</h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/75 md:text-lg">{slide.description}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href={slide.href} className="group inline-flex items-center gap-3 rounded-full bg-[#e9c477] px-6 py-3.5 text-sm font-semibold text-[#10251e] transition-transform hover:-translate-y-0.5">
              {slide.action}<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
            <Link href="/properties" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3.5 text-sm font-medium backdrop-blur-md transition-colors hover:bg-white/20"><Search className="size-4" aria-hidden="true" /> Find a home</Link>
          </div>
        </motion.div>

        <div className="mt-14 flex items-end justify-between gap-6 border-t border-white/20 pt-5">
          <div className="flex items-center gap-4 text-sm text-white/70"><span className="size-2 rounded-full bg-[#e9c477]" />{slide.location}</div>
          <div className="flex items-center gap-3">
            <span className="mr-2 hidden text-xs uppercase tracking-[0.2em] text-white/50 sm:inline">0{current + 1} / 0{slides.length}</span>
            <button onClick={() => move(-1)} className="flex size-11 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20" aria-label="Previous slide"><ChevronLeft className="size-5" /></button>
            <button onClick={() => move(1)} className="flex size-11 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20" aria-label="Next slide"><ChevronRight className="size-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
