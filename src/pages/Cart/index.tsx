import CartFooter from "../../components/Cart/CartFooter/CartFooter";
import CartItemList from "../../components/Cart/CartItemList/CartItemList";
import { selectCartItems } from "../../redux/slices/cart/cart.selector";
import { useAppSelector } from "../../redux/store";
import { Container } from "../../ui_kits/global/Container.styles";
import {
  PageContent,
  PageHeader,
} from "../../ui_kits/global/PageContent.styles";
import EmptyCart from "../../assets/images/EmptyCart.png";
import { EmptyContainer } from "../../components/EmptyContainer";

const Cart = () => {
  const cartList = useAppSelector(selectCartItems);

  if (!cartList.length) {
    return (
      <PageContent>
        <EmptyContainer
          url={EmptyCart}
          head=" Your shopping bag is empty!"
          subhead="Looks like you haven’t added anything to your bag. Let’s change that."
        />
      </PageContent>
    );
  }

  return (
    <Container isNarrow>
      <PageHeader>
        <h3 className="Heading Text--alignCenter">My Cart</h3>
      </PageHeader>
      <form action="/cart" className="Cart Cart--expanded" noValidate>
        <CartItemList />
        <CartFooter />
      </form>
    </Container>
  );
};

export default Cart;
