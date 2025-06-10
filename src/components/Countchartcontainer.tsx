import Image from "next/image";
import Countchart from "./Countchart";
import prisma from "@/lib/prisma";

const Countchartcontainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <Countchart boys={boys} girls={girls} />
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-sky dark:bg-[#0D63A5] rounded-full" />
          <h1 className="font-bold text-gray-900 dark:text-white">{boys}</h1>
          <h2 className="text-xs text-gray-300 dark:text-gray-400">
            Boys ({Math.round((boys / (boys + girls)) * 100)}%)
          </h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-yellow dark:bg-[#FFD717] rounded-full" />
          <h1 className="font-bold text-gray-900 dark:text-white">{girls}</h1>
          <h2 className="text-xs text-gray-300 dark:text-gray-400">
            Girls ({Math.round((girls / (boys + girls)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Countchartcontainer;