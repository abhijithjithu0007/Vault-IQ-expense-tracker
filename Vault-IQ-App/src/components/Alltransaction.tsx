import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Transaction = {
  id: number;
  amount: number;
  reason: string;
  time: string;
};

const transactionsData: Transaction[] = [
  { id: 1, amount: 200, reason: "Groceries", time: "2024-12-01T14:30:00" },
  { id: 2, amount: 500, reason: "Rent", time: "2024-11-28T08:00:00" },
  { id: 3, amount: 50, reason: "Snacks", time: "2024-12-03T17:45:00" },
  {
    id: 4,
    amount: 150,
    reason: "Electricity Bill",
    time: "2024-12-02T09:15:00",
  },
];

export const AllTransactions = () => {
  return (
    <div className="p-5 bg-gray-100 min-h-screen text-white">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Transaction History</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by amount, reason, or date..."
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg">
            Sort by Date (Newest)
          </button>
          <div>
            <Select>
              <SelectTrigger className="w-[275px]">
                <SelectValue placeholder="Select a transaction" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Credit">Credit</SelectItem>
                  <SelectItem value="Debit">Debit</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {transactionsData.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-t border-gray-700 hover:bg-gray-600"
                >
                  <td className="px-4 py-2">${transaction.amount}</td>
                  <td className="px-4 py-2">{transaction.reason}</td>
                  <td className="px-4 py-2">
                    {new Date(transaction.time).toLocaleString()}
                  </td>
                </tr>
              ))}
              {transactionsData.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-gray-400 py-4">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
