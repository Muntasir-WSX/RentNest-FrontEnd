import FAQ from "../_components/FAQ";

export default function FAQPage() {
  return (
    <main>
      <section className="relative flex min-h-[500px] items-end overflow-hidden bg-[#122721] text-[#f5f1e8]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dnk0bvpym/image/upload/v1793379947/home2_vemu1b.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,39,33,.94),rgba(18,39,33,.44),rgba(18,39,33,.18))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#122721]/90 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-[#d7ad68]">
            Questions, answered
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[.98] tracking-[-.05em] md:text-7xl">
            A clearer way to rent starts with clarity.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/70">
            Find quick answers about searching, listing, verification, and
            moving with RentNest.
          </p>
        </div>
      </section>
      <FAQ />
    </main>
  );
}
