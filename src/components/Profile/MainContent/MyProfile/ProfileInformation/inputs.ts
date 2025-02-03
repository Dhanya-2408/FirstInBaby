import { validationRules } from "../../../../../utils/Validation";
import { InputBaseProps, InputType } from "../../../../../models/types";

export type IProfileFormState = {
  fname: string;
  lname: string;
  // uPhone: string;
  email: string;
};

export type ProfileFormInput = InputBaseProps<IProfileFormState>;

export const ProfileFormInputs: ProfileFormInput[] = [
  {
    name: "fname",
    label: "First Name",
    type: InputType.text,
    validation: [
      { rule: validationRules.name },
      { rule: validationRules.required },
    ],
  },
  {
    name: "lname",
    label: "Last Name",
    type: InputType.text,
    validation: [
      { rule: validationRules.name },
      { rule: validationRules.required },
    ],
  },
  // {
  //   name: "uPhone",
  //   label: "Phone",
  //   type: InputType.number,
  //   validation: [
  //     { rule: validationRules.phone },
  //     { rule: validationRules.required },
  //   ],
  // },
  {
    name: "email",
    label: "Email",
    type: InputType.email,
    validation: [
      { rule: validationRules.email },
      { rule: validationRules.required },
    ],
  },
];
