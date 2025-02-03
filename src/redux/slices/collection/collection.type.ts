import { AsyncData, ISortCollection } from "../../../models/types";

export interface IProductImage {
  imId: number;
  imageUrl: string;
}

export interface IProductSize {
  sid: number;
  psize: string;
  price: number;
  sku: string;
  qty: number;
  length: number;
  width: number;
  height: number;
}

export interface IProductReview {
  dislike: number;
  like: number;
  name: string;
  rating: number;
  reviews: string;
  rid: number;
  start: number;
  url: string;
}

export interface IProductData1 {
  // brand: string | null;
  childcategory: string | null;
  // date: string;
  // deliveryTime: string | null;
  descpription: string;
  descpription1: string;
  facebook: any;
  group: string | null;
  idto: IProductImage[];
  imageurl: string;
  instagram: any;
  keyword: any;
  linkedin: any;
  maincategory: string;
  mcId: number;
  minqty: number;
  // offer: number;
  phone: string;
  pintrest: any;
  // price: number;
  productcode: string;
  productcolor: string;
  productname: string;
  // relative: any;
  sizechart: string;
  subcategory: string;
  subcategory1: string | null;
  specification: string;
  tax: number;
  twitter: any;
  sizedto: IProductSize[];
  reviews?: IProductReview[];
}


export interface IProductData {
  id: number;
  productName: string;
  offer: number;
  imageUrl: string;
  phone: string | null;
  date: string | null;
  description: string;
  description1: string;
  minQty: number;
  deliveryTime: string | null;
  sizeChart: string | null;
  brand: string | null;
  relative: any;
  modify: string;
  keyword: string | null;
  twitter: string | null;
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  pinterest: string | null;
  collectionNames: string;
  sizes: IProductSize[];
  images: string[];
  sku: string;
  status: string;
  vendorname: string;
  price: number;
  productcolor: string;
  specification: string;
}

export interface IProduct {
  pagenumber: number;
  productdto: IProductData[];
}

export interface IFilterColor {
  fid: number;
  color: string;
  category: string;
  colorcode: string;
  type: string;
}

export interface IFilterSize {
  fid: number;
  sizes: string;
  category: string;
  type: string;
}

export interface IFilter {
  fc: IFilterColor[];
  fs: IFilterSize[];
}

export enum LayoutType {
  Single = "1:1",
  Dual = "2:2",
  Multi = "4:4",
}

export interface ISelectedFilter {
  color: string[];
  sizes: string[];
  price: string;
  discount: string;
  // minprice: number;
  // maxprice: number;
  // minoffer: number;
  // maxoffer: number;
}

export interface ICollectionState {
  allProducts: AsyncData<IProduct>;
  layoutType: LayoutType;
  isSortEnabled: boolean;
  isFilterEnabled: boolean;
  selectedSorter: ISortCollection | undefined;
  selectedFilters: ISelectedFilter | undefined;
  productsByCategory: AsyncData<Record<string, IProduct>>;
  filtersByCategory: AsyncData<Record<string, IFilter>>;
  preorderProducts: AsyncData<IProduct>;
  productsBySearch: AsyncData<IProduct>;
  productsShopByCollection: AsyncData<Record<string, IProduct>>;
}
