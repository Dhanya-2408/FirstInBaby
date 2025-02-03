import { InputBaseProps, InputType } from "../../../../models/types";
import { validationRules } from "../../../../utils/Validation";

export type IHelpState = {
  message: string;
};

export type HelpInput = InputBaseProps<IHelpState>;

export const initialHelpInputState: IHelpState = {
  message: "",
};

export const HelpInputs: HelpInput[] = [
  {
    name: "message",
    label: "Message",
    type: InputType.textarea,
    validation: [{ rule: validationRules.required }],
  },
];
