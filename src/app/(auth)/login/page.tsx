import React from 'react'
import LoginForm from '../_components/loginform';

function LoginPage() {
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-6 rounded-lg bg-background p-8 text-foreground shadow-lg'>
        <div className='space-y-2 text-center'>
          <h1 className='text-4xl font-bold'>Login</h1>
          <p className='text-muted-foreground'>Welcome back! Please enter your details to login.</p>
        </div>
        
        {/* Form Container */}
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage