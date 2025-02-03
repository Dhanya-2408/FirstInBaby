import AuthGuard from "../layout/AuthGuard";
import Address from "../pages/Address";
import OrderConfirmation from "../pages/OrderConfirmation/OrderConfirmation";
import { Payment } from "../pages/Payment";
import Profile from "../pages/Profile";
import { Wishlist } from "../pages/Wishlist";

const AuthVerifyRoutes = {
  path: "/",
  element: <AuthGuard />,
  children: [
    {
      path: "wishlist",
      element: <Wishlist />,
    },
    {
      path: "address",
      element: <Address />,
    },
    {
      path: "account",
      element: <Profile />,
    },
    {
      path: "payment/:addressId",
      element: <Payment />,
    },
    {
      path: "orderconfirm",
      element: <OrderConfirmation />,
    },
  ],
};

export default AuthVerifyRoutes;
