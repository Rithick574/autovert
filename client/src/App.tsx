import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppDispatch, RootState } from "./store";

//auth
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { getUserData } from "./store/actions/user.actions";

//admin
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";

//user
import UserDashBoard from "./pages/user/UserDashBoard";

//test
import WorkflowEditor from "./pages/admin/WorkflowEditor"
import Workflow from "./pages/admin/Workflow";



function App() {
  const { user,loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user && !loading) {
      dispatch(getUserData());
    }
  }, [dispatch, user]);

 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                user.role === "admin" ? (
                  <Navigate to="/admin/" />
                ) : (
                  <UserDashBoard />
                )
              ) : (
                <Register />
              )
            }
          />
          //auth pages
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />}/> 

          //test
          <Route path="workflow" element={<WorkflowEditor />}/> 
          <Route path="test" element={<Workflow />}/> 

          {/* Admin Routes */}
          {(user && user.role === "admin") ? (
            <Route path="/admin/*" element={<AdminRoutes />} />
          ) : (
            <Route path="/admin" element={<Navigate to="/" />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;



const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/workflow" element={<WorkflowEditor />} />
        {/* <Route path="template" element={<Template />} />
        <Route path="dynamic-field" element={<DynamicField />} /> */}
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};
