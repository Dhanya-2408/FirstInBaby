import "./CartItemList.scss";
import { CartItem } from "./CartItem";
import { useAppSelector } from "../../../redux/store";
import { ICartItem } from "../../../redux/slices/cart/cart.type";
import { selectCartItems } from "../../../redux/slices/cart/cart.selector";

export default function CartItemList() {
  const cartList = useAppSelector(selectCartItems);

  return (
    <div className="Cart__ItemList">
      <div className="Cart__Head hidden-phone">
        <span className="Cart__HeadItem Heading Text--subdued u-h7">
          Product
        </span>
        <span className="Cart__HeadItem"></span>
        <span
          className="Cart__HeadItem Heading Text--subdued u-h7"
          style={{ textAlign: "center" }}
        >
          Quantity
        </span>
        <span
          className="Cart__HeadItem Heading Text--subdued u-h7"
          style={{ textAlign: "right" }}
        >
          Total
        </span>
      </div>
      {cartList &&
        cartList.map((item: ICartItem) => (
          <CartItem key={`${item.productName}-${item.size}`} cartItem={item} />
        ))}
    </div>
  );
}
