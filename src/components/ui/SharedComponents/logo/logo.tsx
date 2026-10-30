import React from 'react';
import Link from 'next/link';



// Logo Component integrated directly
function Logo() {
  return (
    <Link href="/" className="group flex shrink-0 items-center gap-3">
      <span className="grid size-11 place-items-center rounded-2xl bg-[#112a1d] border border-[#1f4732] shadow-md transition-transform duration-300 group-hover:scale-105">
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
      <div className="flex flex-col">
        <span className="font-bold tracking-tight text-white text-lg leading-tight">
          RentNest
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 mt-0.5">
          Find your nest
        </span>
      </div>
    </Link>
  );
}


export default Logo;




