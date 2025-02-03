import { profileMenu } from "../redux/slices/profile/profile.type";
import Recommendations from "../assets/images/profile/Recommdation.png";
import SavedItem from "../assets/images/profile/SavedItem.png";

export interface IProfileData {
  title: string;
  description: string;
  url: profileMenu;
  img?: string;
}

export const ProfileInfoNav: IProfileData[] = [
  {
    title: "Account Settings",
    url: profileMenu.profile,
    description: "Manage profile and preferences.",
    img: Recommendations,
  },
  {
    title: "My Orders",
    url: profileMenu.orders,
    description: "Manage and edit your orders.",
    img: SavedItem,
  },
];

export const ProfileAccouctNav: IProfileData[] = [
  {
    title: "Address Book",
    description: "Manage shipping & billing addresses.",
    url: profileMenu.address,
  },
  {
    title: "Subscribe",
    description: "Subscribe to get more offers.",
    url: profileMenu.subscribe,
  },
  {
    title: "Refer and Earn",
    description: "Refer your friends and get cashback.",
    url: profileMenu.refer_earn,
  },
  {
    title: "Help",
    description: "Ask your queries.",
    url: profileMenu.help,
  },
];
