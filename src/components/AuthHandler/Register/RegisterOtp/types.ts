import { validationRules } from "../../../../utils/Validation";
import { InputBaseProps, InputType } from "../../../../models/types";

export type IRegisterOTPState = {
  token: string;
};
export type registerOtpInputProps = InputBaseProps<IRegisterOTPState>;

export const initialRegisterOtpState: IRegisterOTPState = {
  token: "",
};

export const RegisterOTPInputs: registerOtpInputProps[] = [
  {
    name: "token",
    label: "OTP",
    type: InputType.text,
    validation: [{ rule: validationRules.required }],
  },
];
