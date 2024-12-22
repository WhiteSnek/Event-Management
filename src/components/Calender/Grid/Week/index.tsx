import React from 'react';

const WeekDays: React.FC = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 gap-4 p-2 bg-zinc-900 text-gray-200">
      {daysOfWeek.map((day) => (
        <div 
          key={day} 
          className="flex items-center justify-center font-semibold text-sm"
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default WeekDays;
