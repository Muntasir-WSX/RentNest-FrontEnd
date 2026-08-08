import React from 'react'
import Image from 'next/image'

export default function Globaloading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4 p-8 rounded-2xl bg-card border border-border shadow-xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Animated Logo/Icon Container */}
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 animate-pulse">
          <Image 
            src="/assets/logo.png" 
            alt="RentNest Logo" 
            width={36} 
            height={36} 
            className="object-contain animate-bounce"
            priority
          />
        </div>

        {/* Brand & Loading Text */}
        <div className="flex flex-col items-center space-y-1 text-center">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Rent<span className="text-primary">Nest</span>
          </h2>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Find your nest
          </p>
        </div>

        {/* Spinner / Progress Indicator */}
        <div className="flex items-center space-x-1.5 pt-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
        </div>

      </div>
    </div>
  )
} 