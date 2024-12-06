import { Button } from "@/components/ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UpdateTrans } from "./update-trans";
import { DeleteDialog } from "./delete-dialog";

export function UpdateDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <BsThreeDotsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28">
        <div>
          <div>
            <span className="flex justify-center">
              <UpdateTrans />
            </span>
          </div>
          <span>
            <DeleteDialog />
          </span>
        </div>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
