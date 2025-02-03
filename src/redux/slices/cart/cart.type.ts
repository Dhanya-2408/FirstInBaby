
export interface ICartItem {
  id?: number;
  // mcId: number;
  productName: string;
  price: number;
  imageUrl: string;
  productcolor: string;
  size: string;
  quantity: number;
}

export interface ICartState {
  cartItems: ICartItem[];
  isCartOpen: boolean;
}
