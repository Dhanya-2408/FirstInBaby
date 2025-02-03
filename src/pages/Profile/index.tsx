import React from "react";
import { IF } from "../../ui_kits/IF";
import { objectKeys } from "../../utils/generics";
import { AccountNav } from "../../components/Profile/AccountNav";
import { useAppSelector } from "../../redux/store";
import { ProfileHome } from "../../components/Profile/ProfileHome";
import { profileMenu } from "../../redux/slices/profile/profile.type";
import { MyProfile } from "../../components/Profile/MainContent/MyProfile";
import { selectedProfilePage } from "../../redux/slices/profile/profile.selector";
import { MyCoupons } from "../../components/Profile/MainContent/MyCoupons";
import { MyRewards } from "../../components/Profile/MainContent/MyRewards";
import { AddressContainer } from "../../components/Address/AddressContainer";
import { Help } from "../../components/Profile/MainContent/Help";
import { Subscribe } from "../../components/Profile/MainContent/Subscribe";
import { MyOrders } from "../../components/Profile/MainContent/MyOrders";
import "./Style.scss";
import { ReferAndEarn } from "../../components/Profile/MainContent/ReferAndEarn";

const profileLookup: Record<profileMenu, any> = {
  [profileMenu.home]: ProfileHome,
  [profileMenu.profile]: MyProfile,
  [profileMenu.address]: AddressContainer,
  [profileMenu.orders]: MyOrders,
  [profileMenu.refer_earn]: ReferAndEarn,
  [profileMenu.subscribe]: Subscribe,
  [profileMenu.help]: Help,
  [profileMenu.coupons]: MyCoupons,
  [profileMenu.rewards]: MyRewards,
};

export const profileOptions = objectKeys(profileLookup);

const Profile = () => {
  const currentModal = useAppSelector(selectedProfilePage);
  let renderedProfilePage;

  if (currentModal) {
    const ProfileComponent = profileLookup[
      currentModal
    ] as typeof React.Component;
    renderedProfilePage = <ProfileComponent />;
  }

  return (
    <div className="Profile">
      <IF condition={currentModal === profileMenu.home}>
        {renderedProfilePage}
      </IF>
      <IF condition={currentModal !== profileMenu.home}>
        <div className="Dashbord__Container">
          <div className="Dashbord__Rows">
            <div className="Dashbord__SideNav">
              <AccountNav
                options={profileOptions}
                selectedValue={currentModal}
              />
            </div>
            <div className="Dashbord__Main">{renderedProfilePage}</div>
          </div>
        </div>
      </IF>
    </div>
  );
};

export default Profile;
