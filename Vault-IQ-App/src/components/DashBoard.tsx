import { Addnew } from "@/components/expense/add-new";
import IncomeChart from "./ChartSquare";
import { RecentTransactions } from "./expense/transaction-history";
import { User } from "@/components/Sidebar";
const Dashboard = ({ user }: { user: User }) => {
  return (
    <div className="h-screen  w-full p-3">
      <div className="flex gap-6">
        <div className="bg-white p-6 w-1/2 space-y-10 shadow-md rounded-lg">
          <div>
            <div className="flex justify-around gap-4">
              <div className="text-center p-6 bg-[#f0e347] rounded-3xl  w-1/3">
                <h1 className="text-2xl font-bold mt-2 flex gap-1 items-center">
                  <span className="text-gray-600 font-semibold text-lg">
                    {user.data.currency}
                  </span>
                  {user.data.totalAmount}
                </h1>
                <p className="text-xs text-start font-medium mt-2">Income</p>
              </div>
              <div className="text-center p-6 bg-[#f0e3ff] rounded-3xl w-1/3">
                <h1 className="text-2xl font-bold mt-2 flex gap-1 items-center">
                  <span className="text-gray-600 font-semibold text-lg">
                    {user.data.currency}
                  </span>{" "}
                  {user.data.totalAmount - user.data.currentExpense}
                </h1>
                <p className="text-xs text-start font-medium mt-2">Balance</p>
              </div>
              <div className="text-center p-6 bg-[#abe2c2] rounded-3xl  w-1/3">
                <h1 className="text-2xl font-bold mt-2 flex gap-1 items-center">
                  <span className="text-gray-600 font-semibold text-lg">
                    {user.data.currency}
                  </span>
                  {user.data.currentExpense}
                </h1>
                <p className="text-xs text-start font-medium mt-2">Expenses</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Addnew />
          </div>
        </div>

        <div className="bg-white p-6 w-1/2 shadow-md rounded-lg flex justify-center items-center">
          <IncomeChart />
        </div>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg mt-6">
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Dashboard;
