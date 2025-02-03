import { validationRules } from "../../../../utils/Validation";
import { InputBaseProps, InputType } from "../../../../models/types";

export type IRegisterFormState = {
  // fname: string;
  // lname: string;
  // uPhone: string;

  name: string;
  email: string;
  password: string;
  referredBy: string;
};

export type registerInputProps = InputBaseProps<IRegisterFormState>;

export const initialRegisterState: IRegisterFormState = {
  // fname: "",
  // lname: "",
  // uPhone: "",

  name: "",
  email: "",
  password: "",
  referredBy: "",
};

export const RegisterInputs: registerInputProps[] = [
  {
    name: "name",
    label: "First Name",
    type: InputType.text,
    validation: [
      { rule: validationRules.name },
      { rule: validationRules.required },
    ],
  },
  // {
  //   name: "lname",
  //   label: "Last Name",
  //   type: InputType.text,
  //   validation: [
  //     { rule: validationRules.name },
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
  // {
  //   name: "uPhone",
  //   label: "Phone Number",
  //   type: InputType.number,
  //   validation: [
  //     { rule: validationRules.phone },
  //     { rule: validationRules.required },
  //   ],
  // },
  {
    name: "password",
    label: "Password",
    type: InputType.password,
    validation: [
      { rule: validationRules.password },
      { rule: validationRules.required },
    ],
  },
  {
    name: "referredBy",
    label: "Referral Code",
    type: InputType.text,
  },
];
