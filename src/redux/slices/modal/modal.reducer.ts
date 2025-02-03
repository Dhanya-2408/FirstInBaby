import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./modal.slice";
import { IModal, IModalState } from "./modal.types";

export const modalReducer = {
  openModal: (state: IModalState, { payload }: PayloadAction<IModal>): void => {
    state.modalData = payload;
  },
  closeModal: () => initialState,
};
