import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { FaChartBar, FaWallet } from "react-icons/fa"; // Added icons for Dashboard and Transactions
import Dashboard from "./DashBoard";
import { useState } from "react";

export const Sidebar = () => {
  const [component, setComponent] = useState("");

  const handleClick = (componentName: string) => {
    setComponent(componentName);
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col items-center w-16 h-screen overflow-hidden text-gray-400 bg-gray-900 rounded">
        <a className="flex items-center justify-center mt-3" href="#">
          <HiOutlineHome className="w-8 h-8 text-gray-400" />
        </a>
        <div className="flex flex-col items-center mt-3 border-t border-gray-700">
          <a
            onClick={() => handleClick("Dashboard")}
            className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
          >
            <FaChartBar className="w-6 h-6 text-gray-400" />{" "}
            {/* Dashboard icon */}
          </a>
          <a
            onClick={() => handleClick("Transactions")}
            className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
          >
            <FaWallet className="w-6 h-6 text-gray-400" />{" "}
          </a>
        </div>
        <a
          className="flex items-center justify-center w-16 h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
          href="#"
        >
          <HiOutlineLogout className="w-6 h-6 text-gray-400" />
        </a>
      </div>
      <div className="w-full">
        {component === "Dashboard" && <Dashboard />}
        {component === "Transactions"}
      </div>
    </div>
  );
};
