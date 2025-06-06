import Image from "next/image";
import Eventcalendar from "./Eventcalendar";
import Eventlist from "./Eventlist";

const Eventcalendarcontainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { date } = await searchParams;
  return (
    <div className="bg-white p-4 rounded-md">
      <Eventcalendar />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        <Eventlist dateParam={date} />
      </div>
    </div>
  );
};

export default Eventcalendarcontainer