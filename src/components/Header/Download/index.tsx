import React from "react";
import { Button } from "@/components/ui/button";

const DownloadEventsCSV: React.FC = () => {
  const convertToCSV = (eventsObj: Record<string, any[]>) => {
    const header = ["Date", "Event Name", "Description", "Start Time", "End Time"];
    const rows: string[][] = [];


    for (const date in eventsObj) {
      if (eventsObj.hasOwnProperty(date)) {
        eventsObj[date].forEach((event) => {
          rows.push([
            date,
            event.name || "",
            event.description || "",
            event.startTime || "",
            event.endTime || "",
          ]);
        });
      }
    }


    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
    return csvContent;
  };

  const downloadCSV = () => {

    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      const eventsObj = JSON.parse(storedEvents);

      const csvContent = convertToCSV(eventsObj);

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      const link = document.createElement("a");
      if (link.download !== undefined) {
   
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "events.csv");

        link.click();

        URL.revokeObjectURL(url);
      }
    }
  };

  return (
    <Button onClick={downloadCSV} className="bg-red-600 hover:bg-red-700">
      Download Data
    </Button>
  );
};

export default DownloadEventsCSV;
