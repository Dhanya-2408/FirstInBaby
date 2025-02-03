
import { Coords, Dresses, Footwear, Mens, NewArraivals, Tops } from "../../../assets/images/collections";
import { ICollection } from "../../../redux/slices/home/home.type";


export const collectionsData: ICollection[] = [
  {
    code: "Best Summer Collection",
    name: "Dresses",
    url: Dresses,
    id : 1,
  },
  {
    code: "Funky Summer Wear",
    name: "Men's Wear",
    url: Mens,
    id : 2,
  },
  {
    code: "Bestselling Collection",
    name: "Tops and Maxi Dresses",
    url: Tops,
    id : 3,
  },
  {
    code: "Simply Wow !",
    name: "Coord Sets",
    url: Coords,
    id : 4,
  },
  {
    code: "The Poshaffair",
    name: "Footwear",
    url: Footwear,
    id : 5,
  },
  {
    code: "Fresh from our Creative Closet",
    name: "New Arrivals",
    url: NewArraivals,
    id : 6,
  },
];