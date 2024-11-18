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
import StepTemplate from "./components/admin/template/StepTemplate";
import WorkflowEditor from "./pages/admin/WorkflowEditor";
import Applications from "./pages/admin/Applications";

//user
import UserTemplateShow from "./pages/user/UserTemplateShow";
import UserBoardingSteps from "./pages/user/UserBoardingSteps";
import UserLayout from "./pages/user/Layout";
import Success from "./pages/user/Success";

// Admin Routes
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/workflow" element={<WorkflowEditor />} />
        <Route path="/template" element={<Template />} />
        <Route path="template/:stepId" element={<StepTemplate />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

//user Routes
const UserRoutes=()=>{
  return (
    <Routes>
      <Route path="/" element={<UserLayout/>}>
      <Route index element={<UserTemplateShow />} />
      <Route path="/onboarding" element={<UserBoardingSteps />} />
      <Route path="/success" element={<Success />} />
      </Route>
    </Routes>
  )
}

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
          <UserTemplateShow />
        )
      ) : (
        <Register />
      ),
    },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    {
      path: "/user/*",
      element:
        user && user.role === "user" ? <UserRoutes /> : <Navigate to="/" />,
    },
    {
      path: "/admin/*",
      element:
        user && user.role === "admin" ? <AdminRoutes /> : <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
