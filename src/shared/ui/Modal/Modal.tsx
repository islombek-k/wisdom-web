import { type ReactNode } from "react";
import { CancelBlackIcon } from "@/shared/assets/icons";
import { Button } from "@/shared/ui/Button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  primaryBtnText?: string;
  isBtnAvailable?: boolean;
  isPrimaryBtnDisabled?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  primaryBtnText = "Save",
  isBtnAvailable = true,
  isPrimaryBtnDisabled = false,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm  backdrop-animate-in"
        onClick={onClose}
      />

      <div className="relative modal-animate-in bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 border border-gray-300 right-4 p-1 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <CancelBlackIcon />
        </button>

        <div className="mb-6 pr-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
          {description && (
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div>{children}</div>
        {isBtnAvailable && (
          <div className="flex justify-end items-center gap-4">
            <Button
              variant="icon"
              onClick={onClose}
              className="rounded-xl w-auto"
            >
              Cancel
            </Button>
            <Button
              disabled={isPrimaryBtnDisabled}
              variant="primary"
              className="rounded-xl w-auto"
            >
              {primaryBtnText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
