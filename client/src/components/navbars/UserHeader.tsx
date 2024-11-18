import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SyncWorksLogo from "../common/SyncWorksLogo";
import ThemeToggle from "../theme/theme-toggle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { logout } from "../../store/actions/user.actions";

const UserHeader: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="shadow-[0px_3px_23px_0px_#00000024] dark:shadow-[0px_-3px_33px_0px_#000000] w-full dark:bg-dark-bg  bg--400">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <div className="flex  justify-between items-center bg--400 w-full mr-6  ">
          <SyncWorksLogo />
          <ul className="flex">
            {!user ? (
              <>
                <Link to="/register">
                  <li
                    className={`px-3 py-1 font-semibold rounded-md ${
                      location.pathname === "/register"
                        ? "bg-blue-500 text-slate-50"
                        : "text-slate-500 dark:text-white"
                    }`}
                  >
                    Register
                  </li>
                </Link>
                <Link to="/login">
                  <li
                    className={`px-3 py-1 font-semibold rounded-md ${
                      location.pathname === "/login"
                        ? "bg-blue-500 text-slate-50"
                        : "text-slate-500 dark:text-white"
                    }`}
                  >
                    Login
                  </li>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-3 py-1 font-semibold rounded-md bg-blue-500 hover:bg-blue-600 text-white"
              >
                Exit
              </button>
            )}
          </ul>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default UserHeader;
