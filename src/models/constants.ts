import { ISortData } from "./types";
import { IProductData } from "../redux/slices/collection/collection.type";

export const ProductView = {
  "4:4": {
    "data-desktop-count": 4,
    "data-mobile-count": 2,
    class: "Grid__Cell 1/2--phone 1/3--tablet-and-up  1/4--desk",
  },
  "2:2": {
    "data-desktop-count": 3,
    "data-mobile-count": 2,
    class: "Grid__Cell 1/2--phone  1/2--tablet-and-up 1/3--desk",
  },
  "1:1": {
    "data-desktop-count": 4,
    "data-mobile-count": 1,
    class: "Grid__Cell 1/1--phone 1/3--tablet-and-up 1/4--desk",
  },
};

export const initialAsyncData = {
  loading: false,
  error: null,
  data: null,
};

export const initialFormState = {
  errors: {},
  helperText: "",
  submitSuccess: false,
  isButtonLoading: false,
};

export const STRIPE_TEST_KEY =
  "pk_test_51LjdsLSCHGCHmfiJ83b2Tttxqt1QW3aP5OvYsXhDuKU9a4sGmxgH5jFM3eXyiOqt5KlUq6vnPyOLYirx3aQLc48200c7r3r6BV";

export const STRIPE_KEY =
  "pk_live_51KlAqNSDva7aeTENfNh8HxAlbWFDCYrKhVVd3jwqOjeu7t0VUSE4k0sCIje5i8X1mgibdpden8TcbS9nV9LfirGt00Ngugs83n";

export const CLIENT_TEST_SECRET =
  "sk_test_51LjdsLSCHGCHmfiJG7cnjAvMoXNNu5d2jhdcVvV28Vjep73pRCzMr1blWn5c6MQdHa2spmaK0iyDOsk89U6msdyS00Ols3AsP0";

export const SortList: ISortData<IProductData>[] = [
  {
    key: "Featured",
    field: "offer",
    isDescending: false,
  },
  // {
  //   key: "Best selling",
  //   field: "",
  //   isDescending: false,
  // },
  {
    key: "Date, new to old",
    field: "date",
    isDescending: false,
  },
  {
    key: "Date, old to new",
    field: "date",
    isDescending: true,
  },
  {
    key: "Price, high to low",
    field: "price",
    isDescending: true,
  },
  {
    key: "Price, low to high",
    field: "price",
    isDescending: false,
  },
  {
    key: "Alphabetically, A-Z",
    field: "productName",
    isDescending: false,
  },
  {
    key: "Alphabetically, Z-A",
    field: "productName",
    isDescending: true,
  },
];
