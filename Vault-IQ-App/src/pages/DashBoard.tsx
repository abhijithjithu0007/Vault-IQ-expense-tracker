import { Addnew } from "../components/add-new";
import IncomeChart from "../components/ChartSquare";
import { RecnetTransactions } from "../components/transaction-history";
import { User } from "@/components/Sidebar";
const Dashboard = ({ user }: { user: User }) => {
  console.log(user);

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
                <p className="text-sm font-medium">Total Amount</p>
                <h1 className="text-xl font-bold">{user.data.totalAmount}</h1>
              </div>
              <div className="text-center p-6">
                <p className="text-sm font-medium">Balance</p>
                <h1 className="text-xl font-bold">
                  {" "}
                  {user.data.totalAmount - user.data.currentExpense}
                </h1>
              </div>
              <div className="text-center p-6">
                <p className="text-sm font-medium">Expenses</p>
                <h1 className="text-xl font-bold text-red-500">
                  {user.data.currentExpense}
                </h1>
              </div>
            </div>
          </div>

          <div className="bg-white pb-4 rounded-lg shadow-md flex justify-center">
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
