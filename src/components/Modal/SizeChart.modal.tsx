import { IProductData } from "../../redux/slices/collection/collection.type";
import ModalWrapper from "../../ui_kits/modal/modal-wrapper.component";

interface IProps {
  id: IProductData;
}

export const SizeChartModal = (props: IProps) => {
  const { id: product } = props;

  return (
    <ModalWrapper size="small" image={true} basic={true}>
      <div className="hidden-phone">
        <img src={product.sizechart} alt="SizeChart" />
      </div>
      <div className="hidden-tablet-and-up">
        <img src={product.sizechart} alt="SizeChart" />
      </div>
    </ModalWrapper>
  );
};
