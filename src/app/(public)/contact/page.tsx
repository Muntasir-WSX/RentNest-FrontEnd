"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-[#f3f0e9] text-[#173c38]">
      <section className="relative flex min-h-[500px] items-end overflow-hidden bg-[#122721] text-[#f5f1e8]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dnk0bvpym/image/upload/v1793379953/std1_ub5ae1.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,39,33,.94),rgba(18,39,33,.42),rgba(18,39,33,.2))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#122721]/90 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-semibold uppercase tracking-[.22em] text-[#d7ad68]"
          >
            We&apos;re here to help
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-3xl font-serif text-5xl leading-[.98] tracking-[-.05em] md:text-7xl"
          >
            Let&apos;s talk about your next move.
          </motion.h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/70">
            Have a question about a home, a listing, or the RentNest experience?
            Send us a note.
          </p>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div className="space-y-5 text-sm text-[#173c38]/70">
            <p className="flex items-center gap-3">
              <Mail className="size-5 text-[#c48b42]" /> support@rentnest.com
            </p>
            <p className="flex items-center gap-3">
              <Phone className="size-5 text-[#c48b42]" /> +880 1234 567890
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="size-5 text-[#c48b42]" /> Chittagong,
              Bangladesh
            </p>
          </div>
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-[#173c38]/10 bg-[#fbfaf6] p-6 shadow-[0_15px_40px_rgba(23,60,56,.06)] sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium">
                Name
                <input
                  className="mt-2 h-12 w-full rounded-xl border border-[#173c38]/15 bg-white/70 px-4 outline-none focus:border-[#c48b42]"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm font-medium">
                Email
                <input
                  type="email"
                  className="mt-2 h-12 w-full rounded-xl border border-[#173c38]/15 bg-white/70 px-4 outline-none focus:border-[#c48b42]"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="mt-5 block text-sm font-medium">
              Subject
              <input
                className="mt-2 h-12 w-full rounded-xl border border-[#173c38]/15 bg-white/70 px-4 outline-none focus:border-[#c48b42]"
                placeholder="How can we help?"
              />
            </label>
            <label className="mt-5 block text-sm font-medium">
              Message
              <textarea
                rows={6}
                className="mt-2 w-full resize-none rounded-xl border border-[#173c38]/15 bg-white/70 p-4 outline-none focus:border-[#c48b42]"
                placeholder="Tell us a little more..."
              />
            </label>
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#122721] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#255c54]"
            >
              Send message <Send className="size-4" />
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
