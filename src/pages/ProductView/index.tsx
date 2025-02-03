import { useEffect } from "react";
import { Description } from "../../components/ProductView/Description/Description";
import { ImageViewer } from "../../components/ProductView/ImageViewer/ImageViewer";
import { InfoViewer } from "../../components/ProductView/InfoViewer/InfoViewer";
import { Reviews } from "../../components/Reviews/Reviews";
import usePath from "../../hooks/usePath";
import { useProductCRUD } from "../../hooks/useProductCRUD";
import { IProductData } from "../../redux/slices/collection/collection.type";
import { fetchSingleProductAsync } from "../../redux/slices/product/product.reducer";
import { selectedProduct } from "../../redux/slices/product/product.selector";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Accordian } from "../../ui_kits/Accordian/Accordian";
import { Container } from "../../ui_kits/global/Container.styles";
import { IF } from "../../ui_kits/IF";
import { SectionHeader } from "../../ui_kits/Sections/SectionHeader/SectionHeader";
import { SectionWrapper } from "../../ui_kits/Sections/SectionWrapper/SectionWrapper";
import { Spinner } from "../../ui_kits/Spinner/Spinner.component";
import { isEmpty } from "../../utils/script";
import "./Style.scss";

export const ProductView = () => {
  const productId = usePath();
  const dispatch = useAppDispatch();

  const { updateInitialProductVariants } = useProductCRUD();
  const { data: filteredData, loading } = useAppSelector(selectedProduct);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(+productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (filteredData) {
      updateInitialProductVariants(filteredData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filteredData]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="SelectedProduct">
      <SectionWrapper isbordered>
        <div className="SelectedProduct__Container Clearfix">
          <IF condition={!isEmpty(filteredData)}>
            <ImageViewer product={filteredData as IProductData} />
            <InfoViewer product={filteredData as IProductData} />
          </IF>
        </div>
      </SectionWrapper>
      <SectionWrapper isbordered>
        <Container isNarrow>
          <Accordian title="DETAILS" child={<Description />} />
          <Accordian title="DETAILS OF THE VENDOR" child={<Description />} />
          <Accordian title="SHIPPING RESTRICTIONS" child={<Description />} />
        </Container>
      </SectionWrapper>
      <IF condition={!isEmpty(filteredData)}>
        <SectionWrapper isbordered>
          <Container>
            <SectionHeader heading="Customer Reviews" />
            <Reviews />
          </Container>
        </SectionWrapper>
      </IF>
    </main>
  );
};
