"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";

const posts = [
  {
    category: "Renting well",
    title: "A calmer way to search for your next home",
    text: "The small habits that make property hunting feel more focused and less overwhelming.",
  },
  {
    category: "For landlords",
    title: "What makes a listing feel trustworthy?",
    text: "Clear details, honest photos, and a little care go a long way when meeting future residents.",
  },
  {
    category: "Neighborhoods",
    title: "How to choose a place that fits your everyday",
    text: "Look beyond the walls: a simple guide to finding a location that supports your real routine.",
  },
];

export default function BlogPage() {
  return (
    <main className="bg-[#f3f0e9] text-[#173c38]">
      <section className="relative flex min-h-[500px] items-end overflow-hidden bg-[#122721] text-[#f5f1e8]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dnk0bvpym/image/upload/v1793379948/hm3_qzwnfy.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,39,33,.94),rgba(18,39,33,.42),rgba(18,39,33,.18))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#122721]/90 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8 lg:px-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-[#d7ad68]">
            The RentNest journal
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[.98] tracking-[-.05em] md:text-7xl">
            Good ideas for finding your place.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/70">
            Practical tips, thoughtful guides, and stories for the way we live
            now.
          </p>
        </motion.div>
      </section>
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex min-h-80 flex-col justify-between rounded-[1.75rem] border border-[#173c38]/10 bg-[#fbfaf6] p-7"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-[#122721] text-[#d7ad68]">
                    <BookOpen className="size-5" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#c48b42]">
                    {post.category}
                  </span>
                </div>
                <h2 className="mt-12 text-2xl font-semibold leading-tight">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#173c38]/60">
                  {post.text}
                </p>
              </div>
              <Link
                href="#"
                className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold"
              >
                Read article <ArrowUpRight className="size-4 text-[#c48b42]" />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
