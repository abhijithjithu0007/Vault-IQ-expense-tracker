import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/sigin-up";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex w-full p-0">
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
