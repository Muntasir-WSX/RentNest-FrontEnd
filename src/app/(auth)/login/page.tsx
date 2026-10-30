import React from 'react'
import LoginForm from '../_components/loginform'
import Logo from '@/components/ui/SharedComponents/logo/logo';

const heroImage = 'https://res.cloudinary.com/dnk0bvpym/image/upload/v1793379946/landlordTenant3_kk0cdp.jpg'

function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f4f1eb] p-3 text-[#18352d] sm:p-5 lg:p-8 flex items-center justify-center">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] w-full max-w-7xl overflow-hidden rounded-[2rem] bg-[#fbfaf7] shadow-[0_24px_80px_rgba(24,53,45,0.16)] sm:min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-5rem)] md:grid-cols-[1fr_0.92fr] lg:grid-cols-[1.05fr_0.95fr]">
        
        {/* Left Hero Section */}
        <section
          aria-label="Rental living"
          className="relative min-h-[18rem] overflow-hidden bg-[#18352d] bg-cover bg-center p-6 sm:min-h-[24rem] sm:p-10 lg:min-h-full lg:p-12 flex flex-col justify-between"
          style={{ backgroundImage: `linear-gradient(145deg, rgba(13,38,31,.22), rgba(13,38,31,.8)), url(${heroImage})` }}
        >
          <div className="relative z-10 flex h-full flex-col justify-between gap-16 text-white">
            <div className="flex items-center justify-between">
              <Logo />
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur-md">
                Find your place
              </span>
            </div>
            <div className="max-w-md">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#e4c98b]">A better way to rent</p>
              <h2 className="max-w-sm text-4xl font-medium leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl text-white">
                Come home to somewhere you love.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-6 text-white/75 sm:text-base">
                Discover thoughtful homes, trusted landlords, and a rental experience made around you.
              </p>
            </div>
          </div>
        </section>

        {/* Right Form Section - Perfectly Centered & Aligned */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-12 sm:py-16 lg:px-20 bg-[#fbfaf7]">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#aa8442]">Welcome back</p>
              <h1 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl text-[#18352d]">Sign in to your account</h1>
              <p className="mt-3 text-sm leading-6 text-[#64736d]">Manage your homes, requests, and rental journey in one place.</p>
            </div>
            <LoginForm />
          </div>
        </section>

      </div>
    </main>
  )
}

export default LoginPage