import { VolumeIcon, BookmarkIcon, CopyIcon } from "@/shared/assets/icons";

interface TranslationOutputProps {
  text: string;
  isLoading: boolean;
  error: string | null;
  onSpeak: () => void;
  onBookmark: () => void;
  onCopy: () => void;
}

export const TranslationOutput = ({ 
  text, 
  isLoading, 
  error, 
  onSpeak, 
  onBookmark, 
  onCopy 
}: TranslationOutputProps) => {
  const displayText = () => {
    if (isLoading) return "Translating...";
    if (error) return error;
    return text || "Translation";
  };

  const textColor = () => {
    if (error) return "text-red-500";
    if (isLoading) return "text-blue-500";
    return "text-gray-500";
  };

  return (
    <div className="relative p-6 bg-gray-100 rounded-xl">
      <div className={`w-full h-82 text-lg ${textColor()}`}>
        {displayText()}
      </div>
      
      <div className="flex items-center gap-4 absolute bottom-6 left-6">
        <button
          onClick={onSpeak}
          disabled={!text || isLoading}
          className="hover:bg-gray-200 rounded-full p-1 transition-colors disabled:opacity-50"
          aria-label="Speak translation"
        >
          <VolumeIcon />
        </button>
        
        <button
          onClick={onBookmark}
          disabled={!text || isLoading}
          className="hover:bg-gray-200 rounded-full p-1 transition-colors disabled:opacity-50"
          aria-label="Bookmark translation"
        >
          <BookmarkIcon />
        </button>
        
        <button
          onClick={onCopy}
          disabled={!text || isLoading}
          className="hover:bg-gray-200 rounded-full p-1 transition-colors disabled:opacity-50"
          aria-label="Copy translation"
        >
          <CopyIcon />
        </button>
      </div>
    </div>
  );
};