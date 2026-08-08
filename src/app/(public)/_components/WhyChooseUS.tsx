import React from 'react';
import { ShieldCheck, Building2, Users2, Headphones } from 'lucide-react';

const features = [
    {
        id: 1,
        title: "Verified Listings",
        description: "Browse through thousands of thoroughly verified apartments, houses, and commercial spaces with complete peace of mind.",
        icon: Building2,
    },
    {
        id: 2,
        title: "Secure Transactions",
        description: "Our platform ensures top-tier security with role-based access control, safe digital payments, and trusted agreements.",
        icon: ShieldCheck,
    },
    {
        id: 3,
        title: "Role-Based Dashboards",
        description: "Dedicated, tailored dashboards separately for tenants, landlords, and administrators to streamline property management.",
        icon: Users2,
    },
    {
        id: 4,
        title: "24/7 Dedicated Support",
        description: "We are always here to help you navigate through your renting journey, answer queries, and resolve issues instantly.",
        icon: Headphones,
    },
];

export default function WhyChooseUS() {
    return (
        <section className="py-20 px-4 max-w-6xl mx-auto">
            <div className="text-center space-y-3 mb-16">
                <span className="inline-block px-3.5 py-1.5 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full uppercase">
                    Why Choose Us
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    Experience Next-Level Real Estate
                </h2>
                <p className="max-w-xl mx-auto text-muted-foreground text-sm md:text-base">
                    We bring transparency, advanced security, and seamless digital management to the rental market.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature) => {
                    const IconComponent = feature.icon;
                    return (
                        <div
                            key={feature.id}
                            className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 space-y-4 group flex flex-col items-start"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                <IconComponent className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}