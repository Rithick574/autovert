import { Routes, Route, Navigate } from "react-router-dom";

//auth
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

//admin
import Layout from "./pages/admin/Layout";
// import Dashboard from "./pages/admin/Dashboard";

//store methods
import { useSelector } from "react-redux";
import { RootState } from "./store";

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

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Register />} />
    <Route path="/admin" element={<Login />} />

    <Route path="/admin/dashboard" element={<Layout />} />
    <Route path="/admin/workflow" element={<Layout />} />
    <Route path="/admin/template" element={<Layout />} />
    <Route path="/admin/dynamic-field" element={<Layout />} />

    {/* Admin Routes */}
    {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}

    <Route path="*" element={<Navigate to="/" />} />
    {/* <Route path="/test" element={<CreateWorkflow/>} />  */}
  </Routes>
);

export default AppRoutes;

// const AdminRoutes = () => {
//     return (
//       <ProtectedRoute element={<Layout />} allowedRoles={["admin"]}>
//         <Routes>
//           <Route index element={<Dashboard />} />
//           <Route path="workflow" element={<AdminUsersList />} />
//           <Route path="template" element={<AdminClientsList />} />
//           <Route path="dynamic-field" element={<AdminClientsList />} />
//           <Route path="" element={<Navigate to="dashboard" replace />} />
//         </Routes>
//       </ProtectedRoute>
//     );
//   };
