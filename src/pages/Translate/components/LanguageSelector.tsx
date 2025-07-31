import { ArrowLeftRightIcon } from "@/shared/assets/icons";

interface LanguageSelectorProps {
  sourceLang: string;
  targetLang: string;
  onSwap: () => void;
}

export const LanguageSelector = ({ sourceLang, targetLang, onSwap }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center justify-around p-6">
      <span className="text-xl text-black font-semibold">
        {sourceLang}
      </span>

      <button
        onClick={onSwap}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Swap languages"
      >
        <ArrowLeftRightIcon />
      </button>

      <span className="text-lg font-semibold text-black">
        {targetLang}
      </span>
    </div>
  );
};