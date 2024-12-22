import React, { useState, useEffect } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label"; 
import { Textarea } from "@/components/ui/textarea";
import { useCalendar } from "@/context/DayProvider";

interface EditEventProps {
  day: number | string;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  eventToEdit: {
    name: string;
    description: string;
    startTime: string;
    endTime: string;
  } | null;
}

const EditEvent: React.FC<EditEventProps> = ({
  day,
  setIsDialogOpen,
  eventToEdit,
}) => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const { currentMonthIndex } = useCalendar();

  // Pre-fill the form if an event is being edited
  useEffect(() => {
    if (eventToEdit) {
      setEventName(eventToEdit.name);
      setEventDescription(eventToEdit.description);
      setStartTime(eventToEdit.startTime);
      setEndTime(eventToEdit.endTime);
    }
  }, [eventToEdit]);

  const handleEditEvent = () => {
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

    // Retrieve the events from local storage
    const storedEvents = localStorage.getItem("events");
    const eventsObj = storedEvents ? JSON.parse(storedEvents) : {};
    const eventsForDay = eventsObj[formattedDay] || [];

    // Find the event to update
    const eventIndex = eventsForDay.findIndex(
      (event:any) => event.name === eventToEdit?.name && event.startTime === eventToEdit?.startTime
    );

    if (eventIndex === -1) {
      setError("Event not found.");
      return;
    }

    // Update the event
    const updatedEvent = {
      name: eventName,
      description: eventDescription,
      startTime,
      endTime,
    };

    eventsForDay[eventIndex] = updatedEvent;
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
          Edit Event for {`2024-12-${String(day).padStart(2, "0")}`}
        </DialogTitle>
        <DialogDescription>Please edit the event details.</DialogDescription>
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
            onClick={handleEditEvent}
            className="bg-zinc-900 hover:bg-zinc-950"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default EditEvent;
