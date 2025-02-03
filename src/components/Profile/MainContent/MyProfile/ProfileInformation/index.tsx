import { useMemo } from "react";
import { useAuth } from "../../../../../contexts/AuthContext";
import { FormError } from "../../../../AuthHandler/FormError";
import { safeSetTimeout } from "../../../../../utils/generics";
import useObjectState from "../../../../../hooks/useObjectState";
import { initialFormState } from "../../../../../models/constants";
import { profileService } from "../../../../../services/axiosServices";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { customer } from "../../../../../redux/slices/profile/profile.selector";
import { fetchCustomerAsync } from "../../../../../redux/slices/profile/profile.reducer";
import { ButtonGroup } from "../../../../../ui_kits/Buttons/TextButton/TextButton.styles";
import {
  FormSubmitEvent,
  IFormState,
  InputChangeEvent,
  InputFocusEvent,
  Messages,
  OnclickEvent,
} from "../../../../../models/types";
import {
  Form,
  FormElement,
  FormSubmit,
  FormTextInput,
} from "../../../../../ui_kits/Form";
import {
  IProfileFormState,
  ProfileFormInput,
  ProfileFormInputs,
} from "./inputs";

export const ProfileInformation = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(customer);

  const initialProfileFormState: IProfileFormState = useMemo(() => {
    return {
      fname: data?.fname ?? "",
      lname: data?.lname ?? "",
      uPhone: data?.uPhone ?? "",
      email: data?.email ?? "",
    };
  }, [data]);

  const {
    obj: profileState,
    get: getProfileState,
    update: updateProfileState,
    setObj: setProfileState,
  } = useObjectState(initialProfileFormState);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<IProfileFormState>);

  const { handleFormValidate, handleOnFocusEvent, updateData } = useAuth();

  const message: Messages = {
    success: "Updated successfully.",
    error: "Something Went wrong, Try again later",
  };

  const params = {
    ...profileService.updateCustomer,
    data: {
      ...profileState,
      name : `${profileState.fname} ${profileState.lname}`
    },
  };

  const handleOnsubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();
    const isValid = handleFormValidate(
      ProfileFormInputs,
      profileState,
      updateFormState
    );
    if (isValid) {
      const response = await updateData(
        params,
        formState,
        message,
        setFormState
      );
      if (response) {
        dispatch(fetchCustomerAsync(params.data?.email as string));
      }
    }
    safeSetTimeout(setFormState, 3000, initialFormState);
  };

  const handleOnCancel = async (e: OnclickEvent) => {
    e.preventDefault();
    setProfileState(initialProfileFormState);
  };

  return (
    <Form onSubmit={handleOnsubmit}>
      <FormError formState={formState} />
      {ProfileFormInputs.map(({ validation, ...item }: ProfileFormInput) => {
        return (
          <FormElement key={item.name}>
            <FormTextInput
              {...item}
              value={getProfileState(item.name)}
              onFocus={(e: InputFocusEvent) =>
                handleOnFocusEvent(e, initialFormState, setFormState)
              }
              onChange={(e: InputChangeEvent) => {
                updateProfileState(item.name, e.target.value);
              }}
            />
          </FormElement>
        );
      })}
      <ButtonGroup>
        <FormSubmit isExpand>UPDATE</FormSubmit>
        <FormSubmit isExpand buttonType="inverted" onClick={handleOnCancel}>
          CANCEL
        </FormSubmit>
      </ButtonGroup>
    </Form>
  );
};
