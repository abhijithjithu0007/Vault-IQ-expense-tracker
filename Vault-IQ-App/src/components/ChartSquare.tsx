import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { User } from "./Sidebar";

const ChartSquare = ({ user }: { user: User }) => {
  const data = [
    { name: "Income", value: user.data.totalAmount },
    { name: "Expense", value: user.data.currentExpense },
    {
      name: "Balance",
      value: user.data.totalAmount - user.data.currentExpense,
    },
  ];

  const COLORS = ["#4682B4", "#cc082c", "#1E90FF"];
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="relative">
        <PieChart className="flex" width={220} height={220}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="transition-all duration-300 hover:scale-105"
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default ChartSquare;
