import { AsyncData } from "../../../models/types";
import { IProduct } from "../collection/collection.type";

export interface ICollection {
  name: string;
  id: number;
  url: string;
  murl?: string;
  code: string;
}

export interface IHomeState {
  shopByCollection: AsyncData<ICollection[]>;
  hotDealsCollection: AsyncData<ICollection[]>;
  shopByProducts: AsyncData<ICollection[]>;
  hotProducts: AsyncData<IProduct>;
  featureProducts: AsyncData<IProduct>;
  instaProducts: AsyncData<IProduct>;
}
