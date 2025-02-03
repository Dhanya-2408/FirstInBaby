import { FC } from "react";
import { NavLink } from "react-router-dom";
import AccountIcon from "../../../assets/icons/Account.icon";
import FavouriteIcon from "../../../assets/icons/Fav.icon";

interface IProps {
  handleClick: () => void;
}

export const MenuFooter: FC<IProps> = (props: IProps) => {
  const { handleClick } = props;

  return (
    <ul className="HorizontalList HorizontalList--spacingFill">
      <li className="HorizontalList__Item">
        <NavLink
          to="wishlist"
          className="Link Link--primary"
          onClick={handleClick}
        >
          <FavouriteIcon />
        </NavLink>
      </li>
      <li className="HorizontalList__Item">
        <NavLink
          to="account"
          className="Link Link--primary"
          onClick={handleClick}
        >
          <AccountIcon />
        </NavLink>
      </li>
    </ul>
  );
};
