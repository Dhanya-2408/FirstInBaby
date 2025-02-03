import classnames from "classnames";
import { NavLink } from "react-router-dom";
import useHover from "../../hooks/useHover";
import { FC, ReactElement, useRef } from "react";
import { encodeUrl } from "../../utils/textHandler";
import { IMainCategory } from "../../redux/slices/nav/nav.type";

interface IProps {
  item: IMainCategory;
}

const NavItem: FC<IProps> = (props: IProps): ReactElement => {
  const { item } = props;
  const hoverRef = useRef(null);
  const isShown = useHover(hoverRef);

  return (
    <li
      className={classnames("HorizontalList__Item u-h7", {
        "is-expanded": isShown,
        "is-active": isShown,
      })}
      ref={hoverRef}
    >
      <NavLink
        to={`/collections/${encodeUrl(item.name)}`}
        className="Heading"
      >
        {item.name.toUpperCase()}
        <span className="Header__LinkSpacer"> {item.name}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;
