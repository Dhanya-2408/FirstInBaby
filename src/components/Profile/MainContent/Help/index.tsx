import { useAuth } from "../../../../contexts/AuthContext";
import useObjectState from "../../../../hooks/useObjectState";
import { initialFormState } from "../../../../models/constants";
import {
  FormSubmitEvent,
  IFormState,
  InputChangeEvent,
  InputFocusEvent,
  Messages,
} from "../../../../models/types";
import { customer } from "../../../../redux/slices/profile/profile.selector";
import { useAppSelector } from "../../../../redux/store";
import { profileService } from "../../../../services/axiosServices";
import {
  Form,
  FormElement,
  FormSubmit,
  FormTextArea,
} from "../../../../ui_kits/Form";
import { PageContent } from "../../../../ui_kits/global/PageContent.styles";
import { Panel } from "../../../../ui_kits/Panel/Panel";
import { safeSetTimeout } from "../../../../utils/generics";
import { formatPreOrderDate } from "../../../../utils/script";
import { FormError } from "../../../AuthHandler/FormError";
import {
  HelpInput,
  HelpInputs,
  IHelpState,
  initialHelpInputState,
} from "./input";

export const Help = () => {
  const { data: user } = useAppSelector(customer);

  const {
    obj: registerState,
    get: getRegisterState,
    update: updateRegisterState,
    setObj: setregisterState,
  } = useObjectState(initialHelpInputState);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<IHelpState>);

  const { handleFormValidate, handleOnFocusEvent, updateData } = useAuth();

  const message: Messages = {
    success: " Sent succesfully",
    error: "Something Went Wrong, Please Contact support team",
  };

  const params = {
    ...profileService.help,
    params: {
      message: registerState.message,
      email: user?.email,
      name: user?.fname,
      date: formatPreOrderDate(),
    },
  };

  const handleOnsubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();
    let isValid = handleFormValidate(
      HelpInputs,
      registerState,
      updateFormState
    );
    if (isValid) {
      await updateData(params, formState, message, setFormState);
      setregisterState(initialHelpInputState);
    }
    safeSetTimeout(setFormState, 3000, initialFormState);
  };

  return (
    <PageContent isNarrow>
      <Panel title="HELP">
        <Form onSubmit={handleOnsubmit}>
          <FormError formState={formState} />
          {HelpInputs.map(({ validation, ...item }: HelpInput) => {
            return (
              <FormElement key={item.name}>
                <FormTextArea
                  label={item.label}
                  placeholder={"How Can I Help You ?"}
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
          })}
          <FormSubmit isFull isLoading={formState.isButtonLoading}>
            SUBMIT
          </FormSubmit>
        </Form>
      </Panel>
    </PageContent>
  );
};
