import React from "react";
import { Lock, Mail } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const ResetPassword = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-[#f0e3ff] h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-black" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 ">
            Reset Your Password
          </h1>
          <p className="mt-2 text-gray-600">Enter your new credentials</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 ">
                New Password
              </Label>
              <Input
                type="password"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder:text-gray-400"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">
                Confirm Password
              </Label>
              <Input
                type="password"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder:text-gray-400"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full  text-white font-medium py-3 px-4 rounded-lg"
            >
              Reset Password
            </Button>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-600">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
