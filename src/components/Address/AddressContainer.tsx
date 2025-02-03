import { Fragment, useCallback } from "react";
import { AddressBlock } from "./AddressBlock";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  setDefaultAddressId,
  setSelectedAddressId,
} from "../../redux/slices/address/address.slice";
import { addressList } from "../../redux/slices/address/address.selector";
import { AddressIcon } from "../../assets/icons/Address.icon";
import { IAddress } from "../../redux/slices/address/address.type";
import { TextButton } from "../../ui_kits/Buttons/TextButton/TextButton.component";
import { openModal } from "../../redux/slices/modal/modal.slice";
import { Spinner } from "../../ui_kits/Spinner/Spinner.component";
import { customer } from "../../redux/slices/profile/profile.selector";

export const AddressContainer = () => {
  const dispatch = useAppDispatch();
  // const { data: addresses, loading } = useAppSelector(addressList);

  const { data, loading } = useAppSelector(customer);

  const toggleAddressForm = () => {
    dispatch(
      openModal({
        modalType: "AddressModal",
      })
    );
  };

  const handleAddNewAddress = () => {
    dispatch(setSelectedAddressId(undefined));
    toggleAddressForm();
  };

  const handleUpdateNewAddress = (id: number) => {
    dispatch(setSelectedAddressId(id));
    toggleAddressForm();
  };

  const toggleDefaultAddress = useCallback(
    (id: number) => {
      dispatch(setDefaultAddressId(id));
    },
    [dispatch]
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <div className="Address_Section">
        <h4 className="Heading">
          <AddressIcon />
          ADDRESS BOOK
        </h4>
        <TextButton isSmall onClick={handleAddNewAddress}>
          ADD ADDRESS
        </TextButton>
      </div>
      <div className="Grid">
        {data?.addressTemp.map((address: IAddress) => (
          <div
            className="Grid__Cell 1/1--phone 1/2--tablet-and-up 1/2--desk"
            key={address.id}
          >
            <AddressBlock
              addressData={address}
              toggleDefaultAddress={toggleDefaultAddress}
              handleUpdateNewAddress={handleUpdateNewAddress}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );
};
