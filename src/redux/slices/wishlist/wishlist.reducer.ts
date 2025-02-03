import { IWishlistState } from "./wishlist.type";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IProductData } from "../collection/collection.type";
import { fetchData } from "../../../services/axios";
import { favService } from "../../../services/axiosServices";
import toastMessage from "../../../utils/toastMessage";

export const addFavAsync = createAsyncThunk<
  IProduct[],
  {
    phone: string;
    mcid: number;
  }
>("fav/addToFav", async (data, { rejectWithValue, dispatch }) => {
  try {
    const response = (await fetchData({
      ...favService.addFavourites,
      params: data,
    })) as IProduct[];
    toastMessage("Updated Wishlist", "success");
    dispatch(getFavAsync(data.phone));
    return response;
  } catch (err) {
    toastMessage("Something went wrong, Try again", "error");
    return rejectWithValue(err);
  }
});

export const getFavAsync = createAsyncThunk<IProduct[], string>(
  "fav/getFav",
  async (email, { rejectWithValue }) => {
    try {
      const response = (await fetchData({
        ...favService.getFavourites,
        params: { email },
      })) as IProduct[];
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const extraWishlistReducer = {
  [getFavAsync.pending.type]: (state: IWishlistState) => {
    state.wishlistItems.loading = true;
  },
  [getFavAsync.fulfilled.type]: (
    state: IWishlistState,
    { payload }: PayloadAction<Array<IProductData>>
  ) => {
    state.wishlistItems.loading = false;
    state.wishlistItems.data = payload;
  },
  [getFavAsync.rejected.type]: (state: IWishlistState) => {
    state.wishlistItems.loading = false;
    state.wishlistItems.error = "Error while fetching collections";
  },
};

export const wishlistReducer = {
  addFavToCartOpen: (
    state: IWishlistState,
    { payload }: PayloadAction<boolean>
  ) => {
    state.isFavAddCartOpen = payload;
  },
  setWishlistItem: (
    state: IWishlistState,
    { payload }: PayloadAction<IProductData | undefined>
  ) => {
    state.wishlistItem = payload;
  },
};
