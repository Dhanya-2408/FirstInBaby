import { FC } from "react";
import { NavLink } from "react-router-dom";
import { IF } from "../../../../ui_kits/IF";
import { encodeUrl } from "../../../../utils/textHandler";
import {
  BUTTON_TYPE_CLASSES,
  TextButton,
} from "../../../../ui_kits/Buttons/TextButton/TextButton.component";
import "./FeatureProduct.scss";

interface IProps {
  url: string;
  title: string;
  price: number;
  mcId: number;
  isVisibleSaleLabel?: boolean;
}

export const FeatureProduct: FC<IProps> = (props: IProps) => {
  const { url, title, price, mcId, isVisibleSaleLabel = false } = props;

  return (
    <div className="FeatureProduct_Wrapper">
      <NavLink to={`/product/${encodeUrl(title)}/${mcId}`}>
        <div className="FeatureProduct_Image">
          <img src={url} alt="products" />
        </div>
        <div className="FeatureProduct_Overlay">
          <div className="FeatureProduct_Info">
            <div className="FeatureProduct_Details Heading">
              <h4>{title}</h4>
              <br />
              <h4>Rs. {price}</h4>
            </div>
            <div className="FeatureProduct_Quickshop">
              <TextButton buttonType={BUTTON_TYPE_CLASSES.transparent}>
                QUICK VIEW
              </TextButton>
            </div>
          </div>
        </div>
        <IF condition={isVisibleSaleLabel}>
          <div className="FeatureProduct_Holder">
            <h6 className="FeatureProduct_Sale Heading">SALE</h6>
          </div>
        </IF>
      </NavLink>
    </div>
  );
};
