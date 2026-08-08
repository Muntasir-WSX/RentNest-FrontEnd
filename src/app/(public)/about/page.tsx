import Image from "next/image";
import Link from "next/link";
import { Building2, ShieldCheck, Users2, Home, ArrowRight } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <section className="relative py-20 md:py-28 px-4 overflow-hidden border-b border-border">
                <div className="max-w-6xl mx-auto text-center space-y-6">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full uppercase">
                        <Home className="w-3.5 h-3.5" /> About RentNest
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        Redefining Modern <span className="text-primary">Living</span> & Renting
                    </h1>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg">
                        RentNest is your trusted digital platform connecting tenants, landlords, and property managers seamlessly. We make finding, renting, and managing properties faster, safer, and completely hassle-free.
                    </p>
                    <div className="pt-4 flex justify-center gap-4">
                        <Link
                            href="/properties"
                            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl shadow-md transition-all"
                        >
                            Explore Properties <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
            <section className="py-20 px-4 max-w-6xl mx-auto">
                <div className="text-center space-y-3 mb-16">
                    <h2 className="text-3xl font-bold tracking-tight">Why Choose RentNest?</h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        We bring transparency, security, and advanced technology to the real estate market.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold">Verified Listings</h3>
                        <p className="text-muted-foreground text-sm">
                            Browse through thousands of thoroughly verified apartments, houses, and commercial spaces with complete peace of mind.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold">Secure Transactions</h3>
                        <p className="text-muted-foreground text-sm">
                            Our platform ensures top-tier security with role-based access control, safe digital payments, and trusted agreements.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Users2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold">Tenant & Landlord Friendly</h3>
                        <p className="text-muted-foreground text-sm">
                            Dedicated dashboards tailored separately for tenants, landlords, and administrators to streamline management.
                        </p>
                    </div>
                </div>
            </section>
            <section className="py-20 px-4 bg-muted/50 border-t border-b border-border">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our Mission & Vision</h2>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                            At RentNest, our mission is to eliminate the traditional complexities of renting a property. We aim to empower landlords with smart management tools while helping tenants find their dream homes with just a few clicks.
                        </p>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                            We envision a future where real estate transactions are completely transparent, automated, and accessible to everyone.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl bg-card border border-border shadow-inner space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="text-3xl font-bold text-primary">100+</div>
                            <div className="text-sm text-muted-foreground">Trusted Properties Listed Daily Across Regions</div>
                        </div>
                        <hr className="border-border" />
                        <div className="flex items-center gap-4">
                            <div className="text-3xl font-bold text-primary">99%</div>
                            <div className="text-sm text-muted-foreground">Customer Satisfaction & Successful Deals</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}