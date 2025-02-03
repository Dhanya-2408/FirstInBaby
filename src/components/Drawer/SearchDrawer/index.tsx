import { FC } from "react";
import { SearchForm } from "./SearchForm";
import { DrawerView } from "../../../ui_kits/Drawer/Drawer.compenent";
import { PageOverlay } from "../../../ui_kits/PageOverlay/PageOverlay";
import "./Style.scss";

interface IProps {
  handleClick: () => void;
  visibleSearch: boolean;
}

export const SearchDrawer: FC<IProps> = (props: IProps) => {
  const { handleClick, visibleSearch } = props;

  return (
    <>
      <PageOverlay isVisible={!visibleSearch} />
      <DrawerView
        body={<SearchForm />}
        position="right"
        title="Search Products"
        isHidden={visibleSearch}
        handleClose={handleClick}
        spacingTight={true}
      />
    </>
  );
};
