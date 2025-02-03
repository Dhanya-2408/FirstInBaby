import { validationRules } from "../../../../utils/Validation";
import { InputBaseProps, InputType } from "../../../../models/types";

export type ILoginOTPState = {
  token: string;
};
export type LoginOTPInput = InputBaseProps<ILoginOTPState>;

export const initialLoginOTPState: ILoginOTPState = {
  token: "",
};

export const LoginOTPInputs: LoginOTPInput[] = [
  {
    name: "token",
    label: "OTP",
    type: InputType.text,
    validation: [{ rule: validationRules.required }],
  },
];
