import { useState } from "react";
import {
  LogoIcon,
  SearchIcon,
  AwardIcon,
  HamburgerMenuIcon,
  AppStoreIcon,
  PlayStoreIcon,
  CrownIcon,
  CancelIcon,
} from "@/shared/assets/icons";
import { Modal } from "./Modal";

export const Header = () => {
  const [activeTab, setActiveTab] = useState("Translate");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleBuyPro = () => {
    setIsModalOpen(true);
  };

  const navItems = [
    { name: "Dictionary", href: "#" },
    { name: "Translate", href: "#" },
    { name: "Grammar", href: "#" },
    { name: "Thesaurus", href: "#" },
  ];

  return (
    <div className="w-full">
      {/* Top banner */}
      <div className="bg-primary-600 text-white py-2 px-4 text-center text-sm relative">
        <div className="flex items-center justify-center gap-4">
          <span>
            Get Wisdom dictionary in mobile apps. Get an access Anywhere and
            Everywhere!
          </span>
          <div className="flex items-center gap-2">
            <a href="/">
              <AppStoreIcon />
            </a>
            <a href="/">
              <PlayStoreIcon />
            </a>
          </div>
        </div>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200">
          <CancelIcon />
        </button>
      </div>

      <div className="bg-white px-4 py-3 max-w-[1240px] mx-auto flex items-center justify-between rounded-xl mt-4">
        <div className="flex items-center">
          <LogoIcon />
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`text-sm font-medium transition-colors ${
                activeTab === item.name
                  ? "text-primary-600 border-b-2 border-primary-600 pb-1"
                  : "text-gray-700 hover:text-primary-600"
              }`}
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={handleBuyPro}
            className="flex items-center justify-center gap-2 text-primary-600 font-medium"
          >
            <CrownIcon />
            <span className="text-transparent font-extrabold bg-clip-text bg-[linear-gradient(92.04deg,#026AA2_-3.79%,#512CCB_49.4%,#AF1AB7_103.79%)]">
              Wisdom Pro
            </span>
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <SearchIcon />
          </button>
          <button className="md:flex items-center gap-2 text-primary-700 bg-primary-50 border border-primary-200 font-medium text-sm py-2.5 px-3 rounded-xl">
            <AwardIcon />
            <span>Exercises</span>
          </button>
          <button className="bg-primary-600 py-2.5 px-3 rounded-2xl">
            <HamburgerMenuIcon />
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Buy Wisdom Pro"
        description="You have to buy Wisdom Pro version for creating more groups."
        primaryBtnText="Buy Wisdom Pro"
      />
    </div>
  );
};
