import { useAuth } from "../../../../../contexts/AuthContext";
import { FormError } from "../../../../AuthHandler/FormError";
import { safeSetTimeout } from "../../../../../utils/generics";
import useObjectState from "../../../../../hooks/useObjectState";
import { initialFormState } from "../../../../../models/constants";
import { authService } from "../../../../../services/axiosServices";
import {
  FormSubmitEvent,
  IFormState,
  InputChangeEvent,
  InputFocusEvent,
  Messages,
} from "../../../../../models/types";
import {
  Form,
  FormElement,
  FormPasswordInput,
  FormSubmit,
} from "../../../../../ui_kits/Form";
import {
  initialUpdatePasswordState,
  IUpdatePasswordState,
  UpdatePasswordInput,
  UpdatePasswordInputs,
} from "./inputs";

export const UpdatePassword = () => {
  const { user } = useAuth();

  const {
    obj: registerState,
    get: getRegisterState,
    update: updateRegisterState,
    setObj: setregisterState,
  } = useObjectState(initialUpdatePasswordState);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<IUpdatePasswordState>);

  const { handleFormValidate, handleOnFocusEvent, updateData } = useAuth();

  const message: Messages = {
    success: "Password updated succesfully",
    error: "Error While updating password, Try again!",
  };

  const params = {
    ...authService.ResetPassword,
    url : `${authService.ResetPassword.url}/${user}/${registerState.password}`
    // params: {
    //   email: user,
    //   password: registerState.password,
    // },
  };

  const handleOnsubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();
    let isValid = handleFormValidate(
      UpdatePasswordInputs,
      registerState,
      updateFormState
    );

    if (isValid && registerState.password !== registerState.confirmpassword) {
      isValid = false;
      updateFormState("helperText", "Passwords do NOT match!");
    }

    if (isValid) {
      await updateData(params, formState, message, setFormState);
      setregisterState(initialUpdatePasswordState);
    }

    safeSetTimeout(setFormState, 3000, initialFormState);
  };

  return (
    <Form onSubmit={handleOnsubmit}>
      <FormError formState={formState} />
      {UpdatePasswordInputs.map(
        ({ validation, ...item }: UpdatePasswordInput) => {
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
