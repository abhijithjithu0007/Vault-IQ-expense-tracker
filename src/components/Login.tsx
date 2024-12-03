export default function Login() {
  return (
    <div className="flex justify-center h-screen items-center">
      <form className="max-w-md">
        <div>
          <label htmlFor="name" className="block font-semibold">
            Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              autoFocus
              className="bg-white shadow-sm ring-0 block w-full text-lg focus:outline-none focus:border-tan-500 border-tan-300 p-2 border-2"
            />
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between">
            <label htmlFor="text" className="block font-semibold">
              Current Money
            </label>
          </div>
          <div className="mt-1">
            <input
              type="number"
              name="number"
              className="bg-white shadow-sm ring-0 block w-full text-lg focus:outline-none focus:border-tan-500 border-tan-300 p-2 border-2"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex flex-no-wrap mt-6 border-2 border-black bg-yellow-500 py-2 px-4"
          >
            <span>Sign In</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 w-6 h-6"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
