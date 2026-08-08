"use server"

import { cookies } from "next/headers";

export const getMe = async () => {

    const  cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        // throw new Error("User Not Logged In!");
        return {
           success: false,
              message: "User Not Logged In!"
        };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/me`, {
        method: "GET",
        headers: {
           Cookie: `accessToken=${accessToken}`,
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