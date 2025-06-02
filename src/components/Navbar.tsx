import Image from "next/image";

export const Navbar = () => {
    return (
        <div className="flex intem-center justify-between p-4">
            <div className="hidden md:flex items-center gap-2 text-sx rounded-full ring-[1.5px] ring-gray-300 px-2">
                <Image src="/search.png" alt="Search" width={14} height={14}/>
                <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none"/>
            </div>
            <div className="flex items-center gap-6 justify-end w-full">
                <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
                    <Image src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNlbmQtaWNvbiBsdWNpZGUtc2VuZCI+PHBhdGggZD0iTTE0LjUzNiAyMS42ODZhLjUuNSAwIDAgMCAuOTM3LS4wMjRsNi41LTE5YS40OTYuNDk2IDAgMCAwLS42MzUtLjYzNWwtMTkgNi41YS41LjUgMCAwIDAtLjAyNC45MzdsNy45MyAzLjE4YTIgMiAwIDAgMSAxLjExMiAxLjExeiIvPjxwYXRoIGQ9Im0yMS44NTQgMi4xNDctMTAuOTQgMTAuOTM5Ii8+PC9zdmc+" alt="Message" width={20} height={20}/>
                </div>
                <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
                    <Image src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1lZ2FwaG9uZS1pY29uIGx1Y2lkZS1tZWdhcGhvbmUiPjxwYXRoIGQ9Im0zIDExIDE4LTV2MTJMMyAxNHYtM3oiLz48cGF0aCBkPSJNMTEuNiAxNi44YTMgMyAwIDEgMS01LjgtMS42Ii8+PC9zdmc+" alt="Announcement" width={20} height={20}/>
                    <div className="absolute -top-3 -right-3 bg-purple-500 text-white w-5 h-5 flex items-center justify-center cursor-pointer rounded-full text-xs">1</div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs leading-3 font-medium">John Doe</span>
                    <span className="text-[10px] text-gray-500 text-right">Admin</span>
                </div>
                <Image src="/avatar.png" alt="Avatar" width={36} height={36} className="rounded-full cursor-pointer"/>
            </div>
        </div>
    )
}