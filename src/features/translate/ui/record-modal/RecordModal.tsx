import { MicrophoneIcon } from "@/shared/assets/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecordModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm  backdrop-animate-in"
        onClick={onClose}
      />

      <div className="relative p-8">
        <div className="flex justify-center items-center w-34 h-34 bg-white rounded-full">
          <MicrophoneIcon />
        </div>
        <p className="text-white text-xl text-center mt-6">Listening...</p>
      </div>
    </div>
  );
};

export default RecordModal;
