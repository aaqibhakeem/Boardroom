"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Eventcalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Ensure component only renders on client to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value.toISOString()}`);
    }
  }, [value, router]);

  // Don't render calendar until client-side to avoid hydration issues
  if (!isClient) {
    return <div className="h-64 w-full bg-gray-100 animate-pulse rounded" />;
  }

  return (
    <Calendar 
      onChange={onChange} 
      value={value}
      locale="en-US"
      formatLongDate={(locale: string | undefined, date: Date) => 
        date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      }
    />
  );
};

export default Eventcalendar;