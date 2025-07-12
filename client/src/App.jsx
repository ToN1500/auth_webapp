import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./components/Layout";
import UserData from "./features/data/components/UserData";
import { Register } from "./features/auth/components/Register";
import { Login } from "./features/auth/components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/userdata"
          element={
            <ProtectedRoute>
              <UserData />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
