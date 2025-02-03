import { InputBaseProps, InputType } from "../../../models/types";
import { validationRules } from "../../../utils/Validation";

export type IContactState = {
  message: string;
  name: string;
  email: string;
};

export type ContactInput = InputBaseProps<IContactState>;

export const initialContactInputState: IContactState = {
  name: "",
  message: "",
  email: "",
};

export const ContactInputs: ContactInput[] = [
  {
    name: "name",
    label: "Name",
    type: InputType.text,
    validation: [
      { rule: validationRules.name },
      { rule: validationRules.required },
    ],
  },
  {
    name: "email",
    label: "Email",
    type: InputType.email,
    validation: [
      { rule: validationRules.email },
      { rule: validationRules.required },
    ],
  },
  {
    name: "message",
    label: "Message",
    type: InputType.textarea,
    validation: [{ rule: validationRules.required }],
  },
];
