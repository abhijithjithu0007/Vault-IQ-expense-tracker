const TransactionHistory = () => {
  const transactions = [
    {
      id: 1,
      name: "Figma Pro Plan",
      description: "Application",
      type: "Subscription",
      date: "Oct 20, 2022",
      time: "10:32 PM",
      amount: "$64.00",
      icon: "https://via.placeholder.com/32",
    },
    {
      id: 2,
      name: "Fiverr International",
      description: "Freelance platform",
      type: "Receive",
      date: "Oct 20, 2022",
      time: "10:32 PM",
      amount: "$100.00",
      icon: "https://via.placeholder.com/32",
    },
  ];

  return (
    <div className="max-w-4xl h-[290px] mx-auto bg-white overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Transactions History
        </h2>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg">
            <span>Filter</span>
          </button>
        </div>
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
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b hover:bg-gray-50">
              <td className="py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={transaction.icon}
                    alt={transaction.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {transaction.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {transaction.description}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 text-sm text-gray-700">{transaction.type}</td>
              <td className="py-4 text-sm text-gray-700">
                <p>{transaction.date}</p>
                <p className="text-xs text-gray-500">{transaction.time}</p>
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

export default TransactionHistory;
