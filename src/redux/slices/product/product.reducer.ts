import { fetchData } from "../../../services/axios";
import { initialAsyncData } from "../../../models/constants";
import { productService } from "../../../services/axiosServices";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IProductData } from "../collection/collection.type";
import { IProductState, IProductVariants, IReview } from "./product.type";

export const fetchSingleProductAsync = createAsyncThunk<IProduct, number>(
  "product/getSingleProduct",
  async (mcid, { rejectWithValue }) => {
    try {
      const response = (await fetchData({
        ...productService.singleProduct,
        params: { productid: mcid },
      })) as IProduct;
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchReviewsAsync = createAsyncThunk<IReview[], number>(
  "product/getReviews",
  async (mcid, { rejectWithValue }) => {
    try {
      const response = (await fetchData({
        ...productService.getReviews,
        url: `${productService.getReviews.url}/${mcid}/0/100`,
      })) as IReview[];
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const productReducer = {
  setSizechartVisibility: (
    state: IProductState,
    { payload }: PayloadAction<boolean>
  ): void => {
    state.isVisibleSizechart = payload;
  },
  setSelectedProduct: (
    state: IProductState,
    { payload }: PayloadAction<IProductData>
  ): void => {
    state.selectedProduct = {
      ...initialAsyncData,
      data: payload,
    };
  },
  setProductVariants: (
    state: IProductState,
    { payload }: PayloadAction<IProductVariants>
  ): void => {
    state.productVariants = payload;
  },
  setReviewEnabled: (
    state: IProductState,
    { payload }: PayloadAction<boolean>
  ): void => {
    state.isReviewEnabled = payload;
  },
};

export const extraProductReducer = {
  [fetchSingleProductAsync.pending.type]: (state: IProductState) => {
    state.selectedProduct.loading = true;
  },
  [fetchSingleProductAsync.fulfilled.type]: (
    state: IProductState,
    { payload }: PayloadAction<IProductData>
  ) => {
    state.selectedProduct.loading = false;
    state.selectedProduct.data = payload;
  },
  [fetchSingleProductAsync.rejected.type]: (state: IProductState) => {
    state.selectedProduct.loading = false;
    state.selectedProduct.error = "Error while fetching collections";
  },
  [fetchReviewsAsync.pending.type]: (state: IProductState) => {
    state.reviews.loading = true;
  },
  [fetchReviewsAsync.fulfilled.type]: (
    state: IProductState,
    { payload }: PayloadAction<IReview[]>
  ) => {
    state.reviews.loading = false;
    state.reviews.data = payload;
  },
  [fetchReviewsAsync.rejected.type]: (state: IProductState) => {
    state.reviews.loading = false;
    state.reviews.error = "Error while fetching collections";
  },
};
