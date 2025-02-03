import { AsyncData } from "../../../models/types";
import { IProduct, IProductData } from "../collection/collection.type";

export interface IWishlistState {
  isFavAddCartOpen: boolean;
  wishlistItems: AsyncData<Array<IProductData>>;
  wishlistItem: IProductData | undefined;
}
