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
        <form action={action} className='flex flex-col gap-4 w-full'>
            <Card className='w-full p-5 space-y-4 border-none shadow-none'>   
                {/* Role Switcher (Tenant / Landlord) */}
                <div className='space-y-1.5'>
                    <label className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                        Select Role
                    </label>
                    <div className='grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg'>
                        <button
                            type="button"
                            onClick={() => setSelectedRole('TENANT')}
                            className={`py-2 text-sm font-medium rounded-md transition-all ${
                                selectedRole === 'TENANT' 
                                    ? 'bg-background text-foreground shadow-sm' 
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Tenant
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedRole('LANDLORD')}
                            className={`py-2 text-sm font-medium rounded-md transition-all ${
                                selectedRole === 'LANDLORD' 
                                    ? 'bg-background text-foreground shadow-sm' 
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Landlord
                        </button>
                    </div>
                    {/* Hidden input to pass role value to server action */}
                    <input type="hidden" name="role" value={selectedRole} />
                </div>

                <Input name="name" placeholder="Full Name" required />
                <Input name="email" placeholder="Enter Your Email" type="email" required />
                <Input name="phone" placeholder="Phone Number" required />
                <Input name="password" placeholder="Password" type="password" required />

                <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? (
                        <>
                            <Loader2 size={16} className="animate-spin mr-2" />
                            Registering...
                        </>
                    ) : (
                        `Register as ${selectedRole}`
                    )}
                </Button>
            </Card>
        </form>
    )
}

export default RegistrationForm;