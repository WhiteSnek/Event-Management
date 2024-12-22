import React, { useState } from "react";
import { useCalendar } from "@/context/DayProvider";
import CalenderCell from "./Cell";
import WeekDays from "./Week";

const CalenderGrid: React.FC = () => {
  const { getDaysInCurrentMonth, getStartDay } = useCalendar();

  const startDay = getStartDay();
  const days = getDaysInCurrentMonth();
  const daysArray = Array.from({ length: days }, (_, i) => i + 1);

  const leadingEmptyDays = Array.from({ length: startDay }, () => null);
  const [selectedDay, setSelectedDay] = useState<number | string>(0)
  const allDays = [...leadingEmptyDays, ...daysArray];

  return (
    <div className="bg-zinc-800 rounded-b-lg shadow-lg">
      <WeekDays />
      <div className="grid grid-cols-7 gap-2 p-4">
        {allDays.map((day, index) =>
          day ? (
            <CalenderCell key={index} day={day} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          ) : (
            <div key={index} className="bg-transparent" />
          )
        )}
      </div>
    </div>
  );
};

export default CalenderGrid;
