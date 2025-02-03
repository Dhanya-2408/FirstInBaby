import { IF } from "../../ui_kits/IF";
import { NavLink } from "react-router-dom";
import { isEmpty } from "../../utils/script";
import { encodeUrl } from "../../utils/textHandler";
import { getOfferPrice } from "../../utils/generics";
import { Price } from "../../ui_kits/global/Price.styles";
import { IProductData } from "../../redux/slices/collection/collection.type";

interface IProps {
  product: IProductData;
}

export const ProductInfo = (props: IProps) => {
  const { product } = props;
  const { productName,price , offer } = product;

  return (
    <div className="ProductItem__Info">
      <NavLink
        to={`/product/${encodeUrl(product.productName)}/${product.id}`}
        className="ProductItem__Title Heading"
      >
        {productName}
      </NavLink>
      <div className="ProductItem__PriceList Heading u-h5">
        <Price highlight>Rs.{price}</Price>
        <IF condition={!isEmpty(offer)}>
          <Price compareAt>Rs.{getOfferPrice(price, offer)}</Price>
        </IF>
      </div>
    </div>
  );
};
