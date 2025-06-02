import Announcements from "@/components/Announcements";
import Attendancechart from "@/components/Attendancechart";
import Countchart from "@/components/Countchart";
import Eventcalendar from "@/components/Eventcalendar";
import Financechart from "@/components/Financechart";
import Usercard from "@/components/Usercard";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <Usercard type="student" />
          <Usercard type="teacher" />
          <Usercard type="parent" />
          <Usercard type="staff" />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <Countchart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <Attendancechart />
          </div>
        </div>
        <div className="w-full h-[500px]">
          <Financechart />
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <Eventcalendar />
        <Announcements/>
      </div>
    </div>
  );
};

export default AdminPage;