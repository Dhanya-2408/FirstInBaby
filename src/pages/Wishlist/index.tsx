import { useEffect } from "react";
import LazyLoad from "../../ui_kits/LazyComponent";
import { useAuth } from "../../contexts/AuthContext";
import EmtyWishList from "../../assets/images/EmtyWishList.png";
import { EmptyContainer } from "../../components/EmptyContainer";
import { Spinner } from "../../ui_kits/Spinner/Spinner.component";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { PageContent } from "../../ui_kits/global/PageContent.styles";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import { getFavAsync } from "../../redux/slices/wishlist/wishlist.reducer";
import { IProductData } from "../../redux/slices/collection/collection.type";
import { wishlistItems } from "../../redux/slices/wishlist/wishlist.selector";

export const Wishlist = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const { data: products, loading } = useAppSelector(wishlistItems);

  useEffect(() => {
    if (user !== null && !products) {
      dispatch(getFavAsync(user));
    }
  }, [dispatch, products, user]);

  if (loading) {
    return <Spinner />;
  }

  if (!loading && !products?.length) {
    return (
      <PageContent>
        <EmptyContainer
          url={EmtyWishList}
          head="YOUR WISHLIST IS EMPTY"
          subhead=" You haven't picked any favourites yet!. but it doesn’t have to be"
        />
      </PageContent>
    );
  }

  return (
    <div className="CollectionInner">
      <div className="CollectionInner__Products">
        <div
          className="ProductList--grid ProductList--removeMargin Grid"
          data-mobile-count={2}
          data-desktop-count={4}
        >
          {products?.map((product: IProductData) => (
            <LazyLoad
              tag="div"
              key={product.id}
              className="Grid__Cell 1/2--phone 1/3--tablet-and-up 1/4--desk"
            >
              <ProductItem
                product={product}
                isVisibleAddCart
                isVisibleRemoveFav
              />
            </LazyLoad>
          ))}
        </div>
      </div>
    </div>
  );
};
