import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuthStore } from "@/store/authStore";
import { Link } from "react-router-dom";
import { Notify } from "notiflix";

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const ForgotPassword = useAuthStore((state) => state.forgotPassword);
  const handleEmail = async () => {
    const { message, type } = await ForgotPassword(email);
    if (type === "success") {
      Notify.success(message);
    } else {
      Notify.failure(message);
    }
  };
  return (
    <main className="mx-auto p-6 h-screen  flex items-center justify-center">
      <div className="mt-7 bg-white rounded-xl shadow-xl  border-2 border-indigo-300">
        <div className="p-8 sm:p-7">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Forgot password?
            </h1>
            <p className="mt-2 p-5 text-sm text-gray-600 ">
              Remember your password?
              <a
                className="text-blue-600 decoration-2 hover:underline ml-1 font-medium"
                href="/login"
              >
                Login here
              </a>
            </p>
          </div>

          <div className="mt-3 p-3">
            <div className="grid gap-y-4">
              <Label>Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full border border-black"
              />
            </div>
            <div className="flex justify-center items-center mt-3">
              <Button
                type="submit"
                onClick={handleEmail}
                className="py-2 px-2 gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
              >
                Reset password
              </Button>
            </div>
            <div className="flex mt-4 justify-center text-xs">
              <Link to={"/login"}>
                <p className="text-black hover:text-blue-500 hover:cursor-pointer hover:underline">
                  Remember it
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
