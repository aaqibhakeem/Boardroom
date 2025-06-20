import prisma from "@/lib/prisma";

const Eventlist = async ({ dateParam }: { dateParam: string | undefined }) => {
  let data = [];
  
  if (dateParam) {
    // Parse the date string (YYYY-MM-DD format)
    const [year, month, day] = dateParam.split('-').map(Number);
    
    // Create start and end of day in local timezone
    const startOfDay = new Date(year, month - 1, day, 0, 0, 0, 0);
    const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);

    data = await prisma.event.findMany({
      where: {
        startTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  } else {
    // Show today's events by default
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

    data = await prisma.event.findMany({
      where: {
        startTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  }

  return data.map((event) => (
    <div
      className="p-5 rounded-md border-2 border-gray-100 dark:border-gray-600 border-t-4 odd:border-t-sky dark:odd:border-t-[#FFD717] even:border-t-purple dark:even:border-t-[#0D63A5] bg-white dark:bg-gray-700"
      key={event.id}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600 dark:text-gray-200">{event.title}</h1>
        <span className="text-gray-300 dark:text-gray-400 text-xs">
          {event.startTime.toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-2 text-gray-400 dark:text-gray-300 text-sm">{event.description}</p>
    </div>
  ));
};

export default Eventlist;