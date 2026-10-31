import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FeaturedPropertyGrid from "./FeaturedPropertyGrid";

type Property = {
  id: string;
  title: string;
  description: string;
  price: number | string;
  location: string;
  images: string[];
  isAvailable: boolean;
  category?: { name: string };
};

type ApiResponse = { success: boolean; data: Property[] };

async function fetchFeaturedProperties(): Promise<Property[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/properties`, { cache: "no-store" });
    if (!res.ok) return [];
    const result: ApiResponse = await res.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function FeaturedProperties() {
  const properties = (await fetchFeaturedProperties()).slice(0, 6);

  return <section className="bg-[#f3f0e9] px-5 py-24 text-[#173c38] md:px-10 lg:py-32">
    <div className="mx-auto max-w-6xl">
      <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
        <div className="max-w-2xl"><p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c48b42]">A few good places</p><h2 className="font-serif text-4xl leading-none tracking-[-0.04em] md:text-5xl">Homes worth taking a closer look at.</h2><p className="mt-5 max-w-lg text-sm leading-7 text-[#173c38]/60">A handpicked selection of welcoming spaces, ready for the next person to make them their own.</p></div>
        <Link href="/properties" className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#173c38]/20 px-5 py-3 text-sm font-semibold transition-colors hover:bg-[#173c38] hover:text-white">Browse all homes <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
      </div>
      <FeaturedPropertyGrid properties={properties} />
    </div>
  </section>;
}
