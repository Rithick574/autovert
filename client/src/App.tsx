import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import { AppDispatch, RootState } from "./store";

//auth
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { getUserData } from "./store/actions/user.actions";

//admin
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import Template from "./pages/admin/Template";
import Forms from "./pages/admin/Forms";
import StepTemplate from "./components/admin/template/StepTemplate";
import WorkflowEditor from "./pages/admin/WorkflowEditor";
import Applications from "./pages/admin/Applications";

//user
import UserDashBoard from "./pages/user/UserDashBoard";

// Admin Routes
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/workflow" element={<WorkflowEditor />} />
        <Route path="/template" element={<Template />} />
        <Route path="template/:stepId" element={<StepTemplate />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

function App() {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user && !loading) {
      dispatch(getUserData());
    }
  }, [dispatch, user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? (
        user.role === "admin" ? (
          <Navigate to="/admin/" />
        ) : (
          <UserDashBoard />
        )
      ) : (
        <Register />
      ),
    },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "workflow", element: <WorkflowEditor /> },
    {
      path: "/admin/*",
      element:
        user && user.role === "admin" ? <AdminRoutes /> : <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
