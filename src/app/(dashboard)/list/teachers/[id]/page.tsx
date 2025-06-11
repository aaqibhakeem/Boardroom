import Announcements from "@/components/Announcements";
import Bigcalendarcontainer from "@/components/Bigcalendarcontainer";
import Formcontainer from "@/components/Formcontainer";
import Performance from "@/components/Performance";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Teacher } from "@prisma/client";
import Avvvatars from "avvvatars-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {Phone, Droplet, CalendarFold, Mail} from "lucide-react";

const Singleteacherpage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const teacher:
    | (Teacher & {
        _count: { subjects: number; lessons: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });

  if (!teacher) {
    return notFound();
  }
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
        <div className="bg-sky dark:bg-slate-800 py-6 px-4 rounded-md flex-1 flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="bg-purple text-black dark:bg-[#FFD717] dark:text-black font-semibold grid place-items-center rounded-full h-[80px] w-[80px]">
                <Avvvatars style="character" value={teacher.name} size={70} />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl font-semibold dark:text-white">
                  {teacher.name} {teacher.surname}
                </h1>
                {role === "admin" && (
                  <Formcontainer table="teacher" type="update" data={teacher} />
                )}
              </div>
              <p className="text-[12px] sm:text-sm text-gray-500 dark:text-gray-300">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-between text-xs font-medium">
            <div className="w-1/2 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Droplet width={14} height={14} className="dark:text-white text-slate-600" />
                <span className="dark:text-gray-200">{teacher.bloodType}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarFold width={14} height={14} className="dark:text-white text-slate-600"/>
                <span className="dark:text-gray-200">
                  {new Intl.DateTimeFormat("en-GB").format(teacher.birthday)}
                </span>
              </div>
            </div>

            <div className="w-1/2 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Mail width={14} height={14} className="dark:text-white text-slate-600 flex-shrink-0"/>
                <span className="dark:text-gray-200 truncate">{teacher.email || "-"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone width={14} height={14} className="dark:text-white text-slate-600 min-w-0"/>
                <span className="dark:text-gray-200 truncate">{teacher.phone || "-"}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex gap-4 items-center">
            <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-full flex-shrink-0">
              <Image
                src="/singleAttendance.png"
                alt="Attendance"
                width={20}
                height={20}
                className="w-5 sm:w-4 h-5 sm:h-4 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold dark:text-white truncate">90%</h1>  
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">Attendance</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex gap-4 items-center">
            <div className="p-3 bg-purple-50 dark:bg-slate-700 rounded-full flex-shrink-0">
              <Image
                src="/singleBranch.png"
                alt="Branches"
                width={20}
                height={20}
                className="w-5 sm:w-4 h-5 sm:h-4 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold dark:text-white truncate">
                {teacher._count.subjects}
              </h1>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">Branches</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex gap-4 items-center">
            <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-full flex-shrink-0">
              <Image
                src="/singleLesson.png"
                alt="Lessons"
                width={20}
                height={20}
                className="w-5 sm:w-4 h-5 sm:h-4 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold dark:text-white truncate">
                {teacher._count.lessons}
              </h1>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">Lessons</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex gap-4 items-center">
            <div className="p-3 bg-green-50 dark:bg-slate-700 rounded-full flex-shrink-0">
              <Image
                src="/singleClass.png"
                alt="Classes"
                width={20}
                height={20}
                className="w-5 sm:w-4 h-5 sm:h-4 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold dark:text-white truncate">
                {teacher._count.classes}
              </h1>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">Classes</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-white dark:bg-slate-800 rounded-md p-4 h-[800px]">
        <h1 className="dark:text-white">Teacher&apos;s Schedule</h1>
        <Bigcalendarcontainer type="teacherId" id={teacher.id} />
      </div>
    </div>
    
    <div className="w-full xl:w-1/3 flex flex-col gap-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-md">
        <h1 className="text-xl font-semibold dark:text-white">Shortcuts</h1>
        <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500 dark:text-gray-300">
          <Link
            className="p-3 rounded-md bg-skyLight dark:bg-[#180161] dark:text-[#FFD717]"
            href={`/list/classes?supervisorId=${teacher.id}`}
          >
            Teacher&apos;s Classes
          </Link>
          <Link
            className="p-3 rounded-md bg-purpleLight dark:bg-[#3A1078] dark:text-[#CB9DF0]"
            href={`/list/students?teacherId=${teacher.id}`}
          >
            Teacher&apos;s Students
          </Link>
          <Link
            className="p-3 rounded-md bg-yellowLight dark:bg-[#3A1078] dark:text-[#CB9DF0]"
            href={`/list/lessons?teacherId=${teacher.id}`}
          >
            Teacher&apos;s Lessons
          </Link>
          <Link
            className="p-3 rounded-md bg-pink-50 dark:bg-[#180161] dark:text-[#FFD717]"
            href={`/list/exams?teacherId=${teacher.id}`}
          >
            Teacher&apos;s Exams
          </Link>
          <Link
            className="p-3 rounded-md bg-skyLight dark:bg-[#180161] dark:text-[#FFD717]"
            href={`/list/assignments?teacherId=${teacher.id}`}
          >
            Teacher&apos;s Assignments
          </Link>
        </div>
      </div>
      <Performance />
      <div className="h-[420px]">
        <Announcements />
      </div>
    </div>
  </div>
  );
};

export default Singleteacherpage;