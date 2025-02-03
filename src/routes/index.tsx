import { useRoutes } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";
import AuthVerifyRoutes from "./AuthVerifyRoutes";
import InfoRoutes from "./InfoRoutes";

const all_routes = [AuthRoutes, MainRoutes, AuthVerifyRoutes, InfoRoutes];

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
  return useRoutes(all_routes);
}
