import { Addnew } from "./add-new";
import IncomeChart from "./ChartSquare";
import TransactionHistory from "./transaction-history";

const Dashboard = () => {
  return (
    <div className="h-screen  w-full p-6">
      <div className="flex gap-6">
        <div className="bg-white p-6 w-1/2 space-y-6 shadow-md rounded-lg">
          <div className="flex justify-around p-4 rounded-lg shadow-md bg-sky-500 text-white">
            <h1 className="text-xl font-bold">Hello, Demmy!</h1>
          </div>
          <div>
            <div className="flex justify-around">
              <div className="text-center p-6">
                <p className="text-sm font-medium">Total Amount</p>
                <h1 className="text-xl font-bold">$7,323</h1>
              </div>
              <div className="text-center p-6">
                <p className="text-sm font-medium">Balance</p>
                <h1 className="text-xl font-bold">$2,323</h1>
              </div>
              <div className="text-center p-6">
                <p className="text-sm font-medium">Expenses</p>
                <h1 className="text-xl font-bold text-red-500">$2,323</h1>
              </div>
            </div>
          </div>

          {/* Add New Button */}
          <div className="bg-white pb-4 rounded-lg shadow-md flex justify-center">
            <Addnew />
          </div>
        </div>

        {/* Right Side: Income Chart */}
        <div className="bg-white p-6 w-1/2 shadow-md rounded-lg flex justify-center items-center">
          <IncomeChart />
        </div>
      </div>

      {/* Full-width Transaction History */}
      <div className="bg-white p-6 shadow-md rounded-lg mt-6">
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Dashboard;
