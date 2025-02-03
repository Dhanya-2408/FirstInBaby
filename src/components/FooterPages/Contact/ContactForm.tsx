import { useAuth } from "../../../contexts/AuthContext";
import useObjectState from "../../../hooks/useObjectState";
import { initialFormState } from "../../../models/constants";
import {
  FormSubmitEvent,
  IFormState,
  InputChangeEvent,
  InputFocusEvent,
  Messages,
} from "../../../models/types";
import { profileService } from "../../../services/axiosServices";
import { TextButton } from "../../../ui_kits/Buttons/TextButton/TextButton.component";
import {
  Form,
  FormElement,
  FormTextArea,
  FormTextInput,
} from "../../../ui_kits/Form";
import { Form__Elemen__Types } from "../../../ui_kits/Form/FormElements/FormElement";
import { safeSetTimeout } from "../../../utils/generics";
import { formatPreOrderDate } from "../../../utils/script";
import {
  ContactInputs,
  IContactState,
  initialContactInputState,
} from "./input";

export const ContactForm = () => {
  const {
    obj: contactState,
    get: getContactState,
    update: updateContactState,
    setObj: setContactState,
  } = useObjectState(initialContactInputState);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<IContactState>);

  const { handleFormValidate, handleOnFocusEvent, updateData } = useAuth();

  const message: Messages = {
    success: " Sent succesfully",
    error: "Something Went Wrong, Please Contact support team",
  };

  const params = {
    ...profileService.help,
    params: {
      ...contactState,
      date: formatPreOrderDate(),
    },
  };

  const handleOnsubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();
    let isValid = handleFormValidate(
      ContactInputs,
      contactState,
      updateFormState
    );
    if (isValid) {
      await updateData(params, formState, message, setFormState);
      setContactState(initialContactInputState);
    }
    safeSetTimeout(setFormState, 3000, initialFormState);
  };

  return (
    <Form classname="Form" onSubmit={handleOnsubmit}>
      <FormElement elementType={Form__Elemen__Types.FormGroup}>
        <FormElement>
          <FormTextInput
            label="Name"
            placeholder="Name"
            value={getContactState("name")}
            onFocus={(e: InputFocusEvent) =>
              handleOnFocusEvent(e, initialFormState, setFormState)
            }
            onChange={(e: InputChangeEvent) => {
              updateContactState("name", e.target.value);
            }}
          />
        </FormElement>
        <FormElement>
          <FormTextInput
            label="Email"
            placeholder="Email"
            value={getContactState("email")}
            onFocus={(e: InputFocusEvent) =>
              handleOnFocusEvent(e, initialFormState, setFormState)
            }
            onChange={(e: InputChangeEvent) => {
              updateContactState("email", e.target.value);
            }}
          />
        </FormElement>
      </FormElement>
      <FormElement>
        <FormTextArea
          label="Your message"
          placeholder="Your message"
          value={getContactState("message")}
          onFocus={(e: InputFocusEvent) =>
            handleOnFocusEvent(e, initialFormState, setFormState)
          }
          onChange={(e: InputChangeEvent) => {
            updateContactState("message", e.target.value);
          }}
        />
      </FormElement>
      <TextButton isFull isLoading={formState.isButtonLoading}>
        SEND MESSAGE
      </TextButton>
    </Form>
  );
};
