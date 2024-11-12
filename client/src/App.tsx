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
  const { user,loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const initializeApp = async () => {
      if (!user) {
        await dispatch(getUserData());
      }
    };
    initializeApp();
  }, [dispatch, user]);
  return (
    <>
      <BrowserRouter>
          {loading ? (
             <>
             <Loading />
             {console.log("Loading...")}
           </>
          ):(
            <AppRoutes/>
          )}
      </BrowserRouter>
    </>
  );
}

export default App;
