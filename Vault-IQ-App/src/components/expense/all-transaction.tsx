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
import Updateexpense from "./update-expense";
import CategoryIcon from "../category-icon";
import { filterExpenses, searchExpenses } from "@/api/expenseService";
import { useEffect, useState } from "react";

let debounceTimer: NodeJS.Timeout;

export function Alltransaction() {
  const [filterVal, setFilterVal] = useState<string>("Newest");
  const [searchValue, setSearchValue] = useState<Expense | null>(null);
  const [filterItems, setFilterItems] = useState<Expense | null>(null);
  const { data } = useQuery<Expense, Error>({
    queryKey: ["expenses"],
  });

  const handleSearch = async (search: string) => {
    if (search.trim()) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        const resp = await searchExpenses(search);
        setSearchValue(resp);
        setFilterItems(null);
      }, 800);
    } else {
      setSearchValue(null);
    }
  };

  useEffect(() => {
    const filter = async () => {
      const resp = await filterExpenses(filterVal);
      setFilterItems(resp);
      setSearchValue(null);
    };
    filter();
  }, [filterVal]);

  const displayData =
    searchValue?.data || filterItems?.data || data?.data || [];

  return (
    <div className="p-3 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl p-4 font-bold text-center sm:text-start">
          All transactions
        </h1>
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search Transaction"
              className="bg-white w-[170px] sm:w-[250px] px-4 py-2 pl-10 border rounded-lg"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
          <div className="flex items-center">
            <Select onValueChange={setFilterVal}>
              <SelectTrigger className="w-[125px] bg-white">
                <Filter size={18} />
                Filter{" "}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Newest">Newest</SelectItem>
                  <SelectItem value="Oldest">Oldest</SelectItem>
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
              <th className="px-6 py-3 text-left">Manage</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {displayData.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-8">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                      <CategoryIcon category={order.category} />
                    </div>
                    <div>
                      <div className="font-medium">{order.category}</div>
                      <div className="text-sm text-gray-500">
                        {order.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 font-semibold italic py-3">
                  {order.amount}
                </td>
                <td className="px-6 py-3 text-sm text-gray-700">
                  {new Date(order.date).toLocaleDateString()} -
                  {new Date(order.date).toLocaleTimeString()}
                </td>
                <td className="px-11 py-3">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger>
                      <PiDotsThreeCircleVertical size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Updateexpense expense={order} />
                      </DropdownMenuItem>
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
