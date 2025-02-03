import { OnclickEvent } from "../../../models/types";
import {
  BUTTON_TYPE_CLASSES,
  TextButton,
} from "../../../ui_kits/Buttons/TextButton/TextButton.component";
import { ButtonGroup } from "../../../ui_kits/Buttons/TextButton/TextButton.styles";
import { DrawerView } from "../../../ui_kits/Drawer/Drawer.compenent";
import { PageOverlay } from "../../../ui_kits/PageOverlay/PageOverlay";
import { FiltersCollection } from "./FiltersCollection";
import "./Style.scss";

interface IProps {
  visibility: boolean;
  toggleFilter: () => void;
  resetFilters: (e: OnclickEvent) => void;
}

export const FilterDrawer = (props: IProps) => {
  const { visibility, toggleFilter, resetFilters } = props;

  return (
    <>
      <PageOverlay isVisible={!visibility} />
      <DrawerView
        body={<FiltersCollection />}
        position="right"
        title="FILTERS"
        isHidden={visibility}
        handleClose={toggleFilter}
        footer={
          <ButtonGroup>
            <TextButton
              buttonType={BUTTON_TYPE_CLASSES.inverted}
              onClick={resetFilters}
            >
              RESET
            </TextButton>
            <TextButton onClick={resetFilters} isExpand>APPLY</TextButton>
          </ButtonGroup>
        }
      />
    </>
  );
};
