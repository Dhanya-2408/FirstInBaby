import StarRatings from "react-star-ratings";
import { ImageListType } from "react-images-uploading";
import { useAuth } from "../../../contexts/AuthContext";
import useObjectState from "../../../hooks/useObjectState";
import { initialFormState } from "../../../models/constants";
import {
  initialReviewFormState,
  IReviewFormState,
  ReviewFormInput,
  ReviewFormInputs,
} from "./inputs";
import {
  IFormState,
  InputChangeEvent,
  InputFocusEvent,
  Messages,
} from "../../../models/types";
import { IF } from "../../../ui_kits/IF";
import usePath from "../../../hooks/usePath";
import { useAppDispatch } from "../../../redux/store";
import { FormError } from "../../AuthHandler/FormError";
import { ImageUploader } from "./ImageUploader/ImageUploader";
import { productService } from "../../../services/axiosServices";
import { FormTextArea, FormTextInput } from "../../../ui_kits/Form";
import { closeModal } from "../../../redux/slices/modal/modal.slice";
import ModalWrapper from "../../../ui_kits/modal/modal-wrapper.component";
import { FormElement } from "../../../ui_kits/Form/FormElements/FormElement";
import { fetchReviewsAsync } from "../../../redux/slices/product/product.reducer";

export const ReviewModal = () => {
  const productId = usePath();
  const dispatch = useAppDispatch();
  const { handleFormValidate, handleOnFocusEvent, updateData } = useAuth();

  const {
    obj: reviewState,
    get: getReviewState,
    update: updateReviewState,
  } = useObjectState(initialReviewFormState);

  const {
    obj: formState,
    update: updateFormState,
    setObj: setFormState,
  } = useObjectState(initialFormState as IFormState<IReviewFormState>);

  const message: Messages = {
    success: "Updated succesfully",
    error: "Error While updating password, Try again!",
  };

  const date = new Date();
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const currentDate = new Intl.DateTimeFormat("en-US", options as any).format(
    date
  );

  const handleOnsubmit = async () => {
    const isValid = handleFormValidate(
      ReviewFormInputs,
      reviewState,
      updateFormState
    );

    if (isValid) {
      const bodyFormData = new FormData();
      bodyFormData.append("file", reviewState.file);

      const reviewParams = {
        ...productService.addReviews,
        params: {
          name: `${reviewState.name},${currentDate},${reviewState.email}`,
          reviews: `${reviewState.reviewTitle},desc:${reviewState.reviewDescription}`,
          rating: reviewState.rating,
          mcid: productId,
        },
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      };

      const response = await updateData(
        reviewParams,
        formState,
        message,
        setFormState
      );
      if (response) {
        dispatch(fetchReviewsAsync(+productId));
        dispatch(closeModal());
      }
    }
  };

  return (
    <ModalWrapper
      size="tiny"
      header="Write Review"
      actionName="Add Review"
      handleActionClick={handleOnsubmit}
    >
      <div>
        <FormError formState={formState} />
        {ReviewFormInputs.map(({ validation, ...item }: ReviewFormInput) => {
          return (
            <FormElement key={item.name}>
              <IF condition={item.name === "rating"}>
                <StarRatings
                  rating={+reviewState.rating}
                  starDimension="15px"
                  starSpacing="1px"
                  starRatedColor="#d3b289"
                  changeRating={(newRating) => {
                    updateReviewState(item.name, newRating.toString());
                  }}
                />
              </IF>
              <IF condition={item.name === "reviewDescription"}>
                <FormTextArea
                  label={item.label}
                  placeholder={item.placeholder}
                  value={getReviewState(item.name)}
                  onFocus={(e: InputFocusEvent) =>
                    handleOnFocusEvent(e, initialFormState, setFormState)
                  }
                  onChange={(e: InputChangeEvent) => {
                    updateReviewState(item.name, e.target.value);
                  }}
                />
              </IF>
              <IF condition={item.type === "text" || item.type === "email"}>
                <FormTextInput
                  {...item}
                  value={getReviewState(item.name)}
                  onFocus={(e: InputFocusEvent) =>
                    handleOnFocusEvent(e, initialFormState, setFormState)
                  }
                  onChange={(e: InputChangeEvent) => {
                    updateReviewState(item.name, e.target.value);
                  }}
                />
              </IF>

              <IF condition={item.name === "file"}>
                <ImageUploader
                  updateImageChange={(imageList: ImageListType) => {
                    updateReviewState(item.name, imageList[0].file);
                  }}
                />
              </IF>
            </FormElement>
          );
        })}
      </div>
    </ModalWrapper>
  );
};
