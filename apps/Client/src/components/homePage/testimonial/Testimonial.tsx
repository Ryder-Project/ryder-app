import { FC } from "react";
import MaxContainer from "../../common/MaxContainer";
import TestCard from "./TestCard";
import testimonialData, {
  TestimonialDataProps,
} from "../../../data/testimonialData";
const Testimonial: FC = () => {
  return (
    <MaxContainer>
      <div className="text-center text-orange-500 text-4xl font-bold my-10">
        What Our Clients Say About Us
      </div>
      <div className="grid grid-cols-3 gap-y-6 gap-x-6 justify-center">
        {testimonialData.map((testimonial: TestimonialDataProps, index) => (
          <TestCard
            key={index}
            avatar={testimonial.avatar}
            comment={testimonial.comment}
            clientName={testimonial.clientName}
            rating={testimonial.rating}
          />
        ))}
      </div>
    </MaxContainer>
  );
};

export default Testimonial;
