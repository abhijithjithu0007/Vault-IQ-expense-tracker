import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/sigin-up";
import Sidebar from "./components/Sidebar";
import { ProtectedRoute } from "./components/protected-route";
import Cookies from "js-cookie";
import { ResetPassword } from "./components/auth/reset-password";
import { ForgotPassword } from "./components/auth/forgot-password";
import { LandingPage } from "./components/landing-page";

function App() {
  const token = Cookies.get("token");

  return (
    <div className="flex w-full p-0">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route
          path="/login"
          element={token ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/home" /> : <Signup />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoute redirectPath="/login" />}>
          <Route path="/home" element={<Sidebar />} />
        </Route>
        <Route path="/welcome" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
