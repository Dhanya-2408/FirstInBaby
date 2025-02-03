import StarRatings from "react-star-ratings";

interface IProps {
  rating: number;
}

export const StarRating = ({ rating }: IProps) => {
  return (
    <StarRatings
      rating={rating}
      starDimension="15px"
      starSpacing="1px"
      starRatedColor="#ef5e9a"
    />
  );
};
