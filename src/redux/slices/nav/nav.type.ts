import { AsyncData } from "../../../models/types";

export interface ICategory {
  id: number;
  mainCategoryId: number;
  name: string;
  url: string;
  collections: string;
}

export interface IMainCategory extends ICategory {
  subcategories : ICategory[]
}

export interface INavState {
  categories: AsyncData<IMainCategory[]>;
  isMenuDrawHidden: boolean;
  isSearchDrawHidden: boolean;
  searchText: string | undefined;
}
