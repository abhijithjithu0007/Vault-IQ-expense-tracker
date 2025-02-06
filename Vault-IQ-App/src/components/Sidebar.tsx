import { useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import { Alltransaction } from "@/components/expense/all-transaction";
import Dashboard from "./DashBoard";
import { SetNotification } from "./set-notification";
import { Profile } from "./auth/profile";
import { getUserDetails } from "@/api/userService";
import { useQuery } from "@tanstack/react-query";

export interface User {
  data: {
    id: number;
    name: string;
    email: string;
    currency: string;
    totalAmount: number;
    currentExpense: number;
  };
}

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const { data } = useQuery<User, Error>({
    queryKey: ["userProfile"],
    queryFn: getUserDetails,
  });

  return (
    <div className="flex w-full gap-5 p-3 h-screen">
      <aside className="flex flex-col rounded-xl w-64 h-full px-5 py-8 overflow-y-auto bg-gradient-to-br from-[#931be3] to-indigo-600 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 shadow-lg">
        <p className="flex text-2xl font-serif text-white font-bold justify-center">
          Hi, {data?.data.name}
        </p>

        <div className="flex flex-col justify-between flex-1 mt-8">
          <nav className="-mx-3 space-y-3">
            <button
              className={`flex items-center w-full px-4 py-3 text-white transition-all duration-300 transform rounded-lg ${
                activeComponent === "dashboard"
                  ? "bg-gray-700 shadow-md"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              onClick={() => setActiveComponent("dashboard")}
            >
              <RiDashboard3Line size={20} className="flex-shrink-0" />
              <span className="mx-3 text-sm font-medium">Dashboard</span>
            </button>

            <button
              className={`flex items-center w-full px-4 py-3 text-white transition-all duration-300 transform rounded-lg ${
                activeComponent === "transactions"
                  ? "bg-gray-700 shadow-md"
                  : "hover:bg-gray-100  hover:text-gray-700 "
              }`}
              onClick={() => setActiveComponent("transactions")}
            >
              <AiOutlineTransaction size={20} className="flex-shrink-0" />
              <span className="mx-3 text-sm font-medium">All Transactions</span>
            </button>

            <button
              className={`flex items-center w-full px-4 py-3 text-white transition-all duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700`}
            >
              <SetNotification />
            </button>

            <button
              className={`flex items-center w-full px-4 py-3 text-white transition-all duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700`}
            >
              <Profile />
            </button>
          </nav>
        </div>
      </aside>
      <main className="flex-1 bg-gray-50 rounded-xl h-full overflow-auto shadow-sm [&::-webkit-scrollbar]:hidden scrollbar-thin scrollbar-none">
        {activeComponent === "dashboard" && data ? (
          <Dashboard user={data} />
        ) : null}
        {activeComponent === "transactions" && <Alltransaction />}
      </main>
    </div>
  );
};

export default Sidebar;
