import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";

export default async function LandlordDashboardPage() {
    const user = await getMe();

    if (!user?.success || user.data?.role !== "LANDLORD") {
        redirect("/not-found"); 
    }

    return (
        <div>
            
            <h1>Welcome to Landlord Dashboard</h1>
        </div>
    );
}