import { FC } from "react";
import classNames from "classnames";
import { SortList } from "../../../models/constants";
import { ISortCollection } from "../../../models/types";
import { DrawerView } from "../../../ui_kits/Drawer/Drawer.compenent";
import { PageOverlay } from "../../../ui_kits/PageOverlay/PageOverlay";
import "./Style.scss";

interface IProps {
  visibleSort: boolean;
  selectedSorter: ISortCollection | undefined;
  handleToggleSort: () => void;
  toggleSortClick: (item: ISortCollection) => void;
}

export const SortDrawer: FC<IProps> = (props: IProps) => {
  const { visibleSort, selectedSorter, handleToggleSort, toggleSortClick } =
    props;

  const PopoverValue = () => (
    <div className="Popover__ValueList u-h5 Heading">
      {SortList.map((item: ISortCollection) => (
        <button
          className={classNames("Popover__Value  Link Link--primary", {
            "is-selected": item.key === selectedSorter?.key,
          })}
          key={item.key}
          onClick={() => toggleSortClick(item)}
        >
          {item.key}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <PageOverlay isVisible={!visibleSort} />
      <DrawerView
        body={<PopoverValue />}
        position="right"
        title="Sort"
        isHidden={visibleSort}
        handleClose={handleToggleSort}
        spacingTight={true}
      />
    </>
  );
};
