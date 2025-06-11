import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const Announcements = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    // where: {
    //   ...(role !== "admin" && {
    //     OR: [
    //       { classId: null },
    //       { class: roleConditions[role as keyof typeof roleConditions] || {} },
    //     ],
    //   }),
    // },
  });

  // Function to get alternating colors for both light and dark modes
  const getAnnouncementStyles = (index: number) => {
    const colorIndex = index % 3;
    
    const lightModeColors = [
      {
        background: "bg-skyLight",
        textColor: "text-gray-900",
        descriptionColor: "text-gray-600",
        dateBackground: "bg-white",
        dateTextColor: "text-gray-600"
      },
      {
        background: "bg-purpleLight", 
        textColor: "text-gray-900",
        descriptionColor: "text-gray-600",
        dateBackground: "bg-white",
        dateTextColor: "text-gray-600"
      },
      {
        background: "bg-yellowLight",
        textColor: "text-gray-900", 
        descriptionColor: "text-gray-600",
        dateBackground: "bg-white",
        dateTextColor: "text-gray-600"
      }
    ];

    const darkModeColors = [
      {
        background: "dark:bg-[#0D63A5]",
        textColor: "dark:text-white",
        descriptionColor: "dark:text-gray-200", 
        dateBackground: "dark:bg-white/20",
        dateTextColor: "dark:text-white"
      },
      {
        background: "dark:bg-[#FFD717]",
        textColor: "dark:text-black",
        descriptionColor: "dark:text-gray-700",
        dateBackground: "dark:bg-black/10", 
        dateTextColor: "dark:text-black"
      },
      {
        background: "dark:bg-[#0D63A5]", 
        textColor: "dark:text-white",
        descriptionColor: "dark:text-gray-200",
        dateBackground: "dark:bg-white/20",
        dateTextColor: "dark:text-white"
      }
    ];

    const lightColors = lightModeColors[colorIndex];
    const darkColors = darkModeColors[colorIndex];

    return {
      background: `${lightColors.background} ${darkColors.background}`,
      textColor: `${lightColors.textColor} ${darkColors.textColor}`,
      descriptionColor: `${lightColors.descriptionColor} ${darkColors.descriptionColor}`,
      dateBackground: `${lightColors.dateBackground} ${darkColors.dateBackground}`,
      dateTextColor: `${lightColors.dateTextColor} ${darkColors.dateTextColor}`
    };
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-md h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Announcements</h1>
        <Link className="text-xs text-gray-400 dark:text-gray-500" href="/announcements">View All</Link>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
        {data.map((announcement, index) => {
          const styles = getAnnouncementStyles(index);
          return (
            <div key={announcement.id} className={`${styles.background} rounded-md p-4`}>
              <div className="flex items-center justify-between">
                <h2 className={`font-medium ${styles.textColor}`}>{announcement.title}</h2>
                <span className={`text-xs ${styles.dateTextColor} ${styles.dateBackground} rounded-md px-2 py-1`}>
                  {new Intl.DateTimeFormat("en-GB").format(announcement.date)}
                </span>
              </div>
              <p className={`text-sm ${styles.descriptionColor} mt-1`}>{announcement.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;