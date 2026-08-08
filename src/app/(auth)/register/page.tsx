import React from 'react'

import Link from 'next/link';
import { RegistrationForm } from '../_components/registrationForm';

function RegistrationPage() {
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-6 rounded-lg bg-background p-8 text-foreground shadow-lg border border-border'>
        <div className='space-y-2 text-center'>
          <h1 className='text-4xl font-bold'>Create Account</h1>
          <p className='text-muted-foreground'>Join RentNest as a Tenant or Landlord to get started.</p>
        </div>
        
        {/* Form Container */}
        <div>
          <RegistrationForm />
        </div>

        <div className='text-center text-sm text-muted-foreground'>
          Already have an account?{' '}
          <Link href="/login" className='text-primary font-medium hover:underline'>
            Login here
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage