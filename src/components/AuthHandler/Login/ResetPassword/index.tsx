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
  FormPasswordInput,
  FormSubmit,
} from "../../../../ui_kits/Form";
import {
  initialResetPasswordState,
  IResetPasswordState,
  ResetPasswordInput,
  ResetPasswordInputs,
} from "./inputs";

const ResetPassword = () => {
  const {
    obj: registerState,
    get: getRegisterState,
    update: updateRegisterState,
  } = useObjectState(initialResetPasswordState);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<IResetPasswordState>);

  const {
    handleFormValidate,
    handleOnFocusEvent,
    updateData,
    verificationEmail,
    handleLoginPage,
  } = useAuth();

  const message: Messages = {
    success: "Password updated succesfully",
    error: "Error While updating password, Try again!",
  };

  const registerParams = {
    ...authService.ResetPassword,
    url : `${authService.ResetPassword.url}/${verificationEmail}/${registerState.password}`
    // params: {
    //   email: verificationEmail,
    //   password: registerState.password,
    // },
  };

  const handleOnsubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();
    let isValid = handleFormValidate(
      ResetPasswordInputs,
      registerState,
      updateFormState
    );

    if (registerState.password !== registerState.confirmpassword) {
      isValid = false;
      updateFormState("helperText", "Passwords do NOT match!");
    }
    if (isValid) {
      const data = await updateData(
        registerParams,
        formState,
        message,
        setFormState
      );
      if (data) {
        safeSetTimeout(handleLoginPage, 1000, LoginPage.Login, null);
      }
    }
  };

  return (
    <Form onSubmit={handleOnsubmit}>
      <FormElement elementType={Form__Elemen__Types.FormHeader}>
        <h1 className="Heading u-h1">Reset password</h1>
        <p>Please enter a new password:</p>
      </FormElement>
      <FormError formState={formState} />
      {ResetPasswordInputs.map(
        ({ validation, ...item }: ResetPasswordInput) => {
          return (
            <FormElement key={item.name}>
              <FormPasswordInput
                {...item}
                value={getRegisterState(item.name)}
                onFocus={(e: InputFocusEvent) =>
                  handleOnFocusEvent(e, initialFormState, setFormState)
                }
                onChange={(e: InputChangeEvent) => {
                  updateRegisterState(item.name, e.target.value);
                }}
              />
            </FormElement>
          );
        }
      )}

      <FormSubmit isFull isLoading={formState.isButtonLoading}>
        UPDATE
      </FormSubmit>
    </Form>
  );
};

export default ResetPassword;
