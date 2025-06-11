import Formcontainer from "@/components/Formcontainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Tablesearch from "@/components/Tablesearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import Avvvatars from 'avvvatars-react'
import {Eye, Funnel, ArrowDownNarrowWide} from "lucide-react";

type StudentList = Student & { class: Class };

const Studentlistpage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student ID",
      accessor: "studentId",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: StudentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 dark:border-gray-600 even:bg-slate-50 dark:even:bg-gray-700 text-sm hover:bg-purpleLight dark:hover:bg-gray-600 text-gray-900 dark:text-white"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="bg-purple text-gray-500 dark:text-black dark:bg-[#FFD717] font-semibold grid place-items-center rounded-full h-9 w-9">
        <Avvvatars style="character" value={item.name + item.username} size={30} /></div>
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-400">{item.class.name}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">{item.class.name[0]}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-sky dark:bg-[#0ea5e9]">
              <Eye className="text-gray-500 dark:text-black" size={16} />
              </button>
          </Link>
          {role === "admin" && (
            <Formcontainer table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page) : 1;


  const query: Prisma.StudentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.class = {
              lessons: {
                some: {
                  teacherId: value,
                },
              },
            };
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.student.count({ where: query }),
  ]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold text-gray-900 dark:text-white">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <Tablesearch />
          <div className="flex items-center gap-4 self-end">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow dark:bg-[#FFD717]">
              <Funnel width={14} height={14} className="text-gray-500 dark:text-black"/>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow dark:bg-[#FFD717]">
              <ArrowDownNarrowWide width={14} height={14} className="text-gray-500 dark:text-black" />
            </button>
            {role === "admin" && (
              <Formcontainer table="student" type="create" />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default Studentlistpage