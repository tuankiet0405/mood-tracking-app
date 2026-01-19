import { Route, Routes } from "react-router-dom";
import Auth from "./features/auth/index";
import Home from "./features/home/index";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
