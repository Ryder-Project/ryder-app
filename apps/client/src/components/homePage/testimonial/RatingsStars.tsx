import { FC } from "react";
import { Star } from "../../../assets/svg";

interface RatingProps {
  rating: number;
}

const RatingStars: FC<RatingProps> = ({ rating }) => {
  const filledStars = Array.from({ length: rating }, (_, index) => index + 1);
  const emptyStars = Array.from(
    { length: 5 - rating },
    (_, index) => rating + index + 1
  );

  return (
    <div className="flex items-center">
      {filledStars.map((star) => (
        <Star key={star} filled />
      ))}
      {emptyStars.map((star) => (
        <Star key={star} filled={false} />
      ))}
    </div>
  );
};
export default RatingStars;
