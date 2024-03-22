import { FC } from 'react';
import {
  CustomerService,
  Nationwide,
  OrderFul,
  SecureService,
  TimelyDelivery,
  TrackShipment,
} from '../../../assets/svg';
import MaxContainer from '../../common/MaxContainer';
import ServiceCard from './ServiceCard';

const Services: FC = () => {
  return (
    <>
      <div className="size-full flex flex-col justify-start items-center gap-4 my-10">
        <div className="text-orange-500 text-4xl font-bold">
          Top Notch Services
        </div>
        <div className="text-center text-blue-950 text-sm font-normal">
          Quickly integrate powerful solutions that give you more flexibility
          and control
          <br /> over your parcel shipping and logistics processes.
        </div>
      </div>
      <MaxContainer>
        <div className="grid grid-cols-3 gap-y-6 gap-x-0 justify-center">
          <ServiceCard
            icon={<SecureService />}
            title="Reliable and secure"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sit omnis earum ea ullam aut quis eaque impedit rem assumenda!1."
          />
          <ServiceCard
            icon={<TimelyDelivery />}
            title="On-time delivery"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sit omnis earum ea ullam aut quis eaque impedit rem assumenda!2."
          />
          <ServiceCard
            icon={<TrackShipment />}
            title="Track your shipment"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sit omnis earum ea ullam aut quis eaque impedit rem assumenda!3."
          />
          <ServiceCard
            icon={<CustomerService />}
            title="Great Customer Service"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sit omnis earum ea ullam aut quis eaque impedit rem assumenda!4."
          />
          <ServiceCard
            icon={<Nationwide />}
            title="Order Fulfilment"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sit omnis earum ea ullam aut quis eaque impedit rem assumenda!5."
          />
          <ServiceCard
            icon={<OrderFul />}
            title="Order Fulfilment"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sit omnis earum ea ullam aut quis eaque impedit rem assumenda!6."
          />
        </div>
      </MaxContainer>
    </>
  );
};

export default Services;
