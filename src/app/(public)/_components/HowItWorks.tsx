import React from 'react';
import { Search, ShieldCheck, KeyRound } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "Explore & Filter Properties",
        description: "Browse through a wide range of thoroughly verified apartments, houses, and commercial spaces tailored to your exact budget and location preferences.",
        icon: Search,
        stepNumber: "01",
    },
    {
        id: 2,
        title: "Connect & Verify Securely",
        description: "Communicate directly with trusted landlords, review verified details, and ensure complete transparency before making any commitments.",
        icon: ShieldCheck,
        stepNumber: "02",
    },
    {
        id: 3,
        title: "Book & Move In",
        description: "Finalize your agreements digitally, complete secure payments, and step right into your dream living space with absolute peace of mind.",
        icon: KeyRound,
        stepNumber: "03",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-20 px-4 bg-muted/30 border-y border-border">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* সেকশন হেডিং */}
                <div className="text-center space-y-3">
                    <span className="inline-block px-3.5 py-1.5 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full uppercase">
                        Simple Process
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        How RentNest Works
                    </h2>
                    <p className="max-w-xl mx-auto text-muted-foreground text-sm md:text-base">
                        Finding your next home or managing your rental properties has never been this simple, fast, and secure.
                    </p>
                </div>

                {/* স্টেপ কার্ডগুলোর গ্রিড */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={item.id}
                                className="relative p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group space-y-4"
                            >
                                {/* ব্যাকগ্রাউন্ড বড় স্টেপ নাম্বার */}
                                <span className="absolute top-4 right-6 text-5xl font-black text-muted/20 group-hover:text-primary/10 transition-colors">
                                    {item.stepNumber}
                                </span>

                                {/* আইকন */}
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                    <IconComponent className="w-7 h-7" />
                                </div>

                                {/* শিরোনাম */}
                                <h3 className="text-xl font-semibold tracking-tight">
                                    {item.title}
                                </h3>

                                {/* বিবরণ */}
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}