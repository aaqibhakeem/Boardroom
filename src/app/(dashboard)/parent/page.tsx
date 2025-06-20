import Announcements from "@/components/Announcements";
import Bigcalendarcontainer from "@/components/Bigcalendarcontainer";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


const Parentpage = async () => {
  const { userId } = await auth();
  const currentUserId = userId;
  
  const students = await prisma.student.findMany({
    where: {
      parentId: currentUserId!,
    },
  });

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      <div className="">
        {students.map((student) => (
          <div className="w-full xl:w-2/3" key={student.id}>
            <div className="h-full bg-white p-4 rounded-md">
              <h1 className="text-xl font-semibold">
                Schedule ({student.name + " " + student.surname})
              </h1>
              <Bigcalendarcontainer type="classId" id={student.classId} />
            </div>
          </div>
        ))}
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default Parentpage