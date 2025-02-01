import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MdManageAccounts } from "react-icons/md";
import { Logout } from "../components/logout";

export function Profile() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex text-white font-semibold p-3 gap-2">
          <MdManageAccounts size={25} />
          Account
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Your Profile</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 p-4">
          <div>
            <img
              className="rounded-full h-32 w-32"
              src="https://i.pinimg.com/736x/31/03/4a/31034ac97223302fd57c748aaed79570.jpg"
              alt="profile"
            />
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-xl font-semibold">Abhijith v</h1>
            <h1 className="text-xl font-semibold">abhi@gmail.com</h1>
          </div>
        </div>
        <DialogFooter>
          <Logout />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
