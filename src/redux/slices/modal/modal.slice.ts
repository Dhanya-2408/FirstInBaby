import { createSlice } from "@reduxjs/toolkit";
import { modalReducer } from "./modal.reducer";
import { IModalState } from "./modal.types";

export const initialState: IModalState = {
  modalData: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: modalReducer,
});

export const { openModal, closeModal } = modalSlice.actions;
