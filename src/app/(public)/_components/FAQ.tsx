"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "How do I find and rent a property on RentNest?",
        answer: "You can easily browse through our verified properties using filters like location, price, and type. Once you find a suitable property, you can connect directly with the landlord or proceed with our digital booking system.",
    },
    {
        question: "Are all landlords and properties verified?",
        answer: "Yes, RentNest ensures complete safety and transparency. All listings and property owners go through a thorough verification process before appearing on the platform.",
    },
    {
        question: "How does the role-based dashboard work?",
        answer: "RentNest provides separate, secure dashboards customized for Tenants, Landlords, and Administrators. Each user role gets dedicated tools tailored specifically to their rental and management needs.",
    },
    {
        question: "What are the payment methods available for bookings?",
        answer: "We support secure digital payment integrations, online transactions, and Cash on Delivery options depending on the service agreements and property requirements.",
    },
    {
        question: "How can landlords list their properties?",
        answer: "If you are a property owner, simply register or log in with your Landlord account, go to your dashboard, and use the 'Add Property' feature to list your property details instantly.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 px-4 max-w-4xl mx-auto">
            <div className="text-center space-y-3 mb-16">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full uppercase">
                    <HelpCircle className="w-3.5 h-3.5" /> Support & Info
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                    Got questions? We've got answers about renting, listing, and platform security.
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div
                            key={index}
                            className="rounded-2xl bg-card border border-border overflow-hidden transition-all duration-300 shadow-sm"
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-6 text-left font-semibold text-base md:text-lg focus:outline-none"
                            >
                                <span>{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                                        isOpen ? "transform rotate-180 text-primary" : ""
                                    }`}
                                />
                            </button>
                            {isOpen && (
                                <div className="px-6 pb-6 text-muted-foreground text-sm md:text-base leading-relaxed border-t border-border/50 pt-4">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}