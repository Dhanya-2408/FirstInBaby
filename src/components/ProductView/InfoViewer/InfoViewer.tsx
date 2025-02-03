import { ProductMeta } from "./ProductMeta";
import { useAppDispatch } from "../../../redux/store";
import { ProductDeliveryForm } from "./ProductDeliveryForm";
import { ProductVariantsForm } from "./ProductVariantsForm";
import Sizechart from "../../../assets/images/sizechart.png";
import { openModal } from "../../../redux/slices/modal/modal.slice";
import { Container } from "../../../ui_kits/global/Container.styles";
import { IProductData } from "../../../redux/slices/collection/collection.type";
import "./InfoViewer.scss";

interface IProps {
  product: IProductData;
}

export const InfoViewer = (props: IProps) => {
  const { product } = props;

  const dispatch = useAppDispatch();

  const handleProductAddToCart = () => {
    dispatch(
      openModal({
        modalType: "SizeChartModal",
        modalProps: {
          id: product,
        },
      })
    );
  };

  return (
    <div className="ProductInfo u-h5">
      <Container className="ProductInfo__Container">
        <ProductMeta product={product} />
        <ProductVariantsForm product={product}>
          <div
            className="ProductForm__LabelLink "
            onClick={handleProductAddToCart}
          >
            <img src={Sizechart} alt="SizeChart" />
            <span className="Link Link--primary">Size Guide</span>
          </div>
        </ProductVariantsForm>
        <ProductDeliveryForm />
      </Container>
    </div>
  );
};
