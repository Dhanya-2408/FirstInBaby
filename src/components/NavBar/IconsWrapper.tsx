import { FC } from "react";
import { NavLink } from "react-router-dom";
import AccountIcon from "../../assets/icons/Account.icon";
import { CartDesktopIcon, CartMobileIcon } from "../../assets/icons/Cart.icon";
import FavouriteIcon from "../../assets/icons/Fav.icon";
import {
  SearchDesktopIcon,
  SearchMobileIcon,
} from "../../assets/icons/Search.icon";
import { selectCartItems } from "../../redux/slices/cart/cart.selector";
import { wishlistItems } from "../../redux/slices/wishlist/wishlist.selector";
import { useAppSelector } from "../../redux/store";
import { IF } from "../../ui_kits/IF";
import { isEmpty } from "../../utils/script";

interface IProps {
  handleClick: () => void;
}

const IconsWrapper: FC<IProps> = (props: IProps) => {
  const { handleClick } = props;
  const cartItems = useAppSelector(selectCartItems);
  const { data: favItems } = useAppSelector(wishlistItems);

  return (
    <div className="Header__FlexItem Header__FlexItem--fill">
      <NavLink
        to="wishlist"
        className="Header__Icon Icon-Wrapper--clickable hidden-phone"
      >
        <FavouriteIcon />
        <IF condition={!isEmpty(favItems)}>
          <span className="Header__CartDot is-visible"></span>
        </IF>
      </NavLink>

      <NavLink
        to="/account"
        className="Header__Icon Icon-Wrapper--clickable hidden-phone"
      >
        <AccountIcon />
      </NavLink>
      <div
        className="Header__Icon Icon-Wrapper--clickable "
        onClick={handleClick}
      >
        <span className="hidden-tablet-and-up">
          <SearchMobileIcon />
        </span>
        <span className="hidden-phone">
          <SearchDesktopIcon />
        </span>
      </div>

      <NavLink to="/cart" className="Header__Icon  Icon-Wrapper--clickable ">
        <span className="hidden-tablet-and-up">
          <CartMobileIcon />
        </span>
        <span className="hidden-phone">
          <CartDesktopIcon />
        </span>
        <IF condition={!isEmpty(cartItems)}>
          <span className="Header__CartDot is-visible"></span>
        </IF>
      </NavLink>
    </div>
  );
};

export default IconsWrapper;
