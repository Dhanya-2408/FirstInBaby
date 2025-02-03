import { FC, Fragment } from "react";
import { useAppDispatch } from "../../../redux/store";
import { FormSelectInput } from "../../../ui_kits/Form";
import { profileMenu } from "../../../redux/slices/profile/profile.type";
import { setProfilePage } from "../../../redux/slices/profile/profile.slice";
import { useAuth } from "../../../contexts/AuthContext";
import { IconButton } from "../../../ui_kits/Buttons/IconButton/IconButton.component";
import { LogoutIcon } from "../../../assets/icons/Logout.icon";

interface IProps {
  options: Array<profileMenu>;
  selectedValue: profileMenu;
}

export const AccountNav: FC<IProps> = (props: IProps) => {
  const { options, selectedValue } = props;
  const dispatch = useAppDispatch();

  const { logout } = useAuth();

  const handleSelectChange = (name: string, option: string) => {
    dispatch(setProfilePage(option as profileMenu));
  };

  return (
    <Fragment>
      <FormSelectInput
        isTransparent
        name="Profile"
        value={selectedValue}
        options={options}
        onSelect={handleSelectChange}
      />
      <IconButton isSmall onClick={logout}>
        <LogoutIcon />
      </IconButton>
    </Fragment>
  );
};
