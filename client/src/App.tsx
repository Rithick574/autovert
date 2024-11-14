import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useEffect } from "react";

// Auth
import { getUserData } from "./store/actions/user.actions";

//loading
import Loading from "./components/common/Loading";

//App Routes
import AppRoutes from "./Routes";

function App() {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user) {
      dispatch(getUserData());
    }
  }, [dispatch, user]);

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <BrowserRouter>{loading  && !isLoginPage  ? <Loading /> : <AppRoutes />}</BrowserRouter>
    </>
  );
}

export default App;
