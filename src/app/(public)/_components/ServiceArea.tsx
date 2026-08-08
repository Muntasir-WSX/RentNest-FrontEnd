import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

const cities = [
    {
        id: 1,
        name: "Dhaka",
        properties: "150+ Rentals Available",
        image: "https://static.vecteezy.com/system/resources/previews/028/244/386/large_2x/a-view-of-the-city-skyline-from-a-high-rise-building-in-dhaka-bangladesh-photo.jpg",
        link: "/properties?city=dhaka",
    },
    {
        id: 2,
        name: "Chittagong",
        properties: "90+ Rentals Available",
        image: "https://thumbs.dreamstime.com/b/aerial-view-chittagong-city-buildings-roads-trees-sunny-day-also-known-as-chattogram-second-largest-391846012.jpg",
        link: "/properties?city=chittagong",
    },
    {
        id: 3,
        name: "Sylhet",
        properties: "60+ Rentals Available",
        image: "https://c8.alamy.com/comp/3CCC7TM/aerial-view-of-sylhet-city-skyline-bangladesh-with-colourful-buildings-and-modern-high-rises-under-a-hazy-sky-3CCC7TM.jpg",
        link: "/properties?city=sylhet",
    },
];

export default function ServiceArea() {
    return (
        <section className="py-20 px-4 bg-muted/30 border-t border-border">
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="text-center space-y-3">
                    <span className="inline-block px-3.5 py-1.5 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full uppercase">
                        Locations
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        Our Service Areas
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
                        Explore verified properties across the major cities of Bangladesh.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cities.map((city) => (
                        <Link
                            key={city.id}
                            href={city.link}
                            className="group relative h-80 rounded-2xl overflow-hidden shadow-md block border border-border"
                        >
                            {/* ব্যাকগ্রাউন্ড ইমেজ ও ডার্ক ওভারলে */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                            <img
                                src={city.image}
                                alt={city.name}
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                            />

                            {/* সিটির নাম ও ডিটেইলস */}
                            <div className="absolute bottom-0 inset-x-0 p-6 z-20 flex items-end justify-between">
                                <div className="space-y-1 text-white">
                                    <div className="flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-wider">
                                        <MapPin className="w-3.5 h-3.5" /> Bangladesh
                                    </div>
                                    <h3 className="text-2xl font-bold">{city.name}</h3>
                                    <p className="text-xs text-gray-300">{city.properties}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-primary transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}