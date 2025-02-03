import usePath from "../../hooks/usePath";
import { genericSort } from "../../utils/generics";
import { decodeUrl } from "../../utils/textHandler";
import { useEffect, useMemo, useState } from "react";
import useElementSize from "../../hooks/useElementSize";
import Pagination from "../../ui_kits/Pagination/Pagination";
import { SortDrawer } from "../../components/Drawer/SortDrawer";
import { Spinner } from "../../ui_kits/Spinner/Spinner.component";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ISortCollection, OnclickEvent } from "../../models/types";
import { FilterDrawer } from "../../components/Drawer/FilterDrawer";
import { EmptyProducts } from "../../components/EmptyProducts/EmptyProducts";
import { ProductsList } from "../../components/ProductCollection/ProductList";
import { CollectionToolbar } from "../../components/ProductCollection/CollectionToolbar/CollectionToolbar";
import {
  IProduct,
  IProductData,
  LayoutType,
} from "../../redux/slices/collection/collection.type";
import {
  filtersByCategory,
  isFilterEnabled,
  isSortEnabled,
  layoutType,
  productsByCategory,
  selectedSorter,
} from "../../redux/slices/collection/collection.selector";
import {
  fetchFiltersByCategoryAsync,
  fetchProductsByCategoryAsync,
} from "../../redux/slices/collection/collection.reducer";
import {
  setFilterVisibility,
  setLayoutType,
  setSelectedFilter,
  setSelectedSorter,
  setSorterVisibility,
} from "../../redux/slices/collection/collection.slice";

export const ProductCollection = () => {
  const mainCategory = usePath();
  const dispatch = useAppDispatch();

  const layout = useAppSelector(layoutType);
  const sorter = useAppSelector(selectedSorter);
  
  const isVisibleSorter = useAppSelector(isSortEnabled);
  const isVisibleFilter = useAppSelector(isFilterEnabled);

  const { data: products, loading } = useAppSelector(productsByCategory);
  const { data: filters } = useAppSelector(filtersByCategory);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const ITEMS_PER_PAGE = 5;

  const [toolbarRef] = useElementSize();

  const handleToggleLayout = (type: LayoutType) => {
    dispatch(setLayoutType(type));
  };

  const handleToggleFilter = () => {
    dispatch(setFilterVisibility(!isVisibleFilter));
  };

  const handleToggleSort = () => {
    dispatch(setSorterVisibility(!isVisibleSorter));
  };

  const toggleSortClick = (item: ISortCollection) => {
    const value = item.key === sorter?.key ? undefined : item;
    dispatch(setSelectedSorter(value));
    handleToggleSort();
  };

  const resetFilters = (e: OnclickEvent) => {
    e.preventDefault();
    dispatch(setSelectedSorter(undefined));
    dispatch(setSelectedFilter(undefined));
  };

   useEffect(() => {
    dispatch(
      fetchProductsByCategoryAsync({
        // mt: decodeUrl(mainCategory),
        // offset: currentPage - 1,
        // pagesize: ITEMS_PER_PAGE,

        mt: "Winter",
        offset: currentPage,
        pagesize: 1,

      })
    );
  }, [dispatch, mainCategory, currentPage]);

  // useEffect(() => {
  //   if (!filters?.hasOwnProperty(decodeUrl(mainCategory))) {
  //     dispatch(fetchFiltersByCategoryAsync(decodeUrl(mainCategory)));
  //   }
  // }, [mainCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [mainCategory]);

  const filteredData = useMemo(() => {
    const selectedProducts: IProduct =
      products?.[mainCategory] || ({} as IProduct);
    let computedData: IProductData[] = selectedProducts.productdto || [];
    setTotalItems(selectedProducts.pagenumber * ITEMS_PER_PAGE);

    if (sorter) {
      computedData = [...computedData].sort(
        (PdtA: IProductData, pdtB: IProductData) =>
          genericSort(PdtA, pdtB, {
            property: sorter.field,
            isDescending: sorter.isDescending,
          })
      );
    }
    return computedData;
  }, [mainCategory, products, currentPage, sorter]);

  if (loading) {
    return <Spinner />;
  }

  if (!loading && filteredData.length === 0) {
    return <EmptyProducts />;
  }

  return (
    <div className="CollectionMain">
      <CollectionToolbar
        ref={toolbarRef}
        layoutType={layout}
        toggleSort={handleToggleSort}
        toggleLayout={handleToggleLayout}
        toggleFilter={handleToggleFilter}
      />
      <SortDrawer
        selectedSorter={sorter}
        visibleSort={isVisibleSorter}
        handleToggleSort={handleToggleSort}
        toggleSortClick={toggleSortClick}
      />
      <FilterDrawer
        visibility={isVisibleFilter}
        toggleFilter={handleToggleFilter}
        resetFilters={resetFilters}
      />
      <div className="CollectionInner">
        <ProductsList ProductData={filteredData} layoutType={layout} />
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
