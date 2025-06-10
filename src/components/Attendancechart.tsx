"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";

const Attendancechart = ({
  data,
}: {
  data: { name: string; present: number; absent: number }[];
}) => {
  const { theme, systemTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    setIsDark(currentTheme === "dark");
  }, [theme, systemTheme]);

  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart width={500} height={300} data={data} barSize={20}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          vertical={false} 
          stroke={isDark ? "#374151" : "#ddd"} 
        />
        <defs>
          <rect id="hoverBackground" />
        </defs>
        <XAxis
          dataKey="name"
          axisLine={false}
          tick={{ fill: isDark ? "#9ca3af" : "#d1d5db" }}
          tickLine={false}
        />
        <YAxis 
          axisLine={false} 
          tick={{ fill: isDark ? "#9ca3af" : "#d1d5db" }} 
          tickLine={false} 
        />
        <Tooltip
          contentStyle={{ 
            borderRadius: "10px", 
            borderColor: isDark ? "#4b5563" : "lightgray",
            backgroundColor: isDark ? "#1f2937" : "white",
            color: isDark ? "white" : "black"
          }}
          cursor={{ 
            fill: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
            stroke: "none"
          }}
        />
        <Legend
          align="left"
          verticalAlign="top"
          wrapperStyle={{ 
            paddingTop: "20px", 
            paddingBottom: "40px",
            color: isDark ? "white" : "black"
          }}
        />
        <Bar
          dataKey="present"
          fill={isDark ? "#FFD717" : "#FAE27C"}
          legendType="circle"
          radius={[10, 10, 0, 0]}
          activeBar={{ fill: isDark ? "#FFD717" : "#F4D03F" }}
        />
        <Bar
          dataKey="absent"
          fill={isDark ? "#0D63A5" : "#C3EBFA"}
          legendType="circle"
          radius={[10, 10, 0, 0]}
          activeBar={{ fill: isDark ? "#1E88E5" : "#85C1E9" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Attendancechart;