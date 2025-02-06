import { SelectCurrency } from "@/components/auth/select-currency";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currency, setCurrency] = useState("INR");

  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await register(name, email, password, currency);
    alert(response.message);
    if (response.type === "success") navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
      <h1 className="font-bold text-2xl">{`Create Your Account`}</h1>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-7"
        onSubmit={handleSubmit}
      >
        <label className="font-semibold text-xs" htmlFor="nameField">
          Name
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="text"
          onChange={(e) => setName(e.target.value)}
          name="name"
        />
        <label className="font-semibold text-xs mt-3" htmlFor="emailField">
          Email
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="font-semibold text-xs mt-3" htmlFor="passwordField">
          Password
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-xs mt-3">Default Currency</label>
          <SelectCurrency value={currency} onChange={setCurrency} />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
        >
          Sign Up
        </button>

        <div className="flex mt-6 justify-center text-xs">
          <Link to={"/login"}>
            <p className="text-blue-400 hover:text-blue-500">
              Already have an account? Login
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
}
