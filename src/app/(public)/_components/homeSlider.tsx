"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Home, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        badge: "Find Your Dream Space",
        title: "Discover Modern Apartments in Prime Locations",
        description: "Explore thoroughly verified residential spaces tailored for your comfort, safety, and modern lifestyle.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1600",
        btnText: "Explore Properties",
        btnLink: "/properties",
    },
    {
        id: 2,
        badge: "Trusted Landlords",
        title: "Hassle-Free Renting & Secure Management",
        description: "Connect directly with trusted property owners, complete digital agreements, and manage payments with ultimate peace of mind.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600",
        btnText: "Learn More",
        btnLink: "/about",
    },
    {
        id: 3,
        badge: "Smart Living",
        title: "Experience Next-Level Urban Neighborhoods",
        description: "Step into vibrant communities equipped with top-tier amenities, smart security, and exceptional living standards.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
        btnText: "Browse All",
        btnLink: "/properties",
    },
];

export default function HomeSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative w-full h-[550px] md:h-[650px] overflow-hidden bg-background">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                >
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
                    />
                    <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 max-w-4xl mx-auto space-y-6">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold tracking-wider text-white bg-primary/80 backdrop-blur-md rounded-full uppercase animate-fade-in">
                            {/* Sparkles এর পরিবর্তে Home আইকন */}
                            <Home className="w-3.5 h-3.5" /> {slide.badge}
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
                            {slide.title}
                        </h1>
                        <p className="max-w-2xl text-gray-200 text-sm md:text-base lg:text-lg font-normal drop-shadow">
                            {slide.description}
                        </p>
                        <div className="pt-2">
                            <Link
                                href={slide.btnLink}
                                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl shadow-lg transition-all transform hover:scale-105"
                            >
                                {slide.btnText} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            
            {/* লেফট অ্যারো */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors"
                aria-label="Previous Slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* রাইট অ্যারো */}
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors"
                aria-label="Next Slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`transition-all duration-300 rounded-full ${
                            index === currentIndex ? "w-8 h-2.5 bg-primary" : "w-2.5 h-2.5 bg-white/50 hover:bg-white"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}