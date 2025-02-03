import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../../ui_kits/Pagination/Pagination";
import { Spinner } from "../../ui_kits/Spinner/Spinner.component";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { EmptyProducts } from "../../components/EmptyProducts/EmptyProducts";
import { ProductsList } from "../../components/ProductCollection/ProductList";
import { fetchShopbyCollectionAsync } from "../../redux/slices/collection/collection.reducer";
import { productsShopByCollection } from "../../redux/slices/collection/collection.selector";
import { IProduct } from "../../redux/slices/collection/collection.type";

export const ShopBy = () => {
  const {
    state: { collectionCode },
  } = useLocation();
  const dispatch = useAppDispatch();
  const { data: products, loading } = useAppSelector(productsShopByCollection);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    dispatch(
      fetchShopbyCollectionAsync({
        collection: collectionCode,
        offset: currentPage - 1,
        pagesize: ITEMS_PER_PAGE,
      })
    );
  }, [dispatch, currentPage, collectionCode]);

  const filteredData = useMemo(() => {
    const computedData: IProduct =
      products?.[collectionCode] || ({} as IProduct);
    setTotalItems(computedData.pagenumber * ITEMS_PER_PAGE);
    return computedData.productdto || [];
  }, [collectionCode, products, currentPage]);

  if (loading) {
    return <Spinner />;
  }

  if (!loading && filteredData.length === 0) {
    return <EmptyProducts />;
  }

  return (
    <div className="CollectionMain">
      <div className="CollectionInner">
        <ProductsList ProductData={filteredData} />
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalItems}
        pageSize={ITEMS_PER_PAGE}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
};
