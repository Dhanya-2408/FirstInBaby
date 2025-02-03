import { Form, FormElement, FormTextInput } from "../../../ui_kits/Form";
import { TextButton } from "../../../ui_kits/Buttons/TextButton/TextButton.component";
import { Form__Elemen__Types } from "../../../ui_kits/Form/FormElements/FormElement";
import { useState } from "react";
import {
  FormSubmitEvent,
  IFormState,
  InputChangeEvent,
  InputFocusEvent,
  Messages,
} from "../../../models/types";
import useObjectState from "../../../hooks/useObjectState";
import { initialFormState } from "../../../models/constants";
import { IValidation, validationRules } from "../../../utils/Validation";
import { FormError } from "../../AuthHandler/FormError";
import { productService } from "../../../services/axiosServices";
import { fetchData } from "../../../services/axios";
import { isString } from "../../../utils/textHandler";
import { safeSetTimeout } from "../../../utils/generics";

export const ProductDeliveryForm = () => {
  const [pin, setPin] = useState<string | null>(null);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<string>);

  const validation: IValidation[] = [
    { rule: validationRules.length, args: 6 },
    { rule: validationRules.required },
  ];

  const deliveryParams = {
    ...productService.verifyDelivery,
    params: {
      zipcode: pin,
    },
  };

  const message: Messages = {
    success: "Validated successfully!",
    error: "Something went wrong, Try Again!",
  };

  const handleOnchange = (e: InputChangeEvent) => {
    setPin(e.target.value);
  };

  const handleOnFocusEvent = (e: InputFocusEvent): void => {
    e.preventDefault();
    setFormState({
      ...initialFormState,
      errors: "",
    });
  };

  const handleValidate = () => {
    let error: string = "";
    let isValid: boolean = true;
    validation.forEach((vRule) => {
      const errorMessage = vRule!.rule(pin, "Pin", vRule!.args);
      if (errorMessage.length) {
        error = errorMessage;
        isValid = false;
      }
    });
    updateFormState("errors", error);
    return isValid;
  };

  const handleSubmit = async (event: FormSubmitEvent) => {
    event.preventDefault();
    const isValid = handleValidate();

    if (isValid) {
      setFormState({ ...formState, isButtonLoading: true });
      try {
        const response = await fetchData(deliveryParams);
        setFormState({
          ...formState,
          helperText: message.success,
          submitSuccess: true,
          isButtonLoading: false,
        });
        return response;
      } catch (error: any) {
        setFormState({
          ...formState,
          helperText: isString(error?.response?.data)
            ? error?.response?.data
            : message.error,
          submitSuccess: false,
          isButtonLoading: false,
        });
        return null;
      }
    }
    safeSetTimeout(setFormState, 1000, initialFormState as IFormState<string>);
  };

  return (
    <Form classname="ProductForm" spacingTight onSubmit={handleSubmit}>
      <FormElement elementType={Form__Elemen__Types.FormHeader}>
        <h5 className="Heading">DELIVERY / STORE OPTIONS:</h5>
      </FormElement>
      <FormError formState={formState} />
      <FormElement elementType={Form__Elemen__Types.FormGroup}>
        <FormElement>
          <FormTextInput
            type="number"
            name="pin"
            placeholder="Pincode"
            onChange={handleOnchange}
            onFocus={handleOnFocusEvent}
            value={pin}
          />
        </FormElement>
        <FormElement>
          <TextButton isFull isLoading={formState.isButtonLoading}>
            CHECK
          </TextButton>
        </FormElement>
      </FormElement>
    </Form>
  );
};
