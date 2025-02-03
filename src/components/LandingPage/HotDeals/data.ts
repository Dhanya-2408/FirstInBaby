import { ICollection } from "../../../redux/slices/home/home.type";
import { Deal1, Deal2, Deal3, Deal4 } from "../../../assets/images/hot_deals";

export const hotDealsData: ICollection[] = [
  {
    name: "Upto 20% OFF",
    url: Deal1,
    code: "New In",
    id : 1,
  },
  {
    name: "30-40% Off",
    url: Deal2,
    code: "Back in Stock",
    id : 2,
  },
  {
    name: "Min 50% Off",
    url: Deal3,
    code: "Half Price Store",
   id : 3,
  },
  {
    code: "Joyful Stock",
    name: "Upto 60% OFF",
    url: Deal4,
    id : 4,
  },
];
