import type { Metadata } from "next";
import { Public_Sans, Merriweather } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const merriweatherHeading = Merriweather({subsets:['latin'],variable:'--font-heading'});
const publicSans = Public_Sans({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "RentNest - Find your nest",
  description: "fastest growing property rental platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", publicSans.variable, merriweatherHeading.variable)}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  );
}