export interface IModal {
  modalType: string;
  modalProps?: any;
}

export interface IModalState {
  modalData: IModal | null;
}
