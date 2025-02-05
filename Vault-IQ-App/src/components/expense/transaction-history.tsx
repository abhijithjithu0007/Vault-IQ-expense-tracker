import { getExpenses } from "@/api/expenseService";
import { useQuery } from "@tanstack/react-query";

export interface Expense {
  data: [
    {
      id: number;
      category: string;
      amount: number;
      bill: string;
      description: string;
      date: string;
    }
  ];
}
export const RecnetTransactions = () => {
  const { data } = useQuery<Expense, Error>({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });
  const limitedData = data?.data.slice(0, 3);

  return (
    <div className="max-w-4xl h-[290px] mx-auto bg-white overflow-auto [&::-webkit-scrollbar]:hidden scrollbar-thin scrollbar-none">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent Expenses</h2>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="pb-4 text-sm text-gray-600">Name</th>
            <th className="pb-4 text-sm text-gray-600">Type</th>
            <th className="pb-4 text-sm text-gray-600">Date</th>
            <th className="pb-4 text-sm text-gray-600">Amount</th>
          </tr>
        </thead>
        <tbody>
          {limitedData?.map((transaction) => (
            <tr key={transaction.id} className="border-b hover:bg-gray-50">
              <td className="py-4">
                <div className="flex items-center gap-4">
                  <img src="" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {transaction.category}
                    </p>
                    <p className="text-xs text-gray-500">
                      {transaction.description}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 text-sm text-gray-700">expense</td>
              <td className="py-4 text-sm text-gray-700">
                <p className="text-xs text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>{" "}
                <p>{new Date(transaction.date).toLocaleTimeString()}</p>
              </td>
              <td className="py-4 text-sm font-medium text-gray-800">
                {transaction.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
