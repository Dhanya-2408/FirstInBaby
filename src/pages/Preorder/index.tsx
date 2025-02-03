import { useEffect, useMemo, useState } from "react";
import { formatPreOrderDate } from "../../utils/script";
import Pagination from "../../ui_kits/Pagination/Pagination";
import { Spinner } from "../../ui_kits/Spinner/Spinner.component";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IProduct } from "../../redux/slices/collection/collection.type";
import { EmptyProducts } from "../../components/EmptyProducts/EmptyProducts";
import { ProductsList } from "../../components/ProductCollection/ProductList";
import { preorderProducts } from "../../redux/slices/collection/collection.selector";
import { fetchPreorderProductsAsync } from "../../redux/slices/collection/collection.reducer";

export const Preorder = () => {
  const dispatch = useAppDispatch();
  const { data: products, loading } = useAppSelector(preorderProducts);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const ITEMS_PER_PAGE = 40;

  useEffect(() => {
    dispatch(
      fetchPreorderProductsAsync({
        offset: currentPage - 1,
        pagesize: ITEMS_PER_PAGE,
        date: formatPreOrderDate(),
      })
    );
  }, [dispatch, currentPage]);

  const filteredData = useMemo(() => {
    let computedData: IProduct = products || ({} as IProduct);
    setTotalItems(computedData.pagenumber * ITEMS_PER_PAGE);
    return computedData.productdto || [];
  }, [products]);

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
