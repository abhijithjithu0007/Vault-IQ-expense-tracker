import { Addnew } from "@/components/expense/add-new";
import IncomeChart from "./ChartSquare";
import { RecnetTransactions } from "./expense/transaction-history";
import { User } from "@/components/Sidebar";
const Dashboard = ({ user }: { user: User }) => {
  return (
    <div className="h-screen  w-full p-3">
      <div className="flex gap-6">
        <div className="bg-white p-6 w-1/2 space-y-6 shadow-md rounded-lg">
          <div className="flex justify-around p-4 rounded-lg shadow-md bg-sky-500 text-white">
            <h1 className="text-xl font-bold">Hello, {user.data.name}!</h1>
          </div>
          <div>
            <div className="flex justify-around">
              <div className="text-center p-6">
                <p className="text-sm font-medium">Income</p>
                <h1 className="text-2xl font-bold mt-2 flex gap-1 items-center">
                  <span className="text-gray-600 font-semibold text-sm">
                    {user.data.currency}
                  </span>
                  {user.data.totalAmount}
                </h1>
              </div>
              <div className="text-center p-6">
                <p className="text-sm font-medium">Balance</p>
                <h1 className="text-2xl font-bold mt-2 flex gap-1 items-center">
                  <span className="text-gray-600 font-semibold text-sm">
                    {user.data.currency}
                  </span>{" "}
                  {user.data.totalAmount - user.data.currentExpense}
                </h1>
              </div>
              <div className="text-center p-6">
                <p className="text-sm font-medium">Expenses</p>
                <h1 className="text-2xl font-bold text-red-500 mt-2 flex gap-1 items-center">
                  <span className="text-gray-600 font-semibold text-sm">
                    {user.data.currency}
                  </span>
                  {user.data.currentExpense}
                </h1>
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
        <RecnetTransactions />
      </div>
    </div>
  );
};

export default Dashboard;
