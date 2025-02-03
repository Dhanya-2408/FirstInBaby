import { AsyncData } from "../../../models/types";

export interface IAddress {
  id: number;
  name: string;
  phone: string;
  email: string;
  flatNo: string;
  street: string;
  state: string;
  city: string;
  pin: string;
  landMark: string;
  isDefault: boolean;
}

export interface IAddressData {
  address: IAddress[];
  uName: string;
  uPhone: string;
  userid: number;
}

export interface IAddressState {
  addresses: IAddress[];
  addressList: AsyncData<IAddressData>;
  openAddAddress: boolean;
  selectedAddressId: number | undefined;
  defaultAddressId: number | undefined;
}
