import { InputBaseProps, InputType } from "../../../models/types";
import { IAddress } from "../../../redux/slices/address/address.type";
import { validationRules } from "../../../utils/Validation";

export type IAddressFormState = Omit<IAddress, "id" | "isDefault">;

export const initialIAddressValues: IAddressFormState = {
  name: "",
  phone: "",
  email: "",
  flatNo: "",
  street: "",
  city: "",
  state: "",
  pin: "",
  landMark: "",
};

export type AddressFormInput = InputBaseProps<IAddressFormState>;

export const AddressFormInputs: AddressFormInput[] = [
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
    name: "phone",
    label: "Phone Number",
    type: InputType.number,
    validation: [
      { rule: validationRules.phone },
      { rule: validationRules.required },
    ],
  },
  {
    name: "flatNo",
    label: "FlatNo",
    type: InputType.text,
    validation: [{ rule: validationRules.required }],
  },
  {
    name: "street",
    label: "Street",
    type: InputType.text,
    validation: [{ rule: validationRules.required }],
  },
  {
    name: "state",
    label: "State",
    type: InputType.text,
    validation: [{ rule: validationRules.required }],
  },
  {
    name: "city",
    label: "City",
    type: InputType.text,
    validation: [{ rule: validationRules.required }],
  },
];

export const AddressFormGroupInputs: AddressFormInput[] = [
  {
    name: "pin",
    label: "Zip Code",
    type: InputType.number,
    validation: [
      { rule: validationRules.required },
      { rule: validationRules.length, args: 6 },
    ],
  },
  {
    name: "landMark",
    label: "Landmark",
    type: InputType.text,
  },
];
