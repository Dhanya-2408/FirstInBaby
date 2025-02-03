import { NavLink } from "react-router-dom";
import logo from "../../../../assets/images/logo.svg";

export const ReferralLogo = () => {
  return (
    <div className="RefferalElement u-h7 Heading">
      <div className="RefferalElement__logo">
        <img src={logo} height={130} width={100} alt="Logo" />
        <NavLink
          to="https:/firstincry.com"
          className="Heading Text--highlight u-h5"
        >
          https:/firstincry.com
        </NavLink>
      </div>
    </div>
  );
};
