"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken"; 

type LoginState = {
    success: boolean;
    message: string;
    statuscode?: number;
    data?: {
        user: any;
        accessToken: string;
        refreshToken?: string; 
    };
} | null; 

export const loginAction = async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
    console.log("Form Data Received:", formData);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const payload = {
        email,
        password,
    };

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...payload }),
        });

        const result = await response.json();
        console.log("Login Response Result:", result);

        if (!result.success) {
            return {
                success: false,
                message: result.message || "Login failed!",
                statuscode: result.statuscode || response.status
            }; 
        }

        const cookieStore = await cookies();

        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
        });

        if (result.data.refreshToken) {
            cookieStore.set("refreshToken", result.data.refreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
            });
        } 

        const decodedToken: any = jwt.decode(result.data.accessToken) as JwtPayload;

        return {
            success: true,
            message: result.message || "Login successful!",
            data: {
                ...result.data,
                user: {
                    ...result.data.user,
                    role: decodedToken?.role
                }
            }
        };

    } catch (error: any) {
        console.error("Login Action Error:", error);
        return {
            success: false,
            message: error.message || "Something went wrong during login!"
        };
    }
};