import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Notify } from "notiflix";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Addexpensecategory from "./add-expense-category";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { useExpenseStore } from "@/store/expenseStore";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/expenseService";

export interface Category {
  data: {
    categories: [
      {
        id: number;
        name: string;
      }
    ];
    defaultCategories: string[];
  };
}

export function Addnew() {
  const [currentTransaction, setCurrentTransaction] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(0);
  const [description, setDescription] = useState<string>("");
  const addExpense = useExpenseStore((state) => state.addExpense);
  const addIncome = useExpenseStore((state) => state.addIncome);

  const { refetch } = useQuery({
    queryKey: ["expenses"],
  });
  const { refetch: refetchUser } = useQuery({
    queryKey: ["userProfile"],
  });
  const handleAddTransaction = async () => {
    if (currentTransaction === "Expense") {
      const { message, type, isExceedBudget } = await addExpense(
        category,
        amount!,
        "",
        description
      );
      if (type === "success") {
        setAmount(0);
        setDescription("");
        setCategory("");
        if (isExceedBudget) {
          Notify.warning("Warning: You have exceeded your budget limit!");
        } else {
          Notify.success(message);
        }
      } else {
        Notify.failure(message);
      }

      refetch();
      refetchUser();
    }

    if (currentTransaction === "Income") {
      const { message, type } = await addIncome(amount!);

      if (type === "success") {
        setAmount(0);
        setDescription("");
        setCategory("");
        Notify.success(message);
      } else {
        Notify.failure(message);
      }
      refetchUser();
    }
  };

  const { data } = useQuery<Category, Error>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const filterCatagory = data?.data.categories
    .map((item) => item.name)
    .concat(data?.data.defaultCategories);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative">
          <div className="absolute -inset-5">
            <div className="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-60 blur-lg bg-gradient-to-r from-[#f0e347] via-violet-300 to-[#abe2c2]"></div>
          </div>
          <a
            title=""
            className="relative z-10 inline-flex items-center justify-center w-full px-5 py-2 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            role="button"
          >
            + Add new transaction
          </a>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add New Transaction
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-5 py-4">
          <div className="flex items-center gap-4">
            <Label className="w-1/3 text-right">Transaction</Label>
            <Select onValueChange={setCurrentTransaction}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a transaction" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Expense">Expense</SelectItem>
                  <SelectItem value="Income">Income</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {currentTransaction === "Expense" && (
            <div className="flex items-center gap-4">
              <Label className="w-1/3 text-right">Category</Label>
              <Select onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="max-h-[250px]">
                  <SelectGroup>
                    <Addexpensecategory />
                  </SelectGroup>
                  {filterCatagory?.map((item, ind) => (
                    <SelectGroup key={ind}>
                      <SelectItem value={item}>{item}</SelectItem>
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center gap-4">
            <Label className="w-1/3 text-right">Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              autoComplete="off"
              className="w-full"
            />
          </div>
          {currentTransaction === "Expense" && (
            <div className="flex items-start gap-4">
              <Label className="w-1/3 text-right">Description</Label>
              <Textarea
                placeholder="Enter transaction details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-24"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={handleAddTransaction}
            type="submit"
            className="bg-pink-600 w-full"
          >
            Add Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
