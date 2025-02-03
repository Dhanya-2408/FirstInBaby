import { useNavigate } from "react-router-dom";
import { OrderConfirmIcon } from "../../assets/icons/OrderConfirm.icon";
import { OnclickEvent } from "../../models/types";
import {
  BUTTON_TYPE_CLASSES,
  TextButton,
} from "../../ui_kits/Buttons/TextButton/TextButton.component";
import { ButtonGroup } from "../../ui_kits/Buttons/TextButton/TextButton.styles";
import "./OrderConfirmation.scss";

function OrderConfirmation() {
  const navigate = useNavigate();

  const continueOnclick = (e: OnclickEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const viewOrderClick = (e: OnclickEvent) => {
    e.preventDefault();
    navigate("/account");
  };

  return (
    <div className="OrderConfirm">
      <div className="OrderConfirm__Card">
        <div className="OrderConfirm__StatusContainer">
          <OrderConfirmIcon />
          <h1 className="Heading Text--highlight">Order confirmed</h1>
          <div className=" u-h5">
            Your order is confirmed. You will receive an order confirmation
            email/SMS shortly with the expected delivery date for your items.
          </div>
        </div>
        <ButtonGroup>
          <TextButton onClick={viewOrderClick}>VIEW ORDER</TextButton>
          <TextButton
            onClick={continueOnclick}
            buttonType={BUTTON_TYPE_CLASSES.inverted}
          >
            CONTINUE SHOPPING
          </TextButton>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default OrderConfirmation;
