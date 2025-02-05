import { getExpenses } from "@/api/expenseService";
import { Input } from "@/components/ui/input";
import { PiDotsThreeCircleVertical } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { Expense } from "./transaction-history";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteExpense } from "./delete-expense";
export function Alltransaction() {
  const { data } = useQuery<Expense, Error>({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl p-4 font-bold">All transactions</h1>
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search Transaction"
              className="bg-white w-[400px] px-4 py-2 pl-10 border rounded-lg"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
          <div className="flex items-center">
            <Select>
              <SelectTrigger className="w-[125px] bg-white">
                <Filter size={18} />
                Filter{" "}
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
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-sm text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Date & Time</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Manage</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data?.data.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-sm">P</span>
                    </div>
                    <div>
                      <div className="font-medium">{order.category}</div>
                      <div className="text-sm text-gray-500">
                        {order.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{order.amount}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {new Date(order.date).toLocaleDateString()} -
                  {new Date(order.date).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-sm bg-orange-100 text-orange-600">
                    Expense
                  </span>
                </td>
                <td className="px-11 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <PiDotsThreeCircleVertical size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <DeleteExpense expenseId={order.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
