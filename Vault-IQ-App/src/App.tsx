import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/sigin-up";
import Sidebar from "./components/Sidebar";
import { ProtectedRoute } from "./components/protected-route";
import Cookies from "js-cookie";

function App() {
  const token = Cookies.get("token");

  return (
    <div className="flex w-full p-0">
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <Signup />}
        />

        <Route element={<ProtectedRoute redirectPath="/login" />}>
          <Route path="/" element={<Sidebar />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
