import prisma from "@/lib/prisma";
import Bigcalendar from "./Bigcalendar";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const Bigcalendarcontainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });

  const data = dataRes.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="">
      <Bigcalendar data={schedule} />
    </div>
  );
};

export default Bigcalendarcontainer