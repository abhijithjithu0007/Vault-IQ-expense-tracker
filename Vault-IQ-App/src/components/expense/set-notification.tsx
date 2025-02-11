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

export function SetNotification() {
  const { data } = useQuery<Category, Error>({
    queryKey: ["categories"],
  });

  const filterCatagory = data?.data.categories
    .map((item) => item.name)
    .concat(data?.data.defaultCategories);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <p className="flex text-sm font-semibold items-center gap-3 ">
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
            className="w-full h-[225px]"
          />{" "}
        </SheetHeader>
        <SheetHeader>
          <SheetTitle>Set Budget</SheetTitle>
          <SheetDescription>
            Create a budget for your expenses, when you reach the budget we will
            notify you.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Amount" className="text-right">
              Amount
            </Label>
            <Input id="number" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select>
              <SelectTrigger className="w-[250px]">
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
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Submit</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
