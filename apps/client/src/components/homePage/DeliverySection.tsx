import { FC } from "react";
import MaxContainer from "../common/MaxContainer";

const DeliverySection: FC = () => {
  return (
    <div className="p-14  bg-gray-100 flex mt-14">
      <MaxContainer className="grid grid-cols-2 gap-20">
        <div className="">
          <img src={"./images/dispatch.jpg"} alt="Delivery" />
        </div>
        <div className="flex flex-col justify-center items-center gap-6">
          <div className=" text-orange-500 text-4xl font-bold capitalize">
            Quality riders & partners ready to deliver
          </div>
          <div className="text-zinc-800 font-normal ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis
            volutpat tortor ultricies tincidunt magna. Faucibus tempus pretium
            sed enim integer at aliquet a. Semper vel id lectus quis vitae,
            velit est. Orci mi sed dui viverra.
          </div>
        </div>
      </MaxContainer>
    </div>
  );
};

export default DeliverySection;
