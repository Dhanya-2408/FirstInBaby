import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { RadioIcon } from "../../../assets/icons/Radio.icon";
import { IAddress } from "../../../redux/slices/address/address.type";
import { TextButton } from "../../../ui_kits/Buttons/TextButton/TextButton.component";
import { ButtonGroup } from "../../../ui_kits/Buttons/TextButton/TextButton.styles";

interface IProps {
  address: IAddress;
}

export const SelectedAddress: FC<IProps> = (props: IProps) => {
  const { address } = props;
  const navigate = useNavigate();
  const { name, phone, state, city, street, flatNo, pin, landMark } = address;

  return (
    <div className="Address_Block u-h5">
      <div className="Address_Content Heading u-h7">
        <RadioIcon selected={true} />
        <h5 className="name">{name}</h5>
        <p>{`${flatNo} - ${street}`}</p>
        <p>Landmark : {landMark}</p>
        <p>{`${state}, ${city}, ${pin}`}</p>
        <p>India</p>
        <p className="mobile">T : {phone}</p>
      </div>
      <ButtonGroup className="btn-blocks">
        <TextButton
          isSmall
          buttonType="inverted"
          onClick={() => navigate("/Address")}
        >
          EDIT
        </TextButton>
      </ButtonGroup>
    </div>
  );
};
