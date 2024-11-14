import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../types/IAuth";

// export const ProtectedRoute = ({
//   element,
//   allowedRoles,
// }: ProtectedRouteProps) => {
//   const { user } = useSelector((state: RootState) => state.user);

//   if (!user) {
//     return <Navigate to="/register" replace />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     const redirectPath = user.role === "admin" ? "/admin" : "/user";
//     return <Navigate to={redirectPath} replace />;
//   }

//   return (
//     <>
//       {element}
//     </>
//   );
// };

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { user } = useSelector((state: RootState) => state.user);

  return user ? <>{element}</> : <Navigate to="/register" />;
};
