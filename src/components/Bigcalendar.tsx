"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect, useRef } from "react";

const localizer = momentLocalizer(moment);

const Bigcalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  useEffect(() => {
    let isApplyingStyles = false;
    let currentTheme = '';

    const applyThemeStyles = () => {
      if (!calendarRef.current || isApplyingStyles) return;

      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? 'dark' : 'light';
      
      if (currentTheme === newTheme) return;
      
      isApplyingStyles = true;
      currentTheme = newTheme;
      
      const calendarContainer = calendarRef.current;
      
      const applyStyles = () => {
        // Base styles that apply to both themes
        const baseStyles = `
          /* Rounded borders for calendar container */
          .rbc-calendar {
            border-radius: 12px !important;
            overflow: hidden !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
          }
          
          /* Smooth transitions for theme changes */
          .rbc-calendar, .rbc-calendar * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
          }
          
          /* Rounded corners for events */
          .rbc-event {
            border-radius: 6px !important;
            padding: 6px 8px !important;
            font-size: 13px !important;
            font-weight: 500 !important;
            line-height: 1.3 !important;
            text-align: center !important;
            margin: 2px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            min-height: 36px !important;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
          }
          
          /* Event content styling */
          .rbc-event-content {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            height: 100% !important;
            width: 100% !important;
            text-align: center !important;
            white-space: normal !important;
            word-wrap: break-word !important;
            overflow: hidden !important;
          }
          
          /* Time slot styling */
          .rbc-time-slot {
            min-height: 60px !important;
          }
          
          .rbc-timeslot-group {
            min-height: 60px !important;
          }
          
          /* Header styling */
          .rbc-header {
            padding: 12px 8px !important;
            font-weight: 500 !important;
            border-bottom: none !important;
            border-right: none !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            font-size: 0.75rem !important;
          }
          
          /* Toolbar styling */
          .rbc-toolbar {
            padding: 16px !important;
            border-radius: 12px 12px 0 0 !important;
            margin-bottom: 0 !important;
          }
          
          .rbc-toolbar button {
            border-radius: 6px !important;
            padding: 8px 16px !important;
            font-weight: 500 !important;
            transition: all 0.2s ease !important;
            border: none !important;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
          }
          
          .rbc-toolbar button:hover {
            transform: translateY(-1px) !important;
          }
          
          /* Time gutter */
          .rbc-time-gutter {
            font-size: 0.8rem !important;
          }
          
          /* Today highlight */
          .rbc-today {
            background-color: rgba(59, 130, 246, 0.05) !important;
          }
          
          /* Month view styling */
          .rbc-month-view {
            border: none !important;
          }
          
          .rbc-month-row + .rbc-month-row {
            border-top: 1px solid !important;
          }
          
          .rbc-date-cell {
            padding: 8px !important;
            text-align: center !important;
          }
          
          .rbc-off-range-bg {
            opacity: 0.3 !important;
          }
          
          /* Agenda view styling */
          .rbc-agenda-view table.rbc-agenda-table {
            border: none !important;
          }
          
          .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
            padding: 12px !important;
            vertical-align: middle !important;
          }
          
          /* Time header styling */
          .rbc-time-header {
            border-bottom: none !important;
          }
          
          /* Current time indicator */
          .rbc-current-time-indicator {
            background-color: #3b82f6 !important;
            height: 2px !important;
          }
        `;

        const darkStyles = `
          /* Calendar container */
          .rbc-calendar {
            background-color: #1e293b !important;
            color: #f1f5f9 !important;
            border: 1px solid #334155 !important;
          }
          
          /* Headers */
          .rbc-header {
            background-color: #1e293b !important;
            color: #94a3b8 !important;
            border-color: #334155 !important;
          }
          
          /* Time slots and main content area */
          .rbc-time-slot {
            color: #94a3b8 !important;
            // border-color: #334155 !important;
            background-color: #1e293b !important;
          }
          
          /* Main time content area */
          .rbc-time-content {
            background-color: #1e293b !important;
            border-bottom: 1px solid #334155 !important;
          }
          
          /* Time view container */
          .rbc-time-view {
            background-color: #1e293b !important;
            border-color: #334155 !important;
          }
          
          /* Day slots */
          .rbc-day-slot {
            background-color: #1e293b !important;
          }
          
          /* All time slots */
          .rbc-time-slot, .rbc-timeslot-group {
            background-color: #1e293b !important;
            border-color: #334155 !important;
          }
          
          /* Time gutter (left side with times) */
          .rbc-time-gutter {
            background-color: #1e293b !important;
            color: #94a3b8 !important;
            border-right: 1px solid #334155 !important;
          }
          
          .rbc-timeslot-group {
            background-color: #1e293b !important;
            border-color: #334155 !important;
          }
          
          /* Toolbar */
          .rbc-toolbar {
            background-color: #1e293b !important;
            border-bottom: 1px solid #334155 !important;
          }
          
          .rbc-toolbar button {
            background-color: #334155 !important;
          }
          
          .rbc-toolbar button:hover {
            background-color: #475569 !important;
          }
          
          .rbc-toolbar button.rbc-active {
            background-color: #3b82f6 !important;
            color: white !important;
          }
          
          /* All row backgrounds */
          .rbc-row-bg {
            background-color: #1e293b !important;
          }
          
          /* Month view */
          .rbc-month-row {
            border-color: #334155 !important;
            background-color: #1e293b !important;
          }
          
          .rbc-row-bg + .rbc-row-bg {
            border-color: #334155 !important;
          }
          
          /* Date cells */
          .rbc-date-cell {
            background-color: #1e293b !important;
            color: #f1f5f9 !important;
          }
          
          /* Agenda view */
          .rbc-agenda-view {
            background-color: #1e293b !important;
          }
          
          .rbc-agenda-view table.rbc-agenda-table {
            background-color: #1e293b !important;
          }
          
          .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
            border-color: #334155 !important;
            background-color: #1e293b !important;
            color: #f1f5f9 !important;
          }
          
          /* Today highlight in dark mode */
          .rbc-today {
            background-color: rgba(59, 130, 246, 0.15) !important;
          }
        `;

        const lightStyles = `
          /* Calendar container */
          .rbc-calendar {
            background-color: white !important;
            color: #1e293b !important;
            border: 1px solid #e2e8f0 !important;
          }
          
          /* Headers */
          .rbc-header {
            background-color: white !important;
            color: #64748b !important;
            border-color: #e2e8f0 !important;
          }
          
          /* Time slots and main content area */
          .rbc-time-slot {
            color: #64748b !important;
            border-color: #e2e8f0 !important;
            background-color: white !important;
            border-bottom: 1px solid #e2e8f0 !important;
            border-right: 1px solid #e2e8f0 !important;
            border-top: none !important;
            border-left: none !important;
          }
          
          /* Main time content area */
          .rbc-time-content {
            background-color: white !important;
            border-color: #e2e8f0 !important;
            border-top: none !important;
          }
          
          /* Time view container */
          .rbc-time-view {
            background-color: white !important;
            border-color: #e2e8f0 !important;
            border-top: none !important;
          }
          
          /* Day slots */
          .rbc-day-slot {
            background-color: white !important;
            border-color: #e2e8f0 !important;
            border-bottom: 1px solid #e2e8f0 !important;
            border-right: 1px solid #e2e8f0 !important;
            border-top: none !important;
            border-left: none !important;
          }
          
          /* All time slots */
          .rbc-time-slot, .rbc-timeslot-group {
            background-color: white !important;
            border-color: #e2e8f0 !important;
            border-bottom: 1px solid #e2e8f0 !important;
            border-right: 1px solid #e2e8f0 !important;
            border-top: none !important;
            border-left: none !important;
          }
          
          /* Time gutter (left side with times) */
          .rbc-time-gutter {
            background-color: white !important;
            color: #64748b !important;
            border-color: #e2e8f0 !important;
            border-bottom: 1px solid #e2e8f0 !important;
            border-right: 1px solid #e2e8f0 !important;
            border-top: none !important;
            border-left: none !important;
          }
          
          .rbc-time-gutter .rbc-timeslot-group {
            background-color: white !important;
            border-color: #e2e8f0 !important;
            border-bottom: 1px solid #e2e8f0 !important;
            border-right: 1px solid #e2e8f0 !important;
            border-top: none !important;
            border-left: none !important;
          }
          
          /* Toolbar */
          .rbc-toolbar {
            background-color: white !important;
            border-bottom: 1px solid #e2e8f0 !important;
          }
          
          .rbc-toolbar button {
            background-color: #f8fafc !important;
            color: #334155 !important;
          }
          
          .rbc-toolbar button:hover {
            background-color: #f1f5f9 !important;
          }
          
          .rbc-toolbar button.rbc-active {
            background-color: #3b82f6 !important;
            color: white !important;
          }
          
          /* All row backgrounds */
          .rbc-row-bg {
            background-color: white !important;
          }
          
          /* Month view */
          .rbc-month-row {
            border-color: #e2e8f0 !important;
            background-color: white !important;
          }
          
          .rbc-row-bg + .rbc-row-bg {
            border-color: #e2e8f0 !important;
          }
          
          /* Date cells */
          .rbc-date-cell {
            background-color: white !important;
            color: #1e293b !important;
          }
          
          /* Agenda view */
          .rbc-agenda-view {
            background-color: white !important;
          }
          
          .rbc-agenda-view table.rbc-agenda-table {
            background-color: white !important;
          }
          
          .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
            border-color: #e2e8f0 !important;
            background-color: white !important;
            color: #1e293b !important;
          }
          
          /* Today highlight in light mode */
          .rbc-today {
            background-color: rgba(59, 130, 246, 0.05) !important;
          }
        `;

        // Remove existing custom styles
        const existingStyles = document.querySelectorAll('style[data-calendar-theme]');
        existingStyles.forEach(style => style.remove());
        
        // Create new style element
        const style = document.createElement('style');
        style.textContent = baseStyles + (isDark ? darkStyles : lightStyles);
        style.setAttribute('data-calendar-theme', 'true');
        document.head.appendChild(style);

        // Style events
        const events = calendarContainer.querySelectorAll('.rbc-event');
        events.forEach((event) => {
          const eventElement = event as HTMLElement;
          eventElement.style.backgroundColor = '#3b82f6';
          eventElement.style.color = 'white';
          eventElement.style.border = 'none';
          eventElement.style.boxShadow = isDark 
            ? '0 2px 4px rgba(0, 0, 0, 0.2)' 
            : '0 2px 4px rgba(59, 130, 246, 0.2)';
        });

        // Style current time indicator
        const currentTimeIndicator = calendarContainer.querySelector('.rbc-current-time-indicator');
        if (currentTimeIndicator) {
          (currentTimeIndicator as HTMLElement).style.boxShadow = '0 0 0 2px #3b82f6';
        }

        isApplyingStyles = false;
      };

      // Apply styles immediately and also after a short delay to catch late-rendered elements
      applyStyles();
      setTimeout(applyStyles, 50);
      setTimeout(applyStyles, 200);
    };

    // Initial application
    applyThemeStyles();

    let timeoutId: NodeJS.Timeout;
    const debouncedApply = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(applyThemeStyles, 100);
    };

    // Watch for DOM changes
    const observer = new MutationObserver((mutations) => {
      const hasAddedNodes = mutations.some(mutation => 
        mutation.type === 'childList' && mutation.addedNodes.length > 0
      );
      
      if (hasAddedNodes) {
        debouncedApply();
      }
    });

    if (calendarRef.current) {
      observer.observe(calendarRef.current, {
        childList: true,
        subtree: true
      });
    }

    // Watch for theme changes
    const darkModeObserver = new MutationObserver((mutations) => {
      const classChanged = mutations.some(mutation => 
        mutation.type === 'attributes' && 
        mutation.attributeName === 'class'
      );
      
      if (classChanged) {
        setTimeout(applyThemeStyles, 10);
      }
    });
    
    darkModeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      darkModeObserver.disconnect();
      // Clean up custom styles
      const customStyles = document.querySelectorAll('style[data-calendar-theme]');
      customStyles.forEach(style => style.remove());
    };
  }, [view]);

  return (
    <div 
      ref={calendarRef}
      className="h-full"
      style={{ minHeight: '600px' }}
    >
      <Calendar
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        views={["work_week", "day", "month", "agenda"]}
        view={view}
        style={{ height: "100%" }}
        onView={handleOnChangeView}
        min={new Date(2025, 1, 0, 8, 0, 0)}
        max={new Date(2025, 1, 0, 17, 0, 0)}
        step={60}
        timeslots={1}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '6px',
            border: 'none',
            fontSize: '13px',
            fontWeight: '500',
            textAlign: 'center',
            padding: '6px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '36px',
            margin: '2px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          }
        })}
        dayPropGetter={(date) => ({
          style: {
            backgroundColor: 'transparent',
          }
        })}
        slotPropGetter={(date) => ({
          style: {
            minHeight: '60px',
          }
        })}
      />
    </div>
  );
};

export default Bigcalendar;