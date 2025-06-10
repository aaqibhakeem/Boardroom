import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/Attendancechartcontainer";
import CountChartContainer from "@/components/Countchartcontainer";
import EventCalendarContainer from "@/components/Eventcalendarcontainer";
import FinanceChart from "@/components/Financechart";
import UserCard from "@/components/Usercard";

const Adminpage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={resolvedSearchParams} />
        <div className="h-[457px]">
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default Adminpage;