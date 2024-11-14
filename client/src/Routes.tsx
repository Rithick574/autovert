import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";

//auth
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

//admin
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";

// import CreateWorkflow from "./pages/workflow/CreateWorkflow";

type ProtectedRouteProps = {
  element: React.ReactNode;
  allowedRoles: string[];
  children?: React.ReactNode;
};

const ProtectedRoute = ({
  element,
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <Navigate to="/register" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin" replace />;
      case "user":
        return <Navigate to="/user" replace />;
      default:
        return <Navigate to="/register" replace />;
    }
  }

  return (
    <>
      {element} {children}
    </>
  );
};

const AppRoutes = () => {
  
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={user.role === "admin" ? "/admin" : "/user"} replace />
          ) : (
            <Navigate to="/register" replace />
          )
        }
      />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* Default Route */}
      <Route path="*" element={<Navigate to={user ? "/" : "/register"} />} />

      {/* <Route path="/test" element={<CreateWorkflow/>} />  */}
    </Routes>
  );
};

export default AppRoutes;

const AdminRoutes = () => {
  console.log("here in admin routes@@@@@@@@@@@@@@@");
  
  return (
    <ProtectedRoute element={<Layout />} allowedRoles={["admin"]}>
      <Routes>
        <Route index element={<Dashboard />} />
        {/* <Route path="workflow" element={<Workflow />} />
        <Route path="template" element={<Template />} />
        <Route path="dynamic-field" element={<DynamicField />} />
        <Route path="" element={<Navigate to="dashboard" replace />} /> */}
      </Routes>
    </ProtectedRoute>
  );
};
