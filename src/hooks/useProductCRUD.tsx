import { pick } from "../utils/generics";
import toastMessage from "../utils/toastMessage";
import { useAuth } from "../contexts/AuthContext";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { addItemToCart } from "../redux/slices/cart/cart.slice";
import { customer } from "../redux/slices/profile/profile.selector";
import { addFavAsync } from "../redux/slices/wishlist/wishlist.reducer";
import { IProductVariants } from "../redux/slices/product/product.type";
import { IProductData } from "../redux/slices/collection/collection.type";
import { setProductVariants } from "../redux/slices/product/product.slice";
import { productVariants } from "../redux/slices/product/product.selector";
import { IAddressFormState } from "../components/Modal/AddressModal/inputs";

import {
  addAddressAsync,
  deleteAddressAsync,
  updateAddressAsync,
} from "../redux/slices/address/address.reducer";

export const useProductCRUD = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const selectedProductVariants =
    useAppSelector(productVariants) || ({} as IProductVariants);
  const userData = useAppSelector(customer);

  const handleToggleToFav = (mcId: number) => {
    if (user) {
      const item = {
        phone: user as string,
        mcid: mcId,
      };
      dispatch(addFavAsync(item) as any);
    } else {
      toastMessage("Login", "warning");
    }
  };

  const updateProductVariants = (product: IProductData, size: string) => {
    const variants = pick(product, [
      "id",
      "productName",
      "price",
      "imageUrl",
      "productcolor",
    ]);

    dispatch(
      setProductVariants({
        ...variants,
        quantity: product.minqty,
        size: size,
      })
    );
  };

  const updateInitialProductVariants = (product: IProductData) => {
    updateProductVariants(product, product.sizes?.[0]?.psize || "");
  };

  const handleAddTocart = (product: IProductData) => {
    dispatch(addItemToCart(selectedProductVariants));
    updateInitialProductVariants(product);
    toastMessage(
      `${selectedProductVariants.productName} added to cart`,
      "success"
    );
  };

  // Address

  const addAddressHandler = (
    addressState: IAddressFormState,
    selectedAddressId?: number
  ) => {
    if (selectedAddressId) {
      dispatch(
        updateAddressAsync({
          address: {
            ...addressState,
            id: selectedAddressId,
            // userid: userData.data?.userid,
          },
          user,
        })
      );
    } else {
      dispatch(
        addAddressAsync({
          address: { ...addressState, userid: userData.data?.userid },
          user,
        })
      );
    }
  };

  const removeAddressHandler = (addressId: number) => {
    dispatch(
      deleteAddressAsync({
        id: addressId,
        user,
      })
    );
  };

  return {
    user,
    handleToggleToFav,
    updateProductVariants,
    handleAddTocart,
    addAddressHandler,
    removeAddressHandler,
    updateInitialProductVariants,
  };
};
