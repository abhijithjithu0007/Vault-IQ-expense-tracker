import { useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";

import { Alltransaction } from "@/pages/all-transaction";
import Dashboard from "../pages/DashBoard";
import { SetNotification } from "./set-notification";
import { Profile } from "../pages/profile";

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  return (
    <div className="flex w-full gap-5 p-3">
      <aside className="flex flex-col rounded-xl w-64 h-screen px-5 py-8 overflow-y-auto bg-gradient-to-br from-[#931be3] to-indigo-600 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <a href="#">
          <img
            className="w-auto h-7"
            src="https://merakiui.com/images/logo.svg"
            alt="Logo"
          />
        </a>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="-mx-3 space-y-6">
            <div className="space-y-3">
              <button
                className={`flex items-center w-full px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
                  activeComponent === "dashboard"
                    ? "bg-gray-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                }`}
                onClick={() => setActiveComponent("dashboard")}
              >
                <RiDashboard3Line size={25} />
                <span className="mx-2 text-sm font-medium">Dashboard</span>
              </button>
              <button
                className={`flex items-center w-full px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
                  activeComponent === "transactions"
                    ? "bg-gray-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                }`}
                onClick={() => setActiveComponent("transactions")}
              >
                <AiOutlineTransaction size={25} />
                <span className="mx-2 text-sm font-medium">
                  All transactions
                </span>
              </button>
              <button className="flex items-center w-full px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200">
                <SetNotification />
              </button>{" "}
              <button>
                <Profile />
              </button>
            </div>
          </nav>
        </div>
      </aside>

      <main className="flex-1 bg-gray-100 rounded-xl max-h-screen overflow-auto [&::-webkit-scrollbar]:hidden scrollbar-thin scrollbar-none">
        {activeComponent === "dashboard" && <Dashboard />}
        {activeComponent === "transactions" && <Alltransaction />}
      </main>
    </div>
  );
};

export default Sidebar;
