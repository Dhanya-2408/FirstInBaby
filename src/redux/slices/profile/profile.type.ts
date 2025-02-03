import { AsyncData } from "../../../models/types";
import { IAddress } from "../address/address.type";

export enum profileMenu {
  "home" = "Profile Home",
  "profile" = "My Profile",
  "orders" = "My Orders",
  "address" = "My Address",
  "subscribe" = "subscribe",
  "refer_earn" = "REFER AND EARN",
  "help" = "Help",
  "coupons" = "My Coupons",
  "rewards" = "My Rewards",
}

export interface ICustomer {
  userid: number;
  uPhone: string;
  fname: string;
  lname: string;
  iUmg: string;
  email: string;
  expiry: string;
  userReferral: string;
  affiliateCode: string;
  password: string;
  plan: string;
  status: boolean;
  addressTemp: IAddress[];
  enabled: boolean;
}

export interface IPlan {
  planID: number;
  planName: string;
  planAmount: number;
  bonusPercentage: number;
  imageUrl: string;
}

export interface IOrderItem {
  id: number;
  orderItemId: number;
  name: string;
  quantity: number;
  subt: number;
  itemType: string;
  size: string;
  color: null | string;
  imgUrl: string;
  taxAmount: number;
  deliveryCharge: number;
  orderId: number;
}

export interface IOrderCollection {
  date: string;
  ordercode: any;
  idto: IOrderItem[];
  orderid: number;
  paymentStatus: string;
  price: number;
  status: string;
  tnxid: string;
  userId: string;
}

export interface IOrder {
  pagenumber: number;
  orderdto: IOrderCollection[];
}

export interface ISubscribedPlan {
  id: number;
  cusId: string;
  plan: string;
  status: string;
  date: string;
}

export interface IProfileState {
  profilePage: profileMenu;
  customer: AsyncData<ICustomer>;
  plans: AsyncData<IPlan[]>;
  orders: AsyncData<IOrder>;
  subscribedPlan: AsyncData<ISubscribedPlan>;
}
