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

export function Addnew() {
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add new transaction
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Transaction
            </Label>
            <Select>
              <SelectTrigger className="w-[275px]">
                <SelectValue placeholder="Select a transaction" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Credit">Credit</SelectItem>
                  <SelectItem value="Debit">Debit</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Category
            </Label>
            <Select>
              <SelectTrigger className="w-[275px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="h-[250px]">
                <SelectGroup>
                  <Addexpensecategory />
                </SelectGroup>
                <SelectGroup>
                  <SelectItem value="Credit">Bus</SelectItem>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-right">
              Amount
            </Label>
            <Input id="number" autoComplete="off" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
