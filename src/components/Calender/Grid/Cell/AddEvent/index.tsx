import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component from ShadCN
import { Label } from "@/components/ui/label"; // Assuming you have a Label component from ShadCN
import { Textarea } from "@/components/ui/textarea";
import { useCalendar } from "@/context/DayProvider";

interface AddEventProps {
  day: number | string;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEvent: React.FC<AddEventProps> = ({ day, setIsDialogOpen }) => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const { currentMonthIndex } = useCalendar();
  const handleAddEvent = () => {
    // Validate the form fields
    if (!eventName || !startTime || !endTime) {
      setError("Event name and time are required.");
      return;
    }

    // Get the current date in the format "YYYY-MM-DD"
    const formattedDay = `2024-${
      currentMonthIndex + 1 > 9
        ? currentMonthIndex + 1
        : "0" + (currentMonthIndex + 1)
    }-${String(day).padStart(2, "0")}`;

    // Retrieve the events from local storage and update
    const storedEvents = localStorage.getItem("events");
    const eventsObj = storedEvents ? JSON.parse(storedEvents) : {};
    const eventsForDay = eventsObj[formattedDay] || [];

    // Convert the start and end times to Date objects for comparison
    const newEventStart = new Date(
      `2024-${
        currentMonthIndex + 1 > 9
          ? currentMonthIndex + 1
          : "0" + (currentMonthIndex + 1)
      }-${String(day).padStart(2, "0")}T${startTime}`
    );
    const newEventEnd = new Date(
      `2024-${
        currentMonthIndex + 1 > 9
          ? currentMonthIndex + 1
          : "0" + (currentMonthIndex + 1)
      }-${String(day).padStart(2, "0")}T${endTime}`
    );

    // Check for overlapping events
    for (const event of eventsForDay) {
      const existingEventStart = new Date(
        `2024-${
          currentMonthIndex + 1 > 9
            ? currentMonthIndex + 1
            : "0" + (currentMonthIndex + 1)
        }-${String(day).padStart(2, "0")}T${event.startTime}`
      );
      const existingEventEnd = new Date(
        `2024-${
          currentMonthIndex + 1 > 9
            ? currentMonthIndex + 1
            : "0" + (currentMonthIndex + 1)
        }-${String(day).padStart(2, "0")}T${event.endTime}`
      );

      // Check if the new event overlaps with any existing event
      if (
        newEventStart < existingEventEnd &&
        newEventEnd > existingEventStart
      ) {
        setError("The new event overlaps with an existing event.");
        return;
      }
    }

    // Add the new event
    const newEvent = {
      name: eventName,
      description: eventDescription,
      startTime,
      endTime,
    };

    eventsForDay.push(newEvent);
    eventsObj[formattedDay] = eventsForDay;

    // Save the updated events back to local storage
    localStorage.setItem("events", JSON.stringify(eventsObj));

    // Close the dialog and reset the form
    setIsDialogOpen(false);
    setEventName("");
    setEventDescription("");
    setStartTime("");
    setEndTime("");
    setError("");
  };

  return (
    <DialogContent className="bg-zinc-800 border-none text-white">
      <DialogHeader>
        <DialogTitle>
          Add Event for {`2024-12-${String(day).padStart(2, "0")}`}
        </DialogTitle>
        <DialogDescription>Please fill in the event details.</DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 gap-4">
        {/* Event Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="eventName" className="text-sm">
            Event Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="eventName"
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="p-2 border border-gray-700 rounded-md bg-zinc-800 text-gray-200"
          />
        </div>

        {/* Event Description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="eventDescription" className="text-sm">
            Event Description (Optional)
          </Label>
          <Textarea
            id="eventDescription"
            placeholder="Event Description (Optional)"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="p-2 border border-gray-700 rounded-md bg-zinc-800 text-gray-200"
          />
        </div>

        {/* Event Time */}
        <div className="flex gap-2">
          <div>
            <Label htmlFor="startTime" className="text-sm">
              Start Time <span className="text-red-500">*</span>
            </Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="p-2 border border-gray-700 rounded-md bg-zinc-800 text-gray-200"
            />
          </div>

          <div>
            <Label htmlFor="endTime" className="text-sm">
              End Time <span className="text-red-500">*</span>
            </Label>
            <Input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="p-2 border border-gray-700 rounded-md bg-zinc-800 text-gray-200"
            />
          </div>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button className="bg-zinc-900 hover:bg-zinc-950">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleAddEvent}
            className="bg-zinc-900 hover:bg-zinc-950"
          >
            Add Event
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default AddEvent;
