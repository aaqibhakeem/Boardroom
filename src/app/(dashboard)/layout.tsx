import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex dark:bg-black">
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] pl-2 pt-4 hidden sm:block">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2 menu-item"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">Boardroom</span>
        </Link>
        <Menu />
      </div>
      <div className="w-[100%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-y-auto overflow-x-hidden flex flex-col dark:bg-black">
        <Navbar />
        {children}
      </div>
    </div>
  );
}