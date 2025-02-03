import "./Style.scss";
import { forwardRef } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import NavWrapper from "../../components/NavBar/NavWrapper";
import LogoWrapper from "../../components/NavBar/LogoWrapper";
import useScrollPosition from "../../hooks/useScrollPosition";
import IconsWrapper from "../../components/NavBar/IconsWrapper";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { SearchDrawer } from "../../components/Drawer/SearchDrawer";
import { MenuDrawer } from "../../components/Drawer/MenuDrawer/MenuDrawer";
import {
  isMenuDrawHidden,
  isSearchDrawHidden,
} from "../../redux/slices/nav/nav.selector";
import {
  setMenuDrawHidden,
  setSearchDrawHidden,
  setSearchText,
} from "../../redux/slices/nav/nav.slice";

export const NavBar = forwardRef<HTMLDivElement>((_, ref) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const path = pathname.split("/").filter(Boolean)[0];
  const { scrollPosition } = useScrollPosition();

  const isSearchHidden = useAppSelector(isSearchDrawHidden);
  const isMenuHidden = useAppSelector(isMenuDrawHidden);

  const handleMenuIconClick = () => {
    dispatch(setMenuDrawHidden(!isMenuHidden));
  };

  const handleSearchIconClick = () => {
    dispatch(setSearchText(undefined));
    dispatch(setSearchDrawHidden(!isSearchHidden));
  };

  const stickyPath = ["home"];

  return (
    <div
      className={classNames("Snugglz__Header--Section", {
        sticky: stickyPath.includes(path),
      })}
      ref={ref}
    >
      <MenuDrawer
        visibleMenu={isMenuHidden}
        handleClick={handleMenuIconClick}
      />
      <SearchDrawer
        visibleSearch={isSearchHidden}
        handleClick={handleSearchIconClick}
      />
      <header
        className={classNames("Header", {
          "Header--transparent": !scrollPosition,
        })}
      >
        <div className="Header__Wrapper">
          <NavWrapper handleClick={handleMenuIconClick} />
          <LogoWrapper />
          <IconsWrapper handleClick={handleSearchIconClick} />
        </div>
      </header>
    </div>
  );
});
