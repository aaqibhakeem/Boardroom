import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { ModeToggle } from "./Modetoggle";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="flex items-center justify-between p-4 dark:bg-black">
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 dark:ring-gray-600 px-2">
        <Image src="/search.png" alt="" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
      </div>
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-transparent rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNlbmQtaWNvbiBsdWNpZGUtc2VuZCI+PHBhdGggZD0iTTE0LjUzNiAyMS42ODZhLjUuNSAwIDAgMCAuOTM3LS4wMjRsNi41LTE5YS40OTYuNDk2IDAgMCAwLS42MzUtLjYzNWwtMTkgNi41YS41LjUgMCAwIDAtLjAyNC45MzdsNy45MyAzLjE4YTIgMiAwIDAgMSAxLjExMiAxLjExeiIvPjxwYXRoIGQ9Im0yMS44NTQgMi4xNDctMTAuOTQgMTAuOTM5Ii8+PC9zdmc+" alt="" width={20} height={20} className="dark:invert" />
        </div>
        <div className="bg-transparent rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1lZ2FwaG9uZS1pY29uIGx1Y2lkZS1tZWdhcGhvbmUiPjxwYXRoIGQ9Im0zIDExIDE4LTV2MTJMMyAxNHYtM3oiLz48cGF0aCBkPSJNMTEuNiAxNi44YTMgMyAwIDEgMS01LjgtMS42Ii8+PC9zdmc+" alt="" width={20} height={20} className="dark:invert" />
        </div>
        <ModeToggle />
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium text-gray-900 dark:text-white">John Doe</span>
          <span className="text-[10px] text-gray-500 dark:text-gray-400 text-right">
            {user?.publicMetadata?.role as string}
          </span>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;