import React from 'react';
import { Button } from "@/components/ui/button";
import { useCalendar } from "@/context/DayProvider"; // Adjust the path based on your project structure

const Header: React.FC = () => {
  const { months, currentMonth, setCurrentMonthIndex} = useCalendar();

  const handlePrevious = () => {
    setCurrentMonthIndex(prevIndex =>
      prevIndex === 0 ? months.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentMonthIndex(prevIndex =>
      prevIndex === months.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="grid grid-cols-3 items-center gap-4 p-6 bg-zinc-300  rounded-t-lg shadow-lg">
      <Button 
        variant="outline" 
        onClick={handlePrevious} 
        className="justify-self-start px-4 py-2 bg-zinc-800 hover:bg-zinc-900 hover:border-none text-zinc-200 hover:text-zinc-100"
      >
        Previous
      </Button>
      <h1 className="text-2xl font-semibold text-center text-zinc-800">
        {currentMonth}
      </h1>
      <Button 
        variant="outline" 
        onClick={handleNext} 
        className="justify-self-end px-4 py-2 bg-zinc-800 hover:bg-zinc-900 hover:border-none text-zinc-200 hover:text-zinc-100"
      >
        Next
      </Button>
    </div>
  );
};

export default Header;
