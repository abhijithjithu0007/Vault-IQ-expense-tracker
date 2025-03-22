import { RecentTransactions } from "./expense/transaction-history";
import { User } from "@/components/Sidebar";
import ChartSquare from "./ChartSquare";
import { Addnew } from "./expense/add-new";

const Dashboard = ({ user }: { user: User }) => {
  return (
    <div className="h-screen w-full p-2 sm:p-14 md:p-3">
      <div className="flex flex-col md:flex-row gap-2 lg:gap-6">
        <div className="bg-white p-3 lg:p-6 w-full md:w-2/3 space-y-7 sm:space-y-10 shadow-md rounded-lg">
          <div className="flex flex-wrap sm:flex-nowrap justify-around gap-4">
            <div className="text-center p-5 bg-[#f0e347] rounded-3xl w-1/3">
              <h1 className="text-xl sm:text-2xl font-bold mt-2 flex gap-1 items-center">
                <span className="text-gray-600 font-semibold text-lg">
                  {user.data.currency}
                </span>
                {user.data.totalAmount}
              </h1>
              <p className="text-xs text-start font-medium mt-2">Income</p>
            </div>
            <div className="text-center p-5 bg-[#f0e3ff] rounded-3xl w-1/3">
              <h1 className="text-xl sm:text-2xl font-bold mt-2 flex gap-1 items-center">
                <span className="text-gray-600 font-semibold text-lg">
                  {user.data.currency}
                </span>
                {user.data.totalAmount - user.data.currentExpense}
              </h1>
              <p className="text-xs text-start font-medium mt-2">Balance</p>
            </div>
            <div className="text-center p-5 bg-[#abe2c2] rounded-3xl w-1/3">
              <h1 className="text-xl sm:text-2xl font-bold mt-2 flex gap-1 items-center">
                <span className="text-gray-600 font-semibold text-lg">
                  {user.data.currency}
                </span>
                {user.data.currentExpense}
              </h1>
              <p className="text-xs text-start font-medium mt-2">Expenses</p>
            </div>
          </div>
          <div className="flex justify-center">
            <Addnew />
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white w-full md:w-1/2 shadow-md rounded-lg flex justify-center items-center">
          <ChartSquare user={user} />
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="bg-white p-3 sm:p-6 shadow-md rounded-lg mt-6">
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Dashboard;
