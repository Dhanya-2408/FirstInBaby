import { fetchData } from "../../../services/axios";
import { ISortCollection } from "../../../models/types";
import { productService } from "../../../services/axiosServices";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ICollectionState,
  IFilter,
  IProduct,
  ISelectedFilter,
  LayoutType,
} from "./collection.type";

export const fetchAllProductsAsync = createAsyncThunk(
  "collection/getAllProducts",
  async (_arg, { rejectWithValue }) => {
    try {
      const response = await fetchData(productService.getAllProducts);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchPreorderProductsAsync = createAsyncThunk<IProduct, any>(
  "collection/getPreOrderProducts",
  async (data, { rejectWithValue }) => {
    try {
      const response = (await fetchData({
        ...productService.getPreOrderProducts,
        params: data,
      })) as IProduct;
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchProductsByCategoryAsync = createAsyncThunk<any, any>(
  "collection/getProductsByCategory",
  async (data, { rejectWithValue }) => {
    const {method, url} = productService.getProductsByCategory;
    const {mt, offset,pagesize} = data;
    try {
      const response = (await fetchData({
        method,
        url : `${url}/${mt}/${offset}/${pagesize}`
        // params: data,
      })) as IProduct[];

      return {
        key: data.mt,
        value: response,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchFiltersByCategoryAsync = createAsyncThunk<any, string>(
  "collection/getFiltersByCategory",
  async (mt, { rejectWithValue }) => {
    try {
      const response = (await fetchData({
        ...productService.getFiltersByCategory,
        params: { mt },
      })) as IFilter;

      return {
        key: mt,
        value: response,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchProductsBySearchAsync = createAsyncThunk<IProduct, any>(
  "collection/getProductsBySearch",
  async (data, { rejectWithValue }) => {
    try {
      const response = (await fetchData({
        ...productService.getSearch,
        params: data,
      })) as IProduct;

      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchShopbyCollectionAsync = createAsyncThunk<any, any>(
  "collection/getProductsByShopbyCollection",
  async (data, { rejectWithValue }) => {
    try {
      const response = (await fetchData({
        ...productService.getProductsByCollection,
        params: data,
      })) as IProduct;

      return {
        key: data.collection,
        value: response,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const extracollectionReducer = {
  [fetchAllProductsAsync.pending.type]: (state: ICollectionState) => {
    state.allProducts.loading = true;
  },
  [fetchAllProductsAsync.fulfilled.type]: (
    state: ICollectionState,
    { payload }: PayloadAction<IProduct>
  ) => {
    state.allProducts.loading = false;
    state.allProducts.data = payload;
  },
  [fetchAllProductsAsync.rejected.type]: (state: ICollectionState) => {
    state.allProducts.loading = false;
    state.allProducts.error = "Error while fetching all products";
  },

  [fetchPreorderProductsAsync.pending.type]: (state: ICollectionState) => {
    state.preorderProducts.loading = true;
  },
  [fetchPreorderProductsAsync.fulfilled.type]: (
    state: ICollectionState,
    { payload }: PayloadAction<IProduct>
  ) => {
    state.preorderProducts.loading = false;
    state.preorderProducts.data = payload;
  },
  [fetchPreorderProductsAsync.rejected.type]: (state: ICollectionState) => {
    state.preorderProducts.loading = false;
    state.preorderProducts.error = "Error while fetching preorder products";
  },
  [fetchProductsByCategoryAsync.pending.type]: (state: ICollectionState) => {
    state.productsByCategory.loading = true;
  },
  [fetchProductsByCategoryAsync.fulfilled.type]: (
    state: ICollectionState,
    {
      payload,
    }: PayloadAction<{
      key: string;
      value: IProduct;
    }>
  ) => {
    state.productsByCategory.loading = false;
    const data = state.productsByCategory.data || {};
    const groupedProducts = {
      ...data,
      [payload.key]: payload.value,
    };
    state.productsByCategory.data = groupedProducts;
  },
  [fetchProductsByCategoryAsync.rejected.type]: (state: ICollectionState) => {
    state.productsByCategory.loading = false;
    state.productsByCategory.error =
      "Error while fetching products by category";
  },
  [fetchFiltersByCategoryAsync.pending.type]: (state: ICollectionState) => {
    state.filtersByCategory.loading = true;
  },
  [fetchFiltersByCategoryAsync.fulfilled.type]: (
    state: ICollectionState,
    {
      payload,
    }: PayloadAction<{
      key: string;
      value: IFilter;
    }>
  ) => {
    state.filtersByCategory.loading = false;
    const data = state.filtersByCategory.data || {};
    const groupedProducts = {
      ...data,
      [payload.key]: payload.value,
    };
    state.filtersByCategory.data = groupedProducts;
  },
  [fetchFiltersByCategoryAsync.rejected.type]: (state: ICollectionState) => {
    state.filtersByCategory.loading = false;
    state.filtersByCategory.error = "Error while fetching filters by category";
  },
  [fetchProductsBySearchAsync.pending.type]: (state: ICollectionState) => {
    state.productsBySearch.loading = true;
  },
  [fetchProductsBySearchAsync.fulfilled.type]: (
    state: ICollectionState,
    { payload }: PayloadAction<IProduct>
  ) => {
    state.productsBySearch.loading = false;
    state.productsBySearch.data = payload;
  },
  [fetchProductsBySearchAsync.rejected.type]: (state: ICollectionState) => {
    state.productsBySearch.loading = false;
    state.productsBySearch.error = "Error while fetching products by search";
  },
  [fetchShopbyCollectionAsync.pending.type]: (state: ICollectionState) => {
    state.productsShopByCollection.loading = true;
  },
  [fetchShopbyCollectionAsync.fulfilled.type]: (
    state: ICollectionState,
    {
      payload,
    }: PayloadAction<{
      key: string;
      value: IProduct;
    }>
  ) => {
    state.productsShopByCollection.loading = false;
    const data = state.productsShopByCollection.data || {};
    const groupedProducts = {
      ...data,
      [payload.key]: payload.value,
    };
    state.productsShopByCollection.data = groupedProducts;
  },
  [fetchShopbyCollectionAsync.rejected.type]: (state: ICollectionState) => {
    state.productsShopByCollection.loading = false;
    state.productsShopByCollection.error =
      "Error while fetching products by shopby collection";
  },
};

export const collectionReducer = {
  setLayoutType: (
    state: ICollectionState,
    { payload }: PayloadAction<LayoutType>
  ): void => {
    state.layoutType = payload;
  },
  setSorterVisibility: (
    state: ICollectionState,
    { payload }: PayloadAction<boolean>
  ): void => {
    state.isSortEnabled = payload;
  },
  setFilterVisibility: (
    state: ICollectionState,
    { payload }: PayloadAction<boolean>
  ): void => {
    state.isFilterEnabled = payload;
  },
  setSelectedSorter: (
    state: ICollectionState,
    { payload }: PayloadAction<ISortCollection | undefined>
  ): void => {
    state.selectedSorter = payload;
  },
  setSelectedFilter: (
    state: ICollectionState,
    { payload }: PayloadAction<ISelectedFilter | undefined>
  ): void => {
    state.selectedFilters = payload;
  },
};
