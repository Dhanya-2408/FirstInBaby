import React from "react";
import { IF } from "../../../ui_kits/IF";
import { Flashsale } from "../../FlashSale";
import { Specification } from "./Specification";
import { getOfferPrice } from "../../../utils/generics";
import { Price } from "../../../ui_kits/global/Price.styles";
import { isEmpty, isFutureDate } from "../../../utils/script";
import { IProductData } from "../../../redux/slices/collection/collection.type";


interface IProps {
  product: IProductData;
}

export const ProductMeta: React.FC<IProps> = (props: IProps) => {
  const { productName, price, offer, description, specification, date } =
    props.product;

  const isValidDate = isFutureDate(date);

  return (
    <div className="ProductMeta Heading">
      <h2>{productName}</h2>
      <div className="ProductMeta__PriceList u-h4">
        <Price highlight>Rs. {price}</Price>
        <IF condition={!isEmpty(offer)}>
          <Price compareAt isLarge>
            Rs.{getOfferPrice(price, offer)}
          </Price>
        </IF>
      </div>
      {!isValidDate && date && <Flashsale endDate={date} />}
      <div className="Product__Description">{description}</div>
      <IF condition={!isEmpty(specification)}>
        <div className="Product__Description">
          <Specification productSpecification={specification} />
        </div>
      </IF>
    </div>
  );
};
