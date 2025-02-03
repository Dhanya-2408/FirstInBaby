import { IF } from "../../ui_kits/IF";
import { StarRating } from "./StarRating";
import { isEmpty } from "../../utils/script";
import { IReview } from "../../redux/slices/product/product.type";

interface IProps {
  review: IReview;
}

export const ReviewItem = (props: IProps) => {
  const { review } = props;

  const [name, date, year] = review.name?.split(",");
  const [title, desc] = review.reviews?.split("desc:");

  return (
    <div className="Review">
      <div className="Review__Header">
        <div className="Review__Icon">{name.charAt(0).toUpperCase()}</div>
        <span className="Review__Author">{name}</span>
        <div className="Review__br"></div>
        <StarRating rating={review.rating} />
        <span className="Review__Timestamp">{`${date} ${year}`}</span>
      </div>
      <div className="Review__Content">
        <div className="Review__Title">{title}</div>
        <div className="Review__Body">
          <p>{desc}</p>
        </div>
        <IF condition={!isEmpty(review.url)}>
          <div className="Review__Pics">
            <img alt="User review pic" src={review.url} />
          </div>
        </IF>
      </div>
    </div>
  );
};
