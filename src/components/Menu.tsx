import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import {House, GraduationCap, UsersRound, CircleUserRound, UserRoundPlus, NotebookTabs, BookCheck, School, Presentation, Megaphone, BookOpenCheck, Send, ClipboardCheck, CalendarDays, CalendarCheck, Cog, LogOut} from "lucide-react";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <House />,
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <GraduationCap />,
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: <UsersRound />,
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: <UserRoundPlus/>,
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: <NotebookTabs />,
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: <School />,
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: <Presentation />,
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: <BookCheck />,
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <BookOpenCheck />,
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <ClipboardCheck />,
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <CalendarCheck />,
        label: "Attendance",
        href: "",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <CalendarDays />,
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <Send />,
        label: "Messages",
        href: "",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <Megaphone />,
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: <CircleUserRound />,
        label: "Profile",
        href: "",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <Cog />,
        label: "Settings",
        href: "",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: <LogOut />,
        label: "Logout",
        href: "",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  return (
    <div className="mt-4 pr-2 text-sm max-h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-100 dark:scrollbar-thumb-gray-200 scrollbar-track-transparent min-w-[60px] pl-2 hidden sm:block">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>         
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 dark:text-white py-2 md:px-2 rounded-md hover:bg-skyLight dark:hover:bg-[#0D63A5] dark:hover:text-[#FFD717]"
                >
                  <div className="menu-icon">
                  {typeof item.icon === 'string' ? (
                    <Image src={item.icon} alt="" width={20} height={20}/>
                  ) : (
                    item.icon
                  )}
                  </div>
                    <span className="hidden lg:block truncate max-w-[120px]">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;