import { Dialog, DialogFooter, DialogTrigger } from "./ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Addexpensecategory() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-red-500 text-sm p-2 hover:cursor-pointer">
          + Add new category
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex items-center gap-3 justify-center">
        <Input id="number" autoComplete="off" className="col-span-3" />
        <DialogFooter>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
