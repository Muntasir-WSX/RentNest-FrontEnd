import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans, Merriweather } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Navbar } from "@/components/ui/SharedComponents/navbar";
import { getMe } from "@/service/getMe";
import Footer from "@/components/ui/SharedComponents/Footer";

const merriweatherHeading = Merriweather({subsets:['latin'],variable:'--font-heading'});

const publicSans = Public_Sans({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "RentMy Property ",
  description: "fastest growing property rental platform",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

const user = await getMe();


  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", publicSans.variable, merriweatherHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        {/* Navbar ekhon thik bhabe body er bhitore children er upore thakbe */}
        <Navbar user={user} />

        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              background: 'var(--card)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
            },
            className: 'shadow-lg rounded-xl',
          }}
        />
        
        <main className="flex-1">
          {children}
        </main>

       <Footer></Footer>
      </body>
    </html>
  );
}