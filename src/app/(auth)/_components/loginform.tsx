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
        <form action={action} className='flex flex-col gap-4 w-full'>
            <Card className='w-full p-5 space-y-4 border-none shadow-none'>
                <Input name="email" placeholder="Enter Your Email" type="email" required />
                <Input name="password" placeholder="Password" type="password" required />
                
                <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? (
                        <>
                            <Loader2 size={16} className="animate-spin mr-2" />
                            Logging in...
                        </>
                    ) : (
                        "Login"
                    )}
                </Button>

                {/* Register Redirect Link */}
                <div className='text-center text-sm text-muted-foreground pt-2'>
                    Didn&apos;t have an account?{' '}
                    <Link href="/register" className='text-primary font-medium hover:underline'>
                        Please register
                    </Link>
                </div>
            </Card>
        </form>
    )
}

export default LoginForm;