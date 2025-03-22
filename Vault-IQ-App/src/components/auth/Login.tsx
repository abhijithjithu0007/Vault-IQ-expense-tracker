import { useAuthStore } from "@/store/authStore";
import { Notify } from "notiflix";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response.type === "success") {
      Notify.success(response.message);
      navigate("/home");
    } else {
      Notify.failure(response.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
      <h1 className="font-bold text-2xl">{`Welcome Back :)`}</h1>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
        action=""
      >
        <label className="font-semibold text-xs" htmlFor="usernameField">
          Email
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="font-semibold text-xs mt-3" htmlFor="passwordField">
          Password
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
          type="submit"
        >
          Login
        </button>
        <div className="flex mt-6 justify-center text-xs">
          <Link to={"/signup"}>
            <p className="text-blue-400 hover:text-blue-500 hover:cursor-pointer">
              Sign Up
            </p>
          </Link>
        </div>
        <div className="flex mt-4 justify-center text-xs">
          <Link to={"/forgot-password"}>
            <p className="text-black hover:text-blue-500 hover:cursor-pointer hover:underline">
              Forgot Password
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
}
