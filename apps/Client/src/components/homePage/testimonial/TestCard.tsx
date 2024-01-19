import { FC } from "react";
import RatingStars from "./RatingsStars";

interface TestCardProps {
  avatar: string;
  comment: string;
    clientName: string;
    rating: number;
}

const TestCard: FC<TestCardProps> = ({ avatar, comment, clientName, rating }) => {
  return (
      <div
        className="border-2 border-gray-300 py-10 px-5 size-full"
      >
        <div className="flex items-center justify-center mb-4">
          <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full " />
        </div>
        <div className="text-start text-sm mb-4">{comment}</div>
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold justify-start">
            {clientName}
          </div>
          <RatingStars rating={rating} />
        </div>
      </div>
  );
};

export default TestCard;
