import { useEffect } from "react";
import { IF } from "../../ui_kits/IF";
import usePath from "../../hooks/usePath";
import { StarRating } from "./StarRating";
import { ReviewItem } from "./ReviewItem";
import { isEmpty } from "../../utils/script";
import toastMessage from "../../utils/toastMessage";
import { useAuth } from "../../contexts/AuthContext";
import { openModal } from "../../redux/slices/modal/modal.slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ReviewsOverview } from "./ReviewsOverview/ReviewsOverview";
import { reviewsData } from "../../redux/slices/product/product.selector";
import { IReview } from "../../redux/slices/product/product.type";
import { caluclatePercentage, groupByValueLength } from "../../utils/generics";
import { fetchReviewsAsync } from "../../redux/slices/product/product.reducer";
import { TextButton } from "../../ui_kits/Buttons/TextButton/TextButton.component";
import "./Review.scss";

export const Reviews = () => {
  const { user } = useAuth();
  const productId = usePath();
  const dispatch = useAppDispatch();
  const { data = [] } = useAppSelector(reviewsData);

  useEffect(() => {
    dispatch(fetchReviewsAsync(+productId));
  }, [dispatch, productId]);

  const reviewsLength = data?.length || 0;

  const averagRating =
    (data &&
      data.reduce((acc, review: IReview) => acc + review.rating, 0) /
        reviewsLength) ||
    0;

  // const averagRating = 5;
  const groupedList = groupByValueLength(data || [], "rating");

  const handleWriteReview = () => {
    if (user) {
      dispatch(
        openModal({
          modalType: "ReviewModal",
        })
      );
    } else {
      toastMessage("Login", "warning");
    }
  };

  return (
    <div className="RatingSummary">
      <div className="RatingWdgt__Header">
        <div className="RatingWdgt__Summary">
          <StarRating rating={averagRating || 0} />
          <div>Based on {data?.length} reviews</div>
        </div>
        <IF condition={!isEmpty(data)}>
          <div className="RatingWdgt__ReviewsSummary">
            {Array.from(Array(5).keys()).map((item: number) => {
              const itemIndex = item + 1;
              const groupListKey = groupedList[itemIndex] || 0;
              const percentage = caluclatePercentage(
                groupListKey,
                reviewsLength
              ).toFixed();
              return (
                <ReviewsOverview
                  rating={itemIndex}
                  count={groupListKey}
                  percentage={`${percentage}%`}
                />
              );
            })}
          </div>
        </IF>
        <div className="RatingWdgt__Action">
          <TextButton isSmall onClick={handleWriteReview}>
            WRITE REVIEW
          </TextButton>
        </div>
      </div>
      <div>
        {data?.map((item: IReview) => (
          <ReviewItem review={item} key={item.rid} />
        ))}
      </div>
    </div>
  );
};
