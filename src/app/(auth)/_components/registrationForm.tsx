"use client"

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useActionState, useEffect, useState } from 'react'

import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { registerAction } from '../_actions/registerAction';

export function RegistrationForm() {
    const [selectedRole, setSelectedRole] = useState<'TENANT' | 'LANDLORD'>('TENANT');
    const [state, action, pending] = useActionState(registerAction, null);
    const router = useRouter();

    useEffect(() => {
        if (!state) return;
        if (state?.success) {
            toast.success(state.message || "Registration Successful!", {
                duration: 3000,
                position: "bottom-right",
            });
            router.push('/login');
        } else if (state?.message) {
            toast.error(state.message, {
                duration: 3000,
                position: "bottom-right",
            });
        }
    }, [state, router]);

    return (
        <form action={action} className='flex w-full flex-col'>
            <Card className='w-full space-y-4 border-none bg-transparent p-1 shadow-none'>
                
                {/* Role Switcher (Tenant / Landlord) */}
                <div className='space-y-1.5 px-1'>
                    <label className='text-xs font-semibold uppercase tracking-wider text-[#64736d]'>
                        Select Role
                    </label>
                    <div className='grid grid-cols-2 gap-2 p-1.5 bg-[#e9eee8] rounded-xl border border-[#d9ded7]'>
                        <button
                            type="button"
                            onClick={() => setSelectedRole('TENANT')}
                            className={`py-2.5 text-sm font-medium rounded-lg transition-all ${
                                selectedRole === 'TENANT' 
                                    ? 'bg-[#18352d] text-white shadow-sm' 
                                    : 'text-[#64736d] hover:text-[#18352d]'
                            }`}
                        >
                            Tenant
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedRole('LANDLORD')}
                            className={`py-2.5 text-sm font-medium rounded-lg transition-all ${
                                selectedRole === 'LANDLORD' 
                                    ? 'bg-[#18352d] text-white shadow-sm' 
                                    : 'text-[#64736d] hover:text-[#18352d]'
                            }`}
                        >
                            Landlord
                        </button>
                    </div>
                    <input type="hidden" name="role" value={selectedRole} />
                </div>

                <div className="space-y-2 px-1">
                    <label htmlFor="name" className="block text-sm font-medium text-[#18352d]">Full name</label>
                    <Input 
                        id="name" 
                        name="name" 
                        placeholder="John Doe" 
                        required 
                        className="h-12 rounded-xl border-[#d9ded7] bg-white px-4 text-[#18352d] shadow-none placeholder:text-[#9aa49e] focus-visible:ring-[#18352d] focus-visible:border-[#18352d]" 
                    />
                </div>

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
                    <label htmlFor="phone" className="block text-sm font-medium text-[#18352d]">Phone number</label>
                    <Input 
                        id="phone" 
                        name="phone" 
                        placeholder="+8801XXXXXXXXX" 
                        required 
                        className="h-12 rounded-xl border-[#d9ded7] bg-white px-4 text-[#18352d] shadow-none placeholder:text-[#9aa49e] focus-visible:ring-[#18352d] focus-visible:border-[#18352d]" 
                    />
                </div>

                <div className="space-y-2 px-1">
                    <label htmlFor="password" className="block text-sm font-medium text-[#18352d]">Password</label>
                    <Input 
                        id="password" 
                        name="password" 
                        placeholder="Create a strong password" 
                        type="password" 
                        required 
                        className="h-12 rounded-xl border-[#d9ded7] bg-white px-4 text-[#18352d] shadow-none placeholder:text-[#9aa49e] focus-visible:ring-[#18352d] focus-visible:border-[#18352d]" 
                    />
                </div>

                <div className="px-1 pt-2">
                    <Button 
                        type="submit" 
                        className="h-12 w-full rounded-xl bg-[#18352d] text-sm font-medium text-white shadow-[0_8px_20px_rgba(24,53,45,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#244b3f]" 
                        disabled={pending}
                    >
                        {pending ? (
                            <>
                                <Loader2 size={16} className="animate-spin mr-2" />
                                Registering...
                            </>
                        ) : (
                            `Register as ${selectedRole}`
                        )}
                    </Button>
                </div>

            </Card>
        </form>
    )
}

export default RegistrationForm;