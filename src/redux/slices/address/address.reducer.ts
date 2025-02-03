import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchData } from "../../../services/axios";
import toastMessage from "../../../utils/toastMessage";
import { fetchCustomerAsync } from "../profile/profile.reducer";
import { addressService } from "../../../services/axiosServices";
import { IAddress, IAddressState } from "./address.type";
import { closeModal } from "../modal/modal.slice";

export const addAddressAsync = createAsyncThunk<any, any>(
  "address/addAddress",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchData({
        ...addressService.addAddress,
        params: data.address,
      });
      toastMessage("Added Address", "success");
      await dispatch(fetchCustomerAsync(data.user));
      dispatch(closeModal());
      return response;
    } catch (err) {
      toastMessage("Something went wrong, Try again", "error");
      return rejectWithValue(err);
    }
  }
);

export const updateAddressAsync = createAsyncThunk<any, any>(
  "address/updateAddress",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchData({
        ...addressService.updateAddress,
        params: data.address,
      });
      toastMessage("Updated Address", "success");
      await dispatch(fetchCustomerAsync(data.user));
      dispatch(closeModal());
      return response;
    } catch (err) {
      toastMessage("Something went wrong, Try again", "error");
      return rejectWithValue(err);
    }
  }
);

export const deleteAddressAsync = createAsyncThunk<any, any>(
  "address/deleteAddress",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchData({
        ...addressService.deleteAddress,
        url: addressService.deleteAddress.url + data.id,
      });
      toastMessage("Deleted Address", "success");
      await dispatch(fetchCustomerAsync(data.user));
      return response;
    } catch (err) {
      toastMessage("Something went wrong, Try again", "error");
      return rejectWithValue(err);
    }
  }
);

export const extraAddressDataReducer = {};

export const addressReducer = {
  addNewAddress: (
    state: IAddressState,
    { payload }: PayloadAction<IAddress>
  ) => {
    let addressList = [...state.addresses];
    let addressToAdd = payload;
    let exist = addressList.find((item) => item.id === addressToAdd.id);

    if (exist) {
      state.addresses = addressList.map((item) => {
        if (item.id === addressToAdd.id) return { ...payload };
        else return item;
      });
    } else {
      state.addresses = [...addressList, addressToAdd];
    }
  },

  removeAddress: (
    state: IAddressState,
    { payload: addressId }: PayloadAction<number>
  ) => {
    state.addresses = state.addresses.filter(
      (address) => address.id !== addressId
    );
  },
  setAddresses: (
    state: IAddressState,
    { payload: addresses }: PayloadAction<Array<IAddress>>
  ) => {
    state.addresses = addresses;
  },
  setDefaultAddress: (
    state: IAddressState,
    { payload: addressId }: PayloadAction<number>
  ) => {
    state.addresses = state.addresses.map((item) => {
      return { ...item, isDefault: item.id === addressId ? true : false };
    });
  },
  setOpenAddAddress: (
    state: IAddressState,
    { payload }: PayloadAction<boolean>
  ) => {
    state.openAddAddress = payload;
  },
  setDefaultAddressId: (
    state: IAddressState,
    { payload }: PayloadAction<number | undefined>
  ) => {
    state.defaultAddressId = payload;
  },
  setSelectedAddressId: (
    state: IAddressState,
    { payload }: PayloadAction<number | undefined>
  ) => {
    state.selectedAddressId = payload;
  },
};
