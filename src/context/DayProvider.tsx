import React, { createContext, useContext, useState } from 'react';

interface CalendarContextProps {
  months: string[];
  currentMonth: string;
  currentMonthIndex: number;
  setMonthIndex: (index: number) => void;
  setCurrentMonthIndex: React.Dispatch<React.SetStateAction<number>>;
  getStartDay: () => number;
  getDaysInCurrentMonth: () => number;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

const DayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 
    'November', 'December',
  ];

  const daysInMonth = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
  ];

  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);

  const currentMonth = months[currentMonthIndex];

  const setMonthIndex = (index: number) => {
    setCurrentMonthIndex(index);
  };

  // Function to calculate the starting day of the month
  const getStartDay = (): number => {
    // Assume the year starts on Sunday (0) for simplicity
    const startDay = 0; // Sunday
    const totalDaysBefore = daysInMonth.slice(0, currentMonthIndex).reduce((acc, days) => acc + days, 0);
    return (startDay + totalDaysBefore) % 7; // Return the starting day of the week (0-6)
  };

  const getDaysInCurrentMonth = (): number => {
    return daysInMonth[currentMonthIndex];
  }

  return (
    <CalendarContext.Provider value={{ 
      months, 
      currentMonth, 
      currentMonthIndex, 
      setMonthIndex, 
      setCurrentMonthIndex, 
      getStartDay,
      getDaysInCurrentMonth
    }}>
      {children}
    </CalendarContext.Provider>
  );
};

const useCalendar = (): CalendarContextProps => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a DayProvider');
  }
  return context;
};

export { DayProvider, useCalendar };
