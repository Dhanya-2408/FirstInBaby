import { FormError } from "../../FormError";
import { safeSetTimeout } from "../../../../utils/generics";
import useObjectState from "../../../../hooks/useObjectState";
import { initialFormState } from "../../../../models/constants";
import { authService } from "../../../../services/axiosServices";
import { LoginPage, useAuth } from "../../../../contexts/AuthContext";
import { Form__Elemen__Types } from "../../../../ui_kits/Form/FormElements/FormElement";
import {
  FormSubmitEvent,
  IFormState,
  InputChangeEvent,
  InputFocusEvent,
  Messages,
} from "../../../../models/types";
import {
  Form,
  FormElement,
  FormSubmit,
  FormTextInput,
} from "../../../../ui_kits/Form";
import {
  ForgotPasswordInput,
  ForgotPasswordInputs,
  IForgotPasswordState,
  initialForgotPasswordState,
} from "./inputs";

export const ForgotPassword = () => {
  const {
    obj: forgotPasswordState,
    get: getforgotPasswordState,
    update: updateforgotPasswordState,
  } = useObjectState(initialForgotPasswordState);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<IForgotPasswordState>);

  const {
    handleFormValidate,
    handleOnFocusEvent,
    updateData,
    handleLoginPage,
  } = useAuth();

  const message: Messages = {
    success: "OTP sent to your registered email.",
    error: "User Not Available",
  };

  const forgotPasswordParams = {
    ...authService.ForgorPassword,
    // params: forgotPasswordState,
    url : `${authService.ForgorPassword.url}/${forgotPasswordState.email}`
  };

  const handleOnsubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();
    const isValid = handleFormValidate(
      ForgotPasswordInputs,
      forgotPasswordState,
      updateFormState
    );
    if (isValid) {
      const data = await updateData(
        forgotPasswordParams,
        formState,
        message,
        setFormState
      );
      if (data) {
        safeSetTimeout(
          handleLoginPage,
          1000,
          LoginPage.ConfirmOtp,
          forgotPasswordState.email
        );
      }
    }
  };

  return (
    <Form onSubmit={handleOnsubmit}>
      <FormElement elementType={Form__Elemen__Types.FormHeader}>
        <h1 className="Heading">Forgot Password?</h1>
        <p>You will receive an OTP to create a new password via Email.</p>
      </FormElement>
      <FormError formState={formState} />
      {ForgotPasswordInputs.map(
        ({ validation, ...item }: ForgotPasswordInput) => {
          return (
            <FormElement key={item.name}>
              <FormTextInput
                {...item}
                value={getforgotPasswordState(item.name)}
                onFocus={(e: InputFocusEvent) =>
                  handleOnFocusEvent(e, initialFormState, setFormState)
                }
                onChange={(e: InputChangeEvent) => {
                  updateforgotPasswordState(item.name, e.target.value);
                }}
              />
            </FormElement>
          );
        }
      )}
      <FormSubmit isFull isLoading={formState.isButtonLoading}>
        RECOVER
      </FormSubmit>
    </Form>
  );
};
