import { Navbar } from "@/components/ui/SharedComponents/navbar";
import Footer from "@/components/ui/SharedComponents/Footer";
import { getMe } from "@/service/getMe";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  return (
    <>
      <Navbar user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}