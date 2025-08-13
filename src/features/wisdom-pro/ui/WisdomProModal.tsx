import { useState } from "react";
import { Modal } from "@/shared/ui";
import Payme from "@/shared/assets/images/payme.png";
import Click from "@/shared/assets/images/click.png";

const WisdomProModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Select payment method"
      description="Select a payment method — Click or Payme — to finish your upgrade."
      isBtnAvailable={false}
    >
      <div className="flex gap-6 items-center">
        <label className="w-full cursor-pointer">
          <div className="flex items-center justify-between p-6 border-1 border-gray-200 rounded-xl">
            <img src={Payme} alt="Payme" />
            <input
              type="radio"
              name="paymentMethod"
              value="payme"
              checked={selectedPayment === "payme"}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
            />
          </div>
        </label>
        <label className="w-full cursor-pointer">
          <div className="flex items-center justify-between p-6 border-1 border-gray-200 rounded-xl">
            <img src={Click} alt="Click" />
            <input
              type="radio"
              name="paymentMethod"
              value="click"
              checked={selectedPayment === "click"}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
            />
          </div>
        </label>
      </div>
      <div className="flex gap-6 mt-8">
        <button
          onClick={onClose}
          className="w-full bg-gray-50 border-1 border-gray-300 p-3 text-gray-700 rounded-xl hover:opacity-85"
        >
          Cancel
        </button>
        <button
          disabled={selectedPayment === ""}
          className={`w-full text-white p-3  rounded-xl hover:opacity-85 ${
            selectedPayment === ""
              ? "cursor-not-allowed bg-primary-200"
              : "bg-primary-600"
          }`}
        >
          Proceed payment
        </button>
      </div>
      <div className="mt-9 flex text-center items-center justify-around">
        <a href="/" className="w-[188px] text-primary-600 font-semibold">
          Restore Purchase
        </a>
        <a href="/" className="w-[188px] text-primary-600 font-semibold">
          Privacy
        </a>
        <a href="/" className="w-[188px] text-primary-600 font-semibold">
          Terms
        </a>
      </div>
    </Modal>
  );
};

export default WisdomProModal;
