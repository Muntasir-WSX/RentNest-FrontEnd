import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";
import { getLandlordDashboardData } from "../_actions/landlordActions";
import LandlordDashboardContent from "./_components/LandlordDashboardContent";

export default async function LandlordDashboardPage() {
    const user = await getMe();

    if (!user?.success || user.data?.role !== "LANDLORD") {
        redirect("/not-found");
    }

    const data = await getLandlordDashboardData();

    return <LandlordDashboardContent data={data} />;
}