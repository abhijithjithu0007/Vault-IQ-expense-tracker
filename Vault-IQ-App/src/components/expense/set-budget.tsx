import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { IoNotificationsSharp } from "react-icons/io5";
import { Category } from "./add-new";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useBudgetStore } from "@/store/budgetStore";
import { useState } from "react";
import { getBudgetApi } from "@/api/budgetService";
import Showbudget from "./show-budget";
import { Notify } from "notiflix";
import { getCategories } from "@/api/expenseService";

export interface Budget {
  data: [
    {
      id: number;
      category: string;
      amount: number;
    }
  ];
}

export function SetNotification() {
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>();
  const addBudget = useBudgetStore((state) => state.addBudget);
  const { data } = useQuery<Category, Error>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const { data: budgetData, refetch } = useQuery<Budget, Error>({
    queryKey: ["budget"],
    queryFn: getBudgetApi,
  });

  const filterCatagory = data?.data.categories
    .map((item) => item.name)
    .concat(data?.data.defaultCategories);

  const handleSetBudget = async () => {
    const { message, type } = await addBudget(category, amount!);
    if (type === "success") {
      Notify.success(message);
    } else {
      Notify.failure(message);
    }
    refetch();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <p className="flex text-white/70 text-sm font-semibold items-center gap-3 ">
          <IoNotificationsSharp size={20} />
          Budget Plan
        </p>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {" "}
          <video
            src="/budget-vedio.mp4"
            autoPlay
            loop
            muted
            className="w-full h-[110px]"
          />{" "}
        </SheetHeader>
        <SheetHeader>
          <SheetTitle>Set Budget</SheetTitle>
          <SheetDescription className="text-xs">
            Set a budget for expenses; get notified when you reach it.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Amount" className="text-right">
              Amount
            </Label>
            <Input
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              id="number"
              type="number"
              className="col-span-3"
            />
          </div>
          <div className="flex justify-center items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-[250px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="max-h-[250px] overflow-scroll scrollbar-thin scrollbar-none">
                {filterCatagory?.map((item, ind) => (
                  <SelectGroup key={ind}>
                    <SelectItem value={item}>{item}</SelectItem>
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>{" "}
          </div>
        </div>
        <SheetFooter className="pb-2">
          <SheetClose asChild>
            <Button onClick={handleSetBudget} type="submit">
              Add
            </Button>
          </SheetClose>
        </SheetFooter>
        <hr />
        {budgetData && <Showbudget budgetData={budgetData} />}
      </SheetContent>
    </Sheet>
  );
}
