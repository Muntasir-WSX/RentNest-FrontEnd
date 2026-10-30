"use client"

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useActionState, useEffect } from 'react'
import { loginAction } from '../_actions/authactions';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function LoginForm() {
    const [state, action, pending] = useActionState(loginAction, null);
    const router = useRouter();

    useEffect(() => {
        if (!state) return;
        
        if (state?.success) {
            toast.success(state.message || "Login Successful!", {
                duration: 3000,
                position: "bottom-right",
            });

            const role = state.data?.user?.role;
            if (role === "LANDLORD") {
                router.push('/Landlord-Dashboard');
            } else if (role === "ADMIN") {
                router.push('/admin-dashboard');
            } else {
                router.push('/tenantdashboard');
            }
            router.refresh();
            return;
        }

        toast.error(state.message || "Login failed!", {
            duration: 3000,
            position: "bottom-right",
        });

    }, [state, router]);

    return (
        <form action={action} className='flex w-full flex-col'>
            <Card className='w-full space-y-5 border-none bg-transparent p-2 shadow-none'>
                <div className="space-y-2 px-1">
                    <label htmlFor="email" className="block text-sm font-medium text-[#18352d]">Email address</label>
                    <Input 
                        id="email" 
                        name="email" 
                        placeholder="you@example.com" 
                        type="email" 
                        required 
                        className="h-12 rounded-xl border-[#d9ded7] bg-white px-4 text-[#18352d] shadow-none placeholder:text-[#9aa49e] focus-visible:ring-[#18352d] focus-visible:border-[#18352d]" 
                    />
                </div>
                <div className="space-y-2 px-1">
                    <label htmlFor="password" className="block text-sm font-medium text-[#18352d]">Password</label>
                    <Input 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        type="password" 
                        required 
                        className="h-12 rounded-xl border-[#d9ded7] bg-white px-4 text-[#18352d] shadow-none placeholder:text-[#9aa49e] focus-visible:ring-[#18352d] focus-visible:border-[#18352d]" 
                    />
                </div>
                <div className="px-1 pt-1">
                    <Button 
                        type="submit" 
                        className="h-12 w-full rounded-xl bg-[#18352d] text-sm font-medium text-white shadow-[0_8px_20px_rgba(24,53,45,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#244b3f]" 
                        disabled={pending}
                    >
                        {pending ? (
                            <>
                                <Loader2 size={16} className="animate-spin mr-2" />
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </div>

                {/* Register Redirect Link */}
                <div className='text-center text-sm text-[#64736d] pt-2 px-1'>
                    Didn&apos;t have an account?{' '}
                    <Link href="/register" className='text-[#18352d] font-semibold hover:underline'>
                        Please register
                    </Link>
                </div>
            </Card>
        </form>
    )
}

export default LoginForm;