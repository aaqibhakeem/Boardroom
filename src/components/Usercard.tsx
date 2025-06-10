import prisma from "@/lib/prisma";
import Image from "next/image";

const Usercard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const data = await modelMap[type].count();

  return (
    <div className="rounded-2xl odd:bg-purple odd:dark:bg-[#0D63A5] even:bg-yellow even:dark:bg-[#FFD717] even:dark:text-gray-700 odd:dark:text-gray-200 p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center ">
        <span className="text-[10px] bg-white dark:text-white dark:bg-gray-600 px-2 py-1 rounded-full">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-sm font-medium">{type}s</h2>
    </div>
  );
};

export default Usercard;