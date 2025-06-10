"use client";

import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Countchart = ({ boys, girls }: { boys: number; girls: number }) => {
  const { theme, systemTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    setIsDark(currentTheme === "dark");
  }, [theme, systemTheme]);

  const data = [
    {
      name: "Total",
      count: boys + girls,
      fill: isDark ? "#1F2937" : "white",
    },
    {
      name: "Girls",
      count: girls,
      fill: isDark ? "#FFD717" : "#FAE27C",
    },
    {
      name: "Boys",
      count: boys,
      fill: isDark ? "#0D63A5" : "#C3EBFA",
    },
  ];

  return (
    <div className="relative w-full h-[75%]">
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={32}
          data={data}
        >
          <RadialBar background={{ fill: isDark ? "#374151" : "#E5E7EB" }} dataKey="count"/>
        </RadialBarChart>
      </ResponsiveContainer>
      <Image
        src="/maleFemale.png"
        alt=""
        width={50}
        height={50}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default Countchart;
