import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

export function Addnew() {
  const [currentTransaction, setCurrentTransaction] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>();
  const [description, setDescription] = useState<string>("");
  const addExpense = useExpenseStore((state) => state.addExpense);

  const { refetch } = useQuery({
    queryKey: ["expenses"],
  });
  const handleAddTransaction = async () => {
    if (currentTransaction === "Expense") {
      const { message, type } = await addExpense(
        category,
        amount!,
        "",
        description
      );
      alert(message);
      refetch();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="rounded-full p-4 flex items-center justify-center"
        >
          + New
        </Button>
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
                  <SelectGroup>
                    <SelectItem value="Bus">Bus</SelectItem>
                    <SelectItem value="Car">Car</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Gas">Gas</SelectItem>
                    <SelectItem value="Groceries">Groceries</SelectItem>
                    <SelectItem value="Housing">Housing</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                  </SelectGroup>
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
          <div className="flex items-start gap-4">
            <Label className="w-1/3 text-right">Description</Label>
            <Textarea
              placeholder="Enter transaction details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-24"
            />
          </div>

          {currentTransaction === "Expense" && (
            <div className="flex justify-end">
              <p className="text-sm text-right w-3/4">
                If you would like to add a new bill to your records, please
                click
                <span className="text-blue-600 hover:underline cursor-pointer">
                  {" "}
                  here.
                </span>
              </p>
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
