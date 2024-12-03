import { Addnew } from "./add-new";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-white p-6 w-full space-y-6 shadow-md h-screen">
        {/* Header */}
        <div className="flex justify-around p-6 rounded-lg shadow-md bg-blue-300">
          <h1 className="text-xl font-bold">Hello, Demmy!</h1>
          <h1 className="text-3xl font-bold">🤗</h1>
        </div>

        {/* Overview */}
        <div className="flex justify-around">
          <div className="text-center bg-gray-500 p-6">
            <p className="text-sm font-medium">Total Balance</p>
            <h1 className="text-xl font-bold">2,323$</h1>
          </div>
          <div className="text-center bg-gray-400 p-6">
            <p className="text-sm font-medium">Expenses</p>
            <h1 className="text-xl font-bold text-red-500">2,323$</h1>
          </div>
        </div>

        {/* Fast Transactions */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-around mt-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                +{" "}
              </div>
              <p className="mt-2 text-sm">
                {" "}
                <Addnew />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Recent Transactions</h2>
          <div className="mt-4 gap-4 flex justify-between">
            <div>
              <h3 className="text-md font-semibold">Outcome</h3>
              <ul className="mt-2 space-y-2">
                <li className="flex justify-between">
                  <span>Emirates</span>
                  <span>-683$</span>
                </li>
                <li className="flex justify-between">
                  <span>Cinema</span>
                  <span>-17.20$</span>
                </li>
                <li className="flex justify-between">
                  <span>Starbucks</span>
                  <span>-14.99$</span>
                </li>
              </ul>
            </div>

            {/* Income */}
            <div>
              <h3 className="text-md font-semibold">Income</h3>
              <ul className="mt-2 space-y-2">
                <li className="flex justify-between">
                  <span>Dividends</span>
                  <span>+281.73$</span>
                </li>
                <li className="flex justify-between">
                  <span>Salary</span>
                  <span>+2,000$</span>
                </li>
                <li className="flex justify-between">
                  <span>John Doe</span>
                  <span>+356.99$</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side (Chart area) */}
      <div className="flex-2 bg-gray-200 p-6 w-full">
        {/* Placeholder for Charts */}
        <div className="h-full bg-gray-300 rounded-lg shadow-md">
          {/* Add your chart component or code here */}
          <h2 className="text-lg font-bold text-center pt-6">Charts Area</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
