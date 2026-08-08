"use client"

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useActionState, useEffect } from 'react'
import { loginAction } from '../_actions/authactions';
import { toast } from 'sonner';
import Link from 'next/link';

function LoginForm() {
    const [state, action, pending] = useActionState(loginAction, false);

    useEffect(() => {
        if (!state) return;
        
        if (state?.success) {
            toast.success("Login Successful!", {
                duration: 3000,
                position: "bottom-right",
            });
            return;
        }

        toast.error(state.message, {
            duration: 3000,
            position: "bottom-right",
        });

    }, [state]);

    return (
        <form action={action} className='flex flex-col gap-4 w-full'>
            <Card className='w-full p-5 space-y-4 border-none shadow-none'>
                <Input name="email" placeholder="Enter Your Email" type="email" required />
                <Input name="password" placeholder="Password" type="password" required />
                
                <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? "Logging in..." : "Login"}
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

export default LoginForm