import { Addnew } from "./add-new";
import { ChartRound } from "./ChartRound";
import { UpdateDropdown } from "./update-dropdown";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 w-full">
      {/* Sidebar */}
      <div className="bg-white p-6 w-full space-y-6 shadow-md h-screen">
        {/* Header */}
        <div className="flex justify-around p-6 rounded-lg shadow-md bg-blue-300">
          <h1 className="text-xl font-bold">Hello, Demmy!</h1>
          <h1 className="text-3xl font-bold">🤗</h1>
        </div>

        {/* Overview */}
        <div className="flex justify-around">
          <div className="text-center  p-6">
            <p className="text-sm font-medium">Total Balance</p>
            <h1 className="text-xl font-bold">2,323$</h1>
          </div>
          <div className="text-center  p-6">
            <p className="text-sm font-medium">Expenses</p>
            <h1 className="text-xl font-bold text-red-500">2,323$</h1>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-around mt-4">
            <div className="text-center">
              <p className="mt-2 text-sm">
                {" "}
                <Addnew />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Recent Transactions</h2>
          <div className="mt-4 flex justify-between">
            <div className="w-full pr-4">
              <ul className="mt-2 space-y-2">
                {[
                  { reason: "Emirates", amount: -683, type: "debit" },
                  { reason: "Cinema", amount: -17.2, type: "debit" },
                  { reason: "Starbucks", amount: -14.99, type: "debit" },
                  { reason: "Freelance", amount: 300, type: "credit" },
                ].map((transaction, index) => (
                  <li
                    key={index}
                    className={`flex justify-around items-center border-l-4 ${
                      transaction.type === "debit"
                        ? "border-red-500"
                        : "border-green-500"
                    }`}
                  >
                    <span className="flex-1 pl-3">{transaction.reason}</span>
                    <div className="flex justify-between w-1/4">
                      <span
                        className={`font-semibold ${
                          transaction.amount < 0
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {transaction.amount < 0
                          ? `${transaction.amount.toFixed(2)}$`
                          : `${transaction.amount.toFixed(2)}$`}
                      </span>
                      <span>
                        <UpdateDropdown />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-2 bg-gray-200 p-6 w-full">
        <div className="h-full bg-gray-300 rounded-lg shadow-md">
          <ChartRound />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
