import React from "react";
import { Button } from "@/components/ui/button";

const DownloadEventsCSV: React.FC = () => {
  const convertToCSV = (eventsObj: Record<string, any[]>) => {
    const header = ["Date", "Event Name", "Description", "Start Time", "End Time"];
    const rows: string[][] = [];

    // Loop through the events object to extract each event's details
    for (const date in eventsObj) {
      if (eventsObj.hasOwnProperty(date)) {
        eventsObj[date].forEach((event) => {
          // Push event details into rows in the format expected for CSV
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

    // Combine the header and rows into a single CSV string
    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
    return csvContent;
  };

  const downloadCSV = () => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      const eventsObj = JSON.parse(storedEvents);
      const csvContent = convertToCSV(eventsObj);

      // Create a Blob object containing the CSV data
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      // Create a temporary anchor element to trigger the file download
      const link = document.createElement("a");
      if (link.download !== undefined) {
        // Generate a temporary URL for the Blob
        const url = URL.createObjectURL(blob);

        // Set the download attribute with the desired file name
        link.setAttribute("href", url);
        link.setAttribute("download", "events.csv");

        // Programmatically click the link to start the download
        link.click();

        // Revoke the temporary URL to free up memory
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
