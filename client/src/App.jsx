import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Login } from "./features/auth/components/login";
import { Register } from "./features/auth/components/register";
import { Layout } from "./components/Layout";
import UserData from "./features/data/components/UserData";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userdata" element={<UserData />} />
      </Routes>
    </>
  );
}

export default App;
