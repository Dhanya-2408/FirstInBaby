import { InputBaseProps, InputType } from "../../../models/types";
import { validationRules } from "../../../utils/Validation";

export type IReviewFormState = {
  name: string;
  email: string;
  reviewTitle: string;
  reviewDescription: string;
  rating: string;
  file: any;
};

export type ReviewFormInput = InputBaseProps<IReviewFormState>;

export const initialReviewFormState: IReviewFormState = {
  name: "",
  email: "",
  reviewTitle: "",
  reviewDescription: "",
  rating: "",
  file: "",
};

export const ReviewFormInputs: ReviewFormInput[] = [
  {
    name: "name",
    label: "UserName",
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
    name: "reviewTitle",
    label: "Title",
    type: InputType.text,
    validation: [{ rule: validationRules.required }],
  },
  {
    name: "reviewDescription",
    label: "Description",
    type: InputType.textarea,
    validation: [{ rule: validationRules.required }],
  },
  {
    name: "rating",
    label: "Rating",
    type: InputType.number,
    validation: [{ rule: validationRules.required }],
  },
  {
    name: "file",
    label: "Image",
    type: InputType.file,
    validation: [{ rule: validationRules.required }],
  },
];
