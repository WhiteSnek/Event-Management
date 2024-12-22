import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent"; 
import { useCalendar } from "@/context/DayProvider";

interface CalenderCellProps {
  day: number | string;
  selectedDay: number | string;
  setSelectedDay: React.Dispatch<React.SetStateAction<number | string>>;
}

const CalenderCell: React.FC<CalenderCellProps> = ({
  day,
  selectedDay,
  setSelectedDay,
}) => {
  const [events, setEvents] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { currentMonthIndex } = useCalendar();
  const [today, setToday] = useState<boolean>(false);

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // Format the current day into "YYYY-MM-DD" format to match the stored event keys
    const formattedDay = `2024-${
      currentMonthIndex + 1 > 9
        ? currentMonthIndex + 1
        : "0" + (currentMonthIndex + 1)
    }-${String(day).padStart(2, "0")}`;
  
    // Check if the formatted day matches today's date to set the "today" state
    if (formattedDay === getCurrentDate()) {
      setToday(true);
    } else {
      setToday(false);
    }
  
    // Retrieve events from localStorage and filter for the current day
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      const eventsObj = JSON.parse(storedEvents);
      const eventsForDay = eventsObj[formattedDay] || [];
      setEvents(eventsForDay);
    }
  }, [day, currentMonthIndex]);
  
  const handleDeleteEvent = (eventToDelete: any) => {
    // Format the current day into "YYYY-MM-DD" format to match the stored event keys
    const formattedDay = `2024-${
      currentMonthIndex + 1 > 9
        ? currentMonthIndex + 1
        : "0" + (currentMonthIndex + 1)
    }-${String(day).padStart(2, "0")}`;
  
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      const eventsObj = JSON.parse(storedEvents);
      const eventsForDay = eventsObj[formattedDay] || [];
  
      // Filter out the event to be deleted by comparing its start time
      const updatedEvents = eventsForDay.filter(
        (event: any) => event.startTime !== eventToDelete.startTime
      );
  
      // If there are no events left for the day, remove the day from the events object
      if (updatedEvents.length > 0) {
        eventsObj[formattedDay] = updatedEvents;
      } else {
        delete eventsObj[formattedDay];
      }
  
      // Update the localStorage and state with the new events list
      localStorage.setItem("events", JSON.stringify(eventsObj));
      setEvents(updatedEvents);
    }
  };
  

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div
            className={`relative flex items-center justify-center border border-gray-700 ${
              today || selectedDay === day
                ? "bg-zinc-800 text-zinc-300"
                : "bg-zinc-300 text-zinc-800"
            }  rounded-md h-10 sm:h-20 cursor-pointer text-sm sm:text-lg`}
            onClick={() => setSelectedDay(day)}
            onMouseDown={(e) => e.preventDefault()}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setSelectedDay(0);
              }
            }}
            tabIndex={0}
          >
            {day}
            {events.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 sm:w-4 sm:h-4 bg-red-600 rounded-full"></span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-zinc-800 text-white p-4 rounded-md shadow-lg w-96">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div
                key={index}
                className="mb-2 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{event.name}</h3>
                  <p className="text-sm text-zinc-400">{event.description}</p>
                  <p className="text-sm text-gray-400">
                    {event.startTime} - {event.endTime}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-zinc-300 text-zinc-900 hover:bg-zinc-800 hover:text-zinc-200 hover:border border-white transition-all">
                        Edit Event
                      </Button>
                    </DialogTrigger>
                    <EditEvent
                      day={day}
                      setIsDialogOpen={setIsEditDialogOpen}
                      eventToEdit={event}
                    />
                  </Dialog>
                  <Button
                    onClick={() => handleDeleteEvent(event)}
                    className="bg-red-800 hover:bg-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="pb-3">
              <p>No events for this day</p>
            </div>
          )}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-zinc-300 text-zinc-900 hover:bg-zinc-800 hover:text-zinc-200 hover:border border-white transition-all">
                Add Event
              </Button>
            </DialogTrigger>
            <AddEvent day={day} setIsDialogOpen={setIsDialogOpen} />
          </Dialog>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CalenderCell;
