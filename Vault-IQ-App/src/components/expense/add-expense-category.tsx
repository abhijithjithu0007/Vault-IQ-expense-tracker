import { Dialog, DialogFooter, DialogTrigger } from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useExpenseStore } from "@/store/expenseStore";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Addexpensecategory() {
  const { refetch } = useQuery({
    queryKey: ["categories"],
  });
  const [name, setName] = useState("");
  const addExpenseCategory = useExpenseStore(
    (state) => state.addExpenseCategory
  );

  const handleAddExpenseCategory = async () => {
    const { message } = await addExpenseCategory(name);
    alert(message);
    refetch();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-red-500 text-sm p-2 hover:cursor-pointer">
          + Add new category
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex items-center gap-3 justify-center">
        <Input
          id="number"
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
          className="col-span-3"
        />
        <DialogFooter>
          <Button onClick={handleAddExpenseCategory} type="submit">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
