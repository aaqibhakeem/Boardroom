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

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (value instanceof Date) {
      // Use local date string to avoid timezone conversion
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, '0');
      const day = String(value.getDate()).padStart(2, '0');
      const localDateString = `${year}-${month}-${day}`;
      router.push(`?date=${localDateString}`);
    }
  }, [value, router]);

  if (!isClient) {
    return <div className="h-[400px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl" />;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <style jsx global>{`
        :root {
          --yellowLight: #FEF3C7;
          --skyLight: #BAE6FD;
          --purpleLight: #CFCEFF;
        }
        
        :not(.dark) .react-calendar__tile--now {
          background-color: #CFCEFF !important;
          color: #6366f1 !important;
        }

        .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none !important;
        }

        .dark .react-calendar {
          background-color: rgb(15 23 42) !important;
          color: rgb(226 232 240) !important;
          border: none !important;
        }

        .dark .react-calendar__navigation {
          background-color: rgb(15 23 42) !important;
          border-bottom: 1px solid rgb(51 65 85) !important;
        }

        .dark .react-calendar__navigation__label,
        .dark .react-calendar__navigation__arrow {
          background-color: transparent !important;
          color: rgb(226 232 240) !important;
        }

        .dark .react-calendar__month-view__weekdays__weekday {
          color: rgb(148 163 184) !important;
        }

        .dark .react-calendar__month-view__days {
          background-color: rgb(15 23 42) !important;
        }

        .dark .react-calendar__tile {
          background-color: transparent !important;
          color: rgb(226 232 240) !important;
        }

        .dark .react-calendar__tile:hover {
          background-color: rgba(255, 215, 23, 0.2) !important;
        }

        :not(.dark) .react-calendar__tile:hover {
          background-color: rgba(255, 215, 23, 0.2) !important;
        }

        .dark .react-calendar__tile--now {
          background-color: rgba(255, 215, 23, 0.3) !important;
          color: rgb(255, 215, 23) !important;
        }

        .dark .react-calendar__tile--active {
          background-color: rgb(13, 99, 165) !important;
          color: white !important;
        }

        .dark .react-calendar__tile--neighboringMonth {
          color: rgb(100 116 139) !important;
        }

        :not(.dark) .react-calendar__navigation {
          background-color: white !important;
          background: var(--purpleLight) !important;
        }

        :not(.dark) .react-calendar__navigation__label,
        :not(.dark) .react-calendar__navigation__arrow,
        :not(.dark) .react-calendar__navigation__prev-button,
        :not(.dark) .react-calendar__navigation__next-button {
          background-color: white !important;
          background: var(--purpleLight) !important;
        }

        .dark .react-calendar {
          background-color: rgb(15 23 42) !important;
          color: rgb(226 232 240) !important;
          border: none !important;
        }

        .dark .react-calendar__navigation {
          background-color: rgb(15 23 42) !important;
          background: rgb(15 23 42) !important;
          border-bottom: none !important;
        }

        .dark .react-calendar__navigation__label,
        .dark .react-calendar__navigation__arrow,
        .dark .react-calendar__navigation__prev-button,
        .dark .react-calendar__navigation__next-button {
          background-color: rgb(15 23 42) !important;
          background: rgb(15 23 42) !important;
        }
      `}</style>
      
      <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border-2 border-[#CFCEFF] dark:border-transparent">
        <Calendar 
          onChange={onChange} 
          value={value}
          locale="en-US"
          minDetail="month"
          next2Label={null}
          prev2Label={null}
          formatShortWeekday={(locale: string | undefined, date: Date) => {
            const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            return days[date.getDay()];
          }}
          formatLongDate={(locale: string | undefined, date: Date) => 
            date.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })
          }
          tileClassName={({ date, view }) => {
            if (view === 'month' && (date.getDay() === 0 || date.getDay() === 6)) {
              return '!text-red-400 dark:!text-red-400';
            }
            return '';
          }}
          className="w-full border-0"
        />
      </div>
    </div>
  );
};

export default Eventcalendar;