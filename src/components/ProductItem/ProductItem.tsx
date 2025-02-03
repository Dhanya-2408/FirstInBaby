import { IF } from "../../ui_kits/IF";
import { Timer } from "../Timer/Timer";
import { ProductInfo } from "./ProductInfo";
import { useLocation } from "react-router-dom";
import { OnclickEvent } from "../../models/types";
import { isFutureDate } from "../../utils/script";
import { useAppDispatch } from "../../redux/store";
import RemoveIcon from "../../assets/icons/Remove.icon";
import { AddFavIcon } from "../../assets/icons/AddFav.icon";
import { useProductCRUD } from "../../hooks/useProductCRUD";
import { openModal } from "../../redux/slices/modal/modal.slice";
import { AddToCartIcon } from "../../assets/icons/AddToCart.icon";
import { ImageWrapper } from "../../ui_kits/ImageWrapper/ImageWrapper";
import { IProductData } from "../../redux/slices/collection/collection.type";

interface IProps {
  product: IProductData;
  label?: string;
  isVisibleFav?: boolean;
  isVisibleAddCart?: boolean;
  isVisibleRemoveFav?: boolean;
}

export const ProductItem = (props: IProps) => {
  const {
    product,
    label,
    isVisibleFav = false,
    isVisibleAddCart = false,
    isVisibleRemoveFav = false,
  } = props;

  const dispatch = useAppDispatch();
  const isValidDate = isFutureDate(product.date);
  const { handleToggleToFav, updateInitialProductVariants } = useProductCRUD();
  const { pathname } = useLocation();

  const isSelected = pathname === "/preorder";

  const favToggle = (e: OnclickEvent) => {
    e.preventDefault();
    handleToggleToFav(product.id);
  };

  const handleProductAddToCart = () => {
    updateInitialProductVariants(product);
    dispatch(
      openModal({
        modalType: "AddFavToCartModal",
        modalProps: {
          id: product,
        },
      })
    );
  };

  return (
    <div className="ProductItem" id={product.productName}>
      <div className="ProductItem__Wrapper">
        <div className="ProductItem__ImageWrapper">
          <div className="AspectRatio AspectRatio--tall">
            <ImageWrapper
              src={product.imageUrl}
              alt={product.productName}
              classes="ProductItem__Image Image--fadeIn"
            />
            <IF condition={isVisibleAddCart}>
              <button
                className="ProductItem__Icon ProductItem__CartIcon"
                onClick={handleProductAddToCart}
              >
                <AddToCartIcon />
              </button>
            </IF>
            <IF condition={isVisibleRemoveFav}>
              <button
                className="ProductItem__Icon ProductItem__RemoveIcon"
                onClick={favToggle}
              >
                <RemoveIcon />
              </button>
            </IF>
          </div>
        </div>

        <IF condition={label !== undefined}>
          <div className="ProductItem__LabelList">
            <span className="ProductItem__Label Heading Text--subdued u-h7">
              {label}
            </span>
          </div>
        </IF>

        <IF condition={isVisibleFav}>
          <button
            className="ProductItem__Icon ProductItem__FavIcon Text--subdued"
            onClick={favToggle}
          >
            <AddFavIcon />
          </button>
        </IF>

        <ProductInfo product={product} />
        {isSelected && !isValidDate && product.date && (
          <Timer endDate={product.date} />
        )}
      </div>
    </div>
  );
};
