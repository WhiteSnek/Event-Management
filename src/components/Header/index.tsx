import React from "react";
import DownloadEventsCSV from "./Download";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-zinc-950  shadow-md px-6 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold text-white">Event Manager</h1>
        </div>
        <div>
          <DownloadEventsCSV />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
