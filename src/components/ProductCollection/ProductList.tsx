import { FC } from "react";
import LazyLoad from "../../ui_kits/LazyComponent";
import { ProductView } from "../../models/constants";
import { ProductItem } from "../ProductItem/ProductItem";
import {
  IProductData,
  LayoutType,
} from "../../redux/slices/collection/collection.type";

interface IProps {
  ProductData: IProductData[] | null;
  layoutType?: LayoutType;
}

export const ProductsList: FC<IProps> = (props: IProps) => {
  const { layoutType, ProductData } = props;
  const selectedView = layoutType
    ? ProductView[layoutType]
    : ProductView["1:1"];

  return (
    <div className="CollectionInner__Products">
      <div
        className="ProductList--grid ProductList--removeMargin Grid"
        data-mobile-count={selectedView["data-mobile-count"]}
        data-desktop-count={selectedView["data-desktop-count"]}
      >
        {ProductData &&
          ProductData.map((product: IProductData) => (
            <LazyLoad
              tag="div"
              key={product.id}
              className={selectedView.class}
            >
              <ProductItem
                product={product}
                label={`${product.offer}% OFF`}
                isVisibleFav
              />
            </LazyLoad>
          ))}
      </div>
    </div>
  );
};
