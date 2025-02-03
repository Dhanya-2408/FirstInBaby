import { useState } from "react";
import useObjectState from "../../hooks/useObjectState";
import { initialFormState } from "../../models/constants";
import {
  FormSubmitEvent,
  IFormState,
  InputChangeEvent,
  InputFocusEvent,
  Messages,
} from "../../models/types";
import { IF } from "../../ui_kits/IF";
import { isEmpty } from "../../utils/script";
import {
  BUTTON_TYPE_CLASSES,
  TextButton,
} from "../../ui_kits/Buttons/TextButton/TextButton.component";
import {
  Form,
  FormAlert,
  FormElement,
  FormTextInput,
} from "../../ui_kits/Form";
import { IValidation, validationRules } from "../../utils/Validation";
import { Form__Elemen__Types } from "../../ui_kits/Form/FormElements/FormElement";
import { subscriptionService } from "../../services/axiosServices";
import { safeSetTimeout } from "../../utils/generics";
import { isString } from "../../utils/textHandler";
import { fetchData } from "../../services/axios";
import "./Style.scss";
import { FormError } from "../AuthHandler/FormError";

export const Newsletter = () => {
  const [email, setEmail] = useState<string | null>(null);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<string>);

  const validation: IValidation[] = [
    { rule: validationRules.email },
    { rule: validationRules.required },
  ];

  const handleOnchange = (e: InputChangeEvent) => {
    setEmail(e.target.value);
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
      const errorMessage = vRule!.rule(email, "Email", vRule!.args);
      if (errorMessage.length) {
        error = errorMessage;
        isValid = false;
      }
    });
    updateFormState("errors", error);
    return isValid;
  };

  const newsletterParams = {
    ...subscriptionService.newsLetter,
    params: {
      email: email,
    },
  };

  const message: Messages = {
    success: "Subscribed successfully!",
    error: "Something went wrong, Try Again!",
  };

  const handleSubmit = async (event: FormSubmitEvent) => {
    event.preventDefault();
    const isValid = handleValidate();
    if (isValid) {
      setFormState({ ...formState, isButtonLoading: true });
      try {
        const response = await fetchData(newsletterParams);
        console.log("data", response);
        setFormState({
          ...formState,
          helperText: message.success,
          submitSuccess: true,
          isButtonLoading: false,
        });
      } catch (error: any) {
        console.log("error", error);
        setFormState({
          ...formState,
          helperText: isString(error?.response?.data)
            ? error?.response?.data
            : message.error,
          submitSuccess: false,
          isButtonLoading: false,
        });
      }
      safeSetTimeout(
        setFormState,
        1000,
        initialFormState as IFormState<string>
      );
    }
  };

  return (
    <div className="Newsletter">
      <Form classname="Newsletter__Form" onSubmit={handleSubmit}>
        <FormElement elementType={Form__Elemen__Types.FormHeader}>
          <h2 className="Heading">Sign Up for Newsletter</h2>
        </FormElement>
        <FormError formState={formState} />
        <FormTextInput
          type="email"
          name="email"
          placeholder="Email"
          className="Newsletter__Input"
          onChange={handleOnchange}
          onFocus={handleOnFocusEvent}
          value={email || ""}
        />
        <TextButton
          className="Newsletter__Submit u-h5"
          buttonType={BUTTON_TYPE_CLASSES.base}
          isFull
          isLoading={formState.isButtonLoading}
        >
          SUBSCRIBE
        </TextButton>
      </Form>
    </div>
  );
};
