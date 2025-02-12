import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PiDotsThreeCircleVertical } from "react-icons/pi";
import { Budget } from "./set-budget";
import { useBudgetStore } from "@/store/budgetStore";
import { useQuery } from "@tanstack/react-query";

export default function Showbudget({ budgetData }: { budgetData: Budget }) {
  const deleteBudget = useBudgetStore((state) => state.deleteBudget);
  const { refetch } = useQuery({
    queryKey: ["budget"],
  });
  const handleDeleteBudget = async (id: number) => {
    const { message } = await deleteBudget(id);
    alert(message);
    refetch();
  };
  return (
    <div className="mt-3">
      <Card className="h-[200px] overflow-auto [&::-webkit-scrollbar]:hidden">
        <CardHeader>
          <CardTitle className="text-md">All Budgets</CardTitle>
          <CardDescription className="text-xs">
            Your current budget allocations
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="space-y-1">
            {budgetData?.data.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-[#f0e3ff] transition-colors"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{item.category}</span>
                  <span className="text-sm text-muted-foreground">
                    Budget Limit
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    {item.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <PiDotsThreeCircleVertical size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleDeleteBudget(item.id)}
                        className="text-red-500 font-semibold hover:cursor-pointer"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
