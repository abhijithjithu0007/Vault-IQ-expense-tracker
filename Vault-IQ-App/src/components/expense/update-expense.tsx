import React, { useState } from "react";
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
import { Textarea } from "../ui/textarea";
import { useExpenseStore } from "@/store/expenseStore";
import { useQuery } from "@tanstack/react-query";
import { Notify } from "notiflix";

interface Props {
  id: number;
  category: string;
  amount: number;
  bill: string;
  description: string;
  date: string;
}

export default function Updateexpense({ expense }: { expense: Props }) {
  const [category, setCategory] = useState<string>(expense.category);
  const [amount, setAmount] = useState<number>(expense.amount);
  const [description, setDescription] = useState<string>(expense.description);

  const updateExpense = useExpenseStore((state) => state.updateExpense);
  const { refetch } = useQuery({
    queryKey: ["expenses"],
  });
  const { refetch: refetchUser } = useQuery({
    queryKey: ["userProfile"],
  });

  const handleUpdateExpense = async () => {
    const { message, type } = await updateExpense(
      expense.id,
      category,
      amount,
      description
    );
    if (type === "success") {
      Notify.success(message);
      refetch();
      refetchUser();
    } else {
      Notify.failure(message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="cursor-pointer">Edit</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          <div className="flex items-center gap-4">
            <Label className="w-1/3 text-right">Category</Label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
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
          <div className="flex items-center gap-4">
            <Label className="w-1/3 text-right">Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
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
        </div>

        <DialogFooter>
          <Button
            onClick={handleUpdateExpense}
            type="submit"
            className="bg-pink-600 w-full"
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
