import { Form, FormElement, FormTextInput } from "../../../ui_kits/Form";
import { Form__Elemen__Types } from "../../../ui_kits/Form/FormElements/FormElement";
import {
  AddressFormGroupInputs,
  AddressFormInput,
  AddressFormInputs,
  IAddressFormState,
  initialIAddressValues,
} from "./inputs";
import {
  IFormState,
  InputChangeEvent,
  InputFocusEvent,
} from "../../../models/types";
import useObjectState from "../../../hooks/useObjectState";
import { initialFormState } from "../../../models/constants";
import { useAuth } from "../../../contexts/AuthContext";
import { useAppSelector } from "../../../redux/store";
import { IAddress } from "../../../redux/slices/address/address.type";
import { useEffect, useMemo } from "react";
import ModalWrapper from "../../../ui_kits/modal/modal-wrapper.component";
import { selectedAddressId } from "../../../redux/slices/address/address.selector";
import { FormError } from "../../AuthHandler/FormError";
import { useProductCRUD } from "../../../hooks/useProductCRUD";
import { customer } from "../../../redux/slices/profile/profile.selector";

export const AddressModal = () => {
  const { handleOnFocusEvent, handleFormValidate } = useAuth();
  const { addAddressHandler } = useProductCRUD();

  const { data } = useAppSelector(customer);
  const addressId = useAppSelector(selectedAddressId);
  const addresses = data?.addressTemp;

  const initialValues = useMemo(() => {
    let computedData = initialIAddressValues;
    let computedId = Date.now();

    const selectedAddress = addresses?.find(
      (add: IAddress) => add.id === addressId
    );

    if (selectedAddress) {
      let { id, isDefault, ...rest } = selectedAddress;
      computedData = rest;
      computedId = id;
    }
    return { computedData, computedId };
  }, [addressId, addresses]);

  const {
    obj: addressState,
    get: getAddressState,
    update: updateAddressState,
    setObj: setAddressState,
  } = useObjectState(initialValues.computedData);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<IAddressFormState>);

  useEffect(() => {
    setAddressState(initialValues.computedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressId, addresses]);

  const handleOnsubmit = async () => {
    const isValid = handleFormValidate(
      [...AddressFormInputs, ...AddressFormGroupInputs],
      addressState,
      updateFormState
    );

    if (isValid) {
      addAddressHandler(addressState, addressId);
      // dispatch(closeModal());
    }
  };

  const getFormInput = (addressInput: AddressFormInput) => {
    return (
      <FormTextInput
        label={addressInput.label}
        name={addressInput.name}
        type={addressInput.type}
        value={getAddressState(addressInput.name)}
        onFocus={(e: InputFocusEvent) =>
          handleOnFocusEvent(e, initialFormState, setFormState)
        }
        onChange={(e: InputChangeEvent) => {
          updateAddressState(addressInput.name, e.target.value);
        }}
      />
    );
  };

  return (
    <ModalWrapper
      size="tiny"
      header="Add Address"
      actionName="Add"
      handleActionClick={handleOnsubmit}
    >
      <Form spacingTight onSubmit={handleOnsubmit}>
        <FormError formState={formState} />
        {AddressFormInputs.map((addressInput: AddressFormInput) => (
          <FormElement key={addressInput.name}>
            {getFormInput(addressInput)}
          </FormElement>
        ))}
        <FormElement elementType={Form__Elemen__Types.FormGroup}>
          {AddressFormGroupInputs.map((addressInput: AddressFormInput) => (
            <FormElement key={addressInput.name}>
              {getFormInput(addressInput)}
            </FormElement>
          ))}
        </FormElement>
      </Form>
    </ModalWrapper>
  );
};
