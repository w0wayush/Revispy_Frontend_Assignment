import React from "react";
import FeatureCard from "./FeatureCard";
import { ShoppingBag, Shield, Truck, CreditCard } from "lucide-react";

const features = [
  {
    icon: <ShoppingBag className="w-12 h-12 text-primary" />,
    title: "Wide Selection",
    description:
      "Browse through thousands of curated products from top sellers",
  },
  {
    icon: <Shield className="w-12 h-12 text-primary" />,
    title: "Secure Shopping",
    description:
      "Your transactions are protected with industry-leading security",
  },
  {
    icon: <Truck className="w-12 h-12 text-primary" />,
    title: "Fast Delivery",
    description: "Quick and reliable shipping to your doorstep",
  },
  {
    icon: <CreditCard className="w-12 h-12 text-primary" />,
    title: "Easy Payments",
    description: "Multiple payment options for your convenience",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-xl text-gray-600">
            Experience the difference with our cutting-edge features designed
            for your success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
