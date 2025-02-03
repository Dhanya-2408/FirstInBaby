import { Navigate } from "react-router-dom";
import GuestGuard from "../layout/GuestGuard";
import AuthLogin from "../pages/AuthHandler/AuthLogin";
import AuthRegister from "../pages/AuthHandler/AuthRegister";

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthRoutes = {
  path: "auth",
  element: <GuestGuard />,
  children: [
    {
      path: "",
      element: <Navigate to="/auth/login" replace />,
    },
    {
      path: "login",
      element: <AuthLogin />,
    },
    {
      path: "register",
      element: <AuthRegister />,
    },
  ],
};

export default AuthRoutes;
