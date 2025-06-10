"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "Jun",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Sep",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Oct",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Nov",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Dec",
    income: 3490,
    expense: 4300,
  },
];

const Financechart = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Finance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={isDark ? "#374151" : "#ddd"} 
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: isDark ? "#9ca3af" : "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis 
            axisLine={false} 
            tick={{ fill: isDark ? "#9ca3af" : "#d1d5db" }} 
            tickLine={false}  
            tickMargin={20}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "white",
              border: `1px solid ${isDark ? "#4b5563" : "#e5e7eb"}`,
              borderRadius: "8px",
              color: isDark ? "white" : "black"
            }}
          />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ 
              paddingTop: "10px", 
              paddingBottom: "30px",
              color: isDark ? "white" : "black"
            }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke={isDark ? "#FFD717" : "#C3EBFA"}
            strokeWidth={5}
          />
          <Line 
            type="monotone" 
            dataKey="expense" 
            stroke={isDark ? "#0D63A5" : "#CFCEFF"} 
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Financechart;