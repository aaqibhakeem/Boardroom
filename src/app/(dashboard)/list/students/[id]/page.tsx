import Announcements from "@/components/Announcements";
import Bigcalendarcontainer from "@/components/Bigcalendarcontainer";
import Formcontainer from "@/components/Formcontainer";
import Performance from "@/components/Performance";
import Studentattendancecard from "@/components/Studentattendancecard";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Class, Student } from "@prisma/client";
import Avvvatars from "avvvatars-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {Phone, Droplet, CalendarFold, Mail} from "lucide-react";

const Singlestudentpage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const student: (Student & {
    class: Class & { _count: { lessons: number } };
  }) | null = await prisma.student.findUnique({
    where: { id },
    include: {
      class: { include: { _count: { select: { lessons: true } } } },
    },
  });

  if (!student) return notFound();

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-sky dark:bg-slate-800 py-6 px-4 rounded-md flex-1 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-purple text-black dark:bg-[#FFD717] dark:text-black font-semibold grid place-items-center rounded-full h-[80px] w-[80px]">
                    <Avvvatars style="character" value={student.name} size={70} />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-2xl font-semibold dark:text-white">
                      {student.name} {student.surname}
                    </h1>
                    {role === "admin" && (
                      <Formcontainer table="student" type="update" data={student} />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-between text-xs font-medium">
                <div className="w-full md:w-1/2 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Droplet width={14} height={14} className="dark:text-white" />
                    <span className="dark:text-gray-200">{student.bloodType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarFold width={14} height={14} className="dark:text-white"/>
                    <span className="dark:text-gray-200">
                      {new Intl.DateTimeFormat("en-GB").format(student.birthday)}
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-2 overflow-hide">
                  <div className="flex items-center gap-2">
                    <Mail width={14} height={14} className="dark:text-white"/>
                    <span className="dark:text-gray-200">{student.email?.slice(0,-9) + '...' || "-"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone width={14} height={14} className="dark:text-white"/>
                    <span className="dark:text-gray-200">{student.phone || "-"}</span>
                  </div>
                </div>
              </div>
            </div>
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex gap-4 items-center">
              <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-full">
                <Image src="/singleAttendance.png" alt="" width={20} height={20} className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <Suspense fallback="Loading...">
                  <Studentattendancecard id={student.id} />
                </Suspense>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex gap-4 items-center">
              <div className="p-3 bg-purple-50 dark:bg-slate-700 rounded-full">
                <Image src="/singleBranch.png" alt="" width={20} height={20} className="w-5 h-5 text-purple-500 dark:text-purple-400" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold dark:text-white">{student.class.name.charAt(0)}th</h1>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Grade</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex gap-4 items-center">
              <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-full">
                <Image src="/singleLesson.png" alt="" width={20} height={20} className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold dark:text-white">{student.class._count.lessons}</h1>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Lessons</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex gap-4 items-center">
              <div className="p-3 bg-green-50 dark:bg-slate-700 rounded-full">
                <Image src="/singleClass.png" alt="" width={20} height={20} className="w-5 h-5 text-green-500 dark:text-green-400" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold dark:text-white">{student.class.name}</h1>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Class</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white dark:bg-slate-800 rounded-md p-4 h-[800px]">
          <h1 className="dark:text-white">Student&apos;s Schedule</h1>
          <Bigcalendarcontainer type="classId" id={student.class.id} />
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-md">
          <h1 className="text-xl font-semibold dark:text-white">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500 dark:text-gray-300">
            <Link className="p-3 rounded-md bg-skyLight dark:bg-[#180161] dark:text-[#FFD717]" href={`/list/lessons?classId=${student.class.id}`}>
              Student&apos;s Lessons
            </Link>
            <Link className="p-3 rounded-md bg-purpleLight dark:bg-[#3A1078] dark:text-[#CB9DF0]" href={`/list/students?classId=${student.class.id}`}>
              Student&apos;s students
            </Link>
            <Link className="p-3 rounded-md bg-pink-50 dark:bg-[#3A1078] dark:text-[#CB9DF0]" href={`/list/exams?classId=${student.class.id}`}>
              Student&apos;s Exams
            </Link>
            <Link className="p-3 rounded-md bg-skyLight dark:bg-[#180161] dark:text-[#FFD717]" href={`/list/assignments?classId=${student.class.id}`}>
              Student&apos;s Assignments
            </Link>
            <Link className="p-3 rounded-md bg-yellowLight dark:bg-[#180161] dark:text-[#FFD717]" href={`/list/results?studentId=${student.id}`}>
              Student&apos;s Results
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default Singlestudentpage;
