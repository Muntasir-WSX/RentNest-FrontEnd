'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-card border-t border-border text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="inline-flex flex-col items-start gap-0.5 py-2">
                            <Image 
                                src="/assets/logo.png" 
                                alt="RentNest Logo" 
                                width={130} 
                                height={42} 
                                className="object-contain h-10 w-auto"
                            />
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mt-0.5">
                                Find your nest
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                            RentNest is your trusted platform to discover verified properties, connect directly with trusted landlords, and experience seamless, secure rental management.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                                <FaFacebookF size={15} />
                            </a>
                            <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                                <FaTwitter size={15} />
                            </a>
                            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                                <FaInstagram size={15} />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                                <FaLinkedinIn size={15} />
                            </a>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties" className="text-muted-foreground hover:text-primary transition-colors">
                                    Featured Properties
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties" className="text-muted-foreground hover:text-primary transition-colors">
                                    Browse Locations
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                            Service Areas
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/properties?city=dhaka" className="text-muted-foreground hover:text-primary transition-colors">
                                    Dhaka Rentals
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties?city=chittagong" className="text-muted-foreground hover:text-primary transition-colors">
                                    Chittagong Rentals
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties?city=sylhet" className="text-muted-foreground hover:text-primary transition-colors">
                                    Sylhet Rentals
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* কলাম ৪: কন্টাক্ট ইনফো */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                            Contact Us
                        </h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2.5">
                                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                                <span>Chittagong, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone size={18} className="text-primary shrink-0" />
                                <span>+880 1234 567890</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail size={18} className="text-primary shrink-0" />
                                <span>support@rentnest.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* কপিরাইট বটম বার */}
                <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
                    <p>&copy; {new Date().getFullYear()} RentNest. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}