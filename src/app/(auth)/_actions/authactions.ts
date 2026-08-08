"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken"; 

type LoginState = {
    success: boolean;
    message: string;
    statuscode?: number;
    data: {
        user: any;
        accessToken: string;
        refreshToken?: string; 
    };
};

export const loginAction = async (prevState: LoginState, formData: FormData) => {
    console.log("Form Data Received:", formData);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const payload = {
        email,
        password,
    };

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
        return result; 
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
    let redirectTo = "/tenantdashboard"; 

    if (decodedToken?.role === "LANDLORD") {
        redirectTo = "/Landlord-Dashboard";
    } else if (decodedToken?.role === "ADMIN") {
        redirectTo = "/admin-dashboard";
    } else if (decodedToken?.role === "TENANT") {
        redirectTo = "/tenantdashboard";
    }

   
    redirect(redirectTo);
};

