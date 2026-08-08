import React from 'react';
import Link from 'next/link';
import { Building2, Home, Briefcase, Users } from 'lucide-react';

const propertyTypes = [
    {
        id: 1,
        title: "Apartment",
        count: "120+ Properties",
        icon: Building2,
        link: "/properties?type=apartment",
    },
    {
        id: 2,
        title: "Family House",
        count: "85+ Properties",
        icon: Home,
        link: "/properties?type=house",
    },
    {
        id: 3,
        title: "Sublet / Room",
        count: "45+ Properties",
        icon: Users,
        link: "/properties?type=sublet",
    },
    {
        id: 4,
        title: "Commercial Space/Studio",
        count: "30+ Properties",
        icon: Briefcase,
        link: "/properties?type=commercial",
    },
];

export default function PropertyTypes() {
    return (
        <section className="py-20 px-4 max-w-6xl mx-auto">
            <div className="text-center space-y-3 mb-12">
                <span className="inline-block px-3.5 py-1.5 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full uppercase">
                    Categories
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    Explore Property Types
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                    Find the perfect space that matches your lifestyle and requirements.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {propertyTypes.map((type) => {
                    const IconComp = type.icon;
                    return (
                        <Link
                            key={type.id}
                            href={type.link}
                            className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 group space-y-4 text-center flex flex-col items-center"
                        >
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                <IconComp className="w-7 h-7" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                                    {type.title}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    {type.count}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}