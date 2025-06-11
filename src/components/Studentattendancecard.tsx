import prisma from "@/lib/prisma";

const Studentattendancecard = async ({ id }: { id: string }) => {
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: id,
      date: {
        gte: new Date(new Date().getFullYear(), 0, 1),
      },
    },
  });

  const totalDays = attendance.length;
  const presentDays = attendance.filter((day) => day.present).length;
  const percentage = (presentDays / totalDays) * 100;
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold dark:text-white">{percentage || "-"}%</h1>
      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium truncate">Attendance</span>
    </div>
  );
};

export default Studentattendancecard