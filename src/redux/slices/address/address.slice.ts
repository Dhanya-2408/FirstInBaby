import { createSlice } from "@reduxjs/toolkit";
import { initialAsyncData } from "../../../models/constants";
import { addressReducer, extraAddressDataReducer } from "./address.reducer";
import { IAddressState } from "./address.type";

export const initialState: IAddressState = {
  addresses: [],
  addressList: initialAsyncData,
  openAddAddress: false,
  selectedAddressId: undefined,
  defaultAddressId: undefined,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: addressReducer,
  extraReducers: extraAddressDataReducer,
});

export const {
  setAddresses,
  addNewAddress,
  removeAddress,
  setOpenAddAddress,
  setDefaultAddress,
  setSelectedAddressId,
  setDefaultAddressId,
} = addressSlice.actions;
