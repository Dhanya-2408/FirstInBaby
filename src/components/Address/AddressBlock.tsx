import { OnclickEvent } from "../../models/types";
import { RadioIcon } from "../../assets/icons/Radio.icon";
import { IAddress } from "../../redux/slices/address/address.type";
import { ButtonGroup } from "../../ui_kits/Buttons/TextButton/TextButton.styles";
import { TextButton } from "../../ui_kits/Buttons/TextButton/TextButton.component";
import { useProductCRUD } from "../../hooks/useProductCRUD";
import { useAppSelector } from "../../redux/store";
import { defaultAddressId } from "../../redux/slices/address/address.selector";

interface IProps {
  addressData: IAddress;
  toggleDefaultAddress: (id: number) => void;
  handleUpdateNewAddress: (id: number) => void;
}

export const AddressBlock = (props: IProps) => {
  const { addressData, toggleDefaultAddress, handleUpdateNewAddress } = props;

  const { id, name, phone, state, city, street, flatNo, pin, landMark } =
    addressData;

  const { removeAddressHandler } = useProductCRUD();

  const defaultId = useAppSelector(defaultAddressId);
  const isDefault = id === defaultId;

  const handleDeleteAddress = (e: OnclickEvent) => {
    e.preventDefault();
    removeAddressHandler(id);
  };

  const handleEditAddress = (e: OnclickEvent) => {
    e.preventDefault();
    handleUpdateNewAddress(id);
  };

  return (
    <div className="Address_Block u-h5">
      <div
        className="Address_Content Heading u-h7"
        onClick={() => toggleDefaultAddress(id)}
      >
        <RadioIcon selected={isDefault} />
        <h5 className="name">
          {name} &nbsp; {isDefault && <span>( Default )</span>}
        </h5>
        <p>{`${flatNo} - ${street}`}</p>
        <p>Landmark : {landMark}</p>
        <p>{`${state}, ${city}, ${pin}`}</p>
        <p>India</p>
        <p className="mobile">T : {phone}</p>
      </div>
      <ButtonGroup className="btn-blocks">
        <TextButton isSmall onClick={handleEditAddress}>
          EDIT
        </TextButton>
        <TextButton isSmall buttonType="inverted" onClick={handleDeleteAddress}>
          REMOVE
        </TextButton>
      </ButtonGroup>
    </div>
  );
};
