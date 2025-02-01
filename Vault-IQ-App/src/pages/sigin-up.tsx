import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
      <h1 className="font-bold text-2xl">{`Create Your Account`}</h1>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
        action=""
      >
        <label className="font-semibold text-xs" htmlFor="nameField">
          Name
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="text"
        />
        <label className="font-semibold text-xs mt-3" htmlFor="emailField">
          Email
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="email"
        />
        <label className="font-semibold text-xs mt-3" htmlFor="passwordField">
          Password
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="password"
        />
        <button className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">
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
