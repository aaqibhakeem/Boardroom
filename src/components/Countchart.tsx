"use client"
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import Image from 'next/image';


const data = [
  {
    name: 'Total',
    count: 1000,
    fill: 'white',
  },
  {
    name: 'Girls',
    count: 450,
    fill: '#FAE27C',
  },
  {
    name: 'Boys',
    count: 550,
    fill: '#C3EBFA',
  },
];

const Countchart = () => {

    return (
    <div className="bg-white rounded-xl w-full h-full p-4">
        <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Students</h1>
            <Image src="/moreDark.png" alt="MoreDark" width={20} height={20} className="" />
        </div>
        <div className="relative w-full h-[75%]">
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
                    <RadialBar background dataKey="count" />
                </RadialBarChart>
            </ResponsiveContainer>
            <Image src="/maleFemale.png" alt="MaleFemale" width={50} height={50} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
        </div>
        <div className="flex justify-center gap-16">
            <div className="flex flex-col gap-1">
                <div className="w-5 h-5 bg-sky rounded-full"/>
                <h1 className="font-bold">550</h1>
                <h2 className="text-xstext-gray-300">Boys (55%)</h2>
            </div>
            <div className="flex flex-col gap-1">
                <div className="w-5 h-5 bg-yellow rounded-full"/>
                <h1 className="font-bold">450</h1>
                <h2 className="text-xstext-gray-300">Girls (45%)</h2>
            </div>
        </div>
    </div>
    );
}

export default Countchart