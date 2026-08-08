"use server"

import { cookies } from "next/headers";

export const refreshToken = async () => {

    const  cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
        // throw new Error("User Not Logged In!");
        return {
           success: false,
              message: "Refresh Token Not Found!"
        };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/refresh`, {
        method: "GET",
        headers: {
           Cookie: `refreshToken=${refreshToken}`,
        },


        cache: "force-cache",
        next : {
            revalidate: 60 * 60 * 24, // Revalidate every 24 hours
            tags: ["My profile"],
        }

    });


    const result = await response.json();
    console.log("Get Me Response Result:", result);

return result;

}