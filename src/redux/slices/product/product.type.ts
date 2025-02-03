import { AsyncData } from "../../../models/types";
import { IProductData } from "../collection/collection.type";

export interface IProductVariants {
  id?: number;
  // mcId: number;
  productName: string;
  price: number;
  imageUrl: string;
  productcolor: string;
  size: string;
  quantity: number;
}

export interface IReview {
  id: number;
  rid: number;
  name: string;
  reviews: string;
  rating: number;
  url: string;
  mcid: number;
}

export interface IProductState {
  reviews: AsyncData<IReview[]>;
  isReviewEnabled: boolean;
  isVisibleSizechart: boolean;
  selectedProduct: AsyncData<IProductData>;
  productVariants: IProductVariants | undefined;
}
