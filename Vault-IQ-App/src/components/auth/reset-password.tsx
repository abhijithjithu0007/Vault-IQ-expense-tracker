import React, { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/authStore";
import { Notify } from "notiflix";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const resetToken = searchParams.get("token");
  const ResetPassword = useAuthStore((state) => state.resetPassword);
  const navigate = useNavigate();

  // Validate passwords on change
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.confirmPassword;
        return newErrors;
      });
    }
  }, [password, confirmPassword]);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const { message, type } = await ResetPassword(password, resetToken!);
    if (type === "success") {
      Notify.success(message);
      navigate("/login");
    } else {
      Notify.failure(message);
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-[#f0e3ff] h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-black" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Reset Your Password
          </h1>
          <p className="mt-2 text-gray-600">Enter your new credentials</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <form className="space-y-6" onSubmit={handleResetPassword}>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                New Password
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder:text-gray-400"
                placeholder="••••••••"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">
                Confirm Password
              </Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder:text-gray-400"
                placeholder="••••••••"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full text-white font-medium py-3 px-4 rounded-lg"
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
