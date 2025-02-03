import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const modalSelf = (state: RootState) => state.modal;

export const modalData = createSelector(
  modalSelf,
  (data) => data && data.modalData
);
