import React, { ReactNode } from "react";

type Props = {
  feature: {
    icon: ReactNode;
    title: string;
    description: string;
  };
  index: number;
};

const FeatureCard = ({ feature }: Props) => (
  <div className="relative group">
    <div className="relative p-8 bg-white rounded-2xl border border-gray-100 group-hover:bg-opacity-95 transition-all duration-300 h-full flex flex-col items-center justify-center">
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">
        {feature.title}
      </h3>
      <p className="text-gray-600 text-center leading-relaxed">
        {feature.description}
      </p>
    </div>
  </div>
);

export default FeatureCard;
