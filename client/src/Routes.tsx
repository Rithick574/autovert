import { Routes, Route } from "react-router-dom";

//auth
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login"

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Register />} />   
        <Route path="/admin" element={<Login />} />   
    </Routes>
);

export default AppRoutes;