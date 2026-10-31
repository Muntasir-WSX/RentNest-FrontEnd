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
          
          {/* Only Logo Icon SVG inside the loader spinner */}
          <span className="grid size-11 place-items-center rounded-2xl bg-[#112a1d] border border-[#1f4732] shadow-md">
            <svg 
              id="Logo" 
              width="24" 
              height="20" 
              viewBox="0 0 55 40" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none"
              aria-hidden="true"
            >
              <path 
                fill="#ffc861" 
                d="M23.6322 0.597911C19.9395 1.76672 16.9327 5.48248 10.9192 12.914C3.501 22.0814 -0.208097 26.665 0.00900851 30.5474C0.155095 33.1598 1.30933 35.6108 3.22485 37.3763C6.07159 40 11.9392 40 23.6745 40H24.3275C27.1975 40 29.9133 38.6992 31.7186 36.4682C37.6627 29.1224 40.6348 25.4496 44.4744 24.8957C45.4078 24.7611 46.3555 24.7611 47.2889 24.8957C49.8634 25.2671 52.048 27.0408 55 30.3839C50.2776 21.5248 41.6084 3.83856 31.37 0.597911C28.8514 -0.199304 26.1508 -0.199304 23.6322 0.597911Z"
              />
            </svg>
          </span>
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