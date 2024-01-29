import { FC, ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
      <div
        className="py-10 px-5 size-full border-2 border-gray-300"
      >
        <div className="flex items-center justify-center py-4">{icon}</div>
        <div className="text-center font-bold mb-2">{title}</div>
        <div className="text-center">{description}</div>
      </div>
  );
};

export default ServiceCard;