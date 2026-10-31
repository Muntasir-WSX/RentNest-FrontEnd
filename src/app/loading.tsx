import Logo from "@/components/ui/SharedComponents/logo/logo";
import React from "react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#10251e] text-[#f5f1e8]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(215,173,104,.16),transparent_30%),linear-gradient(135deg,#10251e,#173c38)]"
      />
      <div className="relative flex flex-col items-center">
        <div className="relative grid size-24 place-items-center">
          <div className="absolute inset-0 rounded-full border border-[#d7ad68]/20" />
          <div className="absolute inset-1 rounded-full border border-transparent border-t-[#d7ad68] border-r-[#d7ad68]/40 animate-[spin_1.4s_linear_infinite]" />
          <div className="absolute inset-3 rounded-full border border-transparent border-b-white/60 animate-[spin_2.2s_linear_infinite_reverse]" />
          <Logo></Logo>
        </div>
        <div className="mt-7 text-center">
          <h2 className="font-serif text-2xl tracking-[-.03em]">RentNest</h2>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[.3em] text-[#d7ad68]">
            Finding your place
          </p>
        </div>
        <div className="mt-7 flex gap-1.5">
          <span className="size-1.5 animate-pulse rounded-full bg-[#d7ad68]" />
          <span className="size-1.5 animate-pulse rounded-full bg-[#d7ad68] [animation-delay:180ms]" />
          <span className="size-1.5 animate-pulse rounded-full bg-[#d7ad68] [animation-delay:360ms]" />
        </div>
      </div>
    </div>
  );
}
