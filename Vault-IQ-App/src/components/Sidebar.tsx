import { useState, useEffect } from "react";
import { Menu, X, LayoutDashboard, Receipt, User } from "lucide-react";
import { SetNotification } from "./expense/set-budget";
import { Profile } from "./auth/profile";
import Dashboard from "./DashBoard";
import { Alltransaction } from "@/components/expense/all-transaction";
import { getUserDetails } from "@/api/userService";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { data } = useQuery<User, Error>({
    queryKey: ["userProfile"],
    queryFn: getUserDetails,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SidebarContent = () => (
    <div className="flex flex-col h-full w-full p-5">
      <div className="p-4 text-center">
        <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-xl text-white font-bold">
            {data?.data.name?.[0]?.toUpperCase()}
          </span>
        </div>
        <div className="transition-all duration-300">
          <p className="text-white font-semibold truncate">
            Hi, {data?.data.name}
          </p>
        </div>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <button
          onClick={() => setActiveComponent("dashboard")}
          className={cn(
            "w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200",
            "hover:bg-white/10",
            activeComponent === "dashboard"
              ? "bg-white/20 text-white"
              : "text-white/70"
          )}
        >
          <LayoutDashboard size={20} />
          <span className="ml-3 text-sm font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveComponent("transactions")}
          className={cn(
            "w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200",
            "hover:bg-white/10",
            activeComponent === "transactions"
              ? "bg-white/20 text-white"
              : "text-white/70"
          )}
        >
          <Receipt size={20} />
          <span className="ml-3 text-sm font-medium">All Transactions</span>
        </button>

        <div
          className={cn(
            "w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200",
            "hover:bg-white/10"
          )}
        >
          <SetNotification />
        </div>

        <div
          className={cn(
            "w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200",
            "hover:bg-white/10"
          )}
        >
          <Profile />
        </div>
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen p-3 w-full">
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-purple-600 text-white"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-300",
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileOpen(false)}
      />

      <aside
        className={cn(
          "fixed rounded-lg inset-y-0 left-0 z-40 md:relative",
          "bg-gradient-to-br from-[#931be3] to-indigo-600",
          "transition-all duration-300 ease-in-out",
          "flex flex-col",
          isMobileOpen
            ? "w-64 translate-x-0"
            : "-translate-x-full md:translate-x-0"
        )}
      >
        <SidebarContent />
      </aside>
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          "bg-gray-50 rounded-xl shadow-sm",
          "overflow-auto [&::-webkit-scrollbar]:hidden scrollbar-thin scrollbar-none"
        )}
      >
        {activeComponent === "dashboard" && data ? (
          <Dashboard user={data} />
        ) : null}
        {activeComponent === "transactions" && <Alltransaction />}
      </main>
    </div>
  );
};

export default Sidebar;
