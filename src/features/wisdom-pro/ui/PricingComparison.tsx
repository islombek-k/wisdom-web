import React, { useState } from "react";
import { CheckCircleIcon } from "@/shared/assets/icons";
import WisdomProModal from "./WisdomProModal";

interface Feature {
  name: string;
  free: string | boolean;
  pro: string | boolean;
}

interface PricingPlan {
  name: string;
  label: string;
  price: string;
  originalPrice?: string;
  buttonText: string;
  features: string[];
}
const features: Feature[] = [
  { name: "Ads", free: true, pro: false },
  { name: "Profile premium badge", free: false, pro: true },
  { name: "Battle with friends", free: false, pro: true },
  { name: "Statistics", free: false, pro: true },
  { name: "Adding words", free: "30", pro: "unlimited" },
  { name: "Adding word groups", free: "1", pro: "unlimited" },
  { name: "Hearts", free: "3", pro: "5" },
  { name: "Auto claim hearts", free: false, pro: true },
  { name: "Text size change", free: false, pro: true },
];

const plans: PricingPlan[] = [
  {
    name: "Standard",
    label: "Standard",
    price: "29 000 UZS",
    buttonText: "Choose 1 month",
    features: [
      "Access to all basic features",
      "Basic reporting and analytics",
      "Up to 10 individual users",
      "20GB individual data each user",
      "Basic chat and email support",
    ],
  },
  {
    name: "Most popular",
    label: "Most popular",
    price: "69 000 UZS",
    originalPrice: "87 000 UZS",
    buttonText: "Choose 3 months",
    features: [
      "Access to all basic features",
      "Basic reporting and analytics",
      "Up to 10 individual users",
      "20GB individual data each user",
      "Basic chat and email support",
    ],
  },
  {
    name: "Big discount",
    label: "Big discount",
    price: "119 000 UZS",
    originalPrice: "174 000 UZs",
    buttonText: "Choose 6 months",
    features: [
      "Access to all basic features",
      "Basic reporting and analytics",
      "Up to 10 individual users",
      "20GB individual data each user",
      "Basic chat and email support",
    ],
  },
];

const PricingComparison: React.FC = () => {
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? <CheckCircleIcon /> : <span>-</span>;
    }
    return <span className="text-gray-700 text-center block">{value}</span>;
  };

  return (
    <div className="mt-6 mx-auto p-9 bg-white rounded-3xl">
      {/* Header */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div></div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-base-black mb-2">Free</h2>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-base-black mb-2">Pro</h2>
        </div>
      </div>

      {/* Overview Section */}
      <div className="mb-8">
        <h3 className="text-sm font-medium p-5 text-primary-700 mb-4">
          Overview
        </h3>

        {/* Features Comparison */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 gap-6 p-5 rounded-xl ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className="text-base-black font-semibold">
                {feature.name}
              </div>
              <div className="flex justify-center">
                {renderFeatureValue(feature.free)}
              </div>
              <div className="flex justify-center">
                {renderFeatureValue(feature.pro)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="border-t-8 border-t-primary-700 border border-gray-200 pt-8">
        <div className="grid grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="text-center p-8 border-r-1 border-r-gray-200 "
            >
              {/* Plan Label */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium border-1 border-primary-200 bg-primary-50 text-primary-700">
                  {plan.label}
                </span>
              </div>

              {/* Price */}
              <div className="mb-2">
                <div className="text-4xl font-bold text-base-black mb-1">
                  {plan.price}
                </div>
                <div className="text-xl text-gray-600 line-through min-h-[1.5rem]">
                  {plan.originalPrice || ""}
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsProModalOpen(true)}
                className="w-full bg-primary-600 hover:bg-primary-500 text-white font-medium py-3 px-6 rounded-lg transition-colors mb-6"
              >
                {plan.buttonText}
              </button>

              {/* Features List */}
              <div className="space-y-3 text-left pt-9 border-t-1 border-t-gray-200">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <CheckCircleIcon />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <WisdomProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />
    </div>
  );
};

export default PricingComparison;
