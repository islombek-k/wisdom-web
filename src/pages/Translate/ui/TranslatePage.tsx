import { useState } from "react";
import { Header } from "@/shared/ui/Header";
import { Footer } from "@/shared/ui/Footer";
import { Modal } from "@/shared/ui";
import {
  ArrowLeftRightIcon,
  BookmarkIcon,
  CancelBlackIcon,
  CopyIcon,
  FileIcon,
  MicrophoneIcon,
  VolumeIcon,
} from "@/shared/assets/icons";
import Translate from "@/features/translate/ui/translate-page/Translate";
import BookmarkModal from "@/features/translate/ui/bookmark-modal/BookmarkModal";
import NewGroupModal from "@/features/translate/ui/new-group-modal/NewGroupModal";
import RecordModal from "@/features/translate/ui/record-modal/RecordModal";

export const TranslatePage = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Uzbek");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [isnewGroupModalOpen, setIsnewGroupModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-[1240px] mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="flex items-center justify-around p-6 ">
            <div className="flex items-center gap-4 justify-self-center">
              <span className="text-xl text-black font-semibold">
                {sourceLang}
              </span>
            </div>

            <button
              onClick={handleSwapLanguages}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeftRightIcon />
            </button>

            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-black">
                {targetLang}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-6 pb-6 ">
            <div className="relative p-6 border h-full border-gray-200 rounded-2xl">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Start typing..."
                className=" w-full h-82 resize-none border-none outline-none text-gray-900 placeholder-gray-400 text-lg bg-transparent"
                maxLength={5000}
              />
              <button
                className="absolute top-6 right-6"
                onClick={() => setSourceText("")}
              >
                {sourceText.length > 0 ? <CancelBlackIcon /> : <FileIcon />}
              </button>
              <button
                className="absolute left-6 bottom-6"
                onClick={() => setIsRecordModalOpen(true)}
              >
                <MicrophoneIcon />
              </button>
              <div className="flex justify-end mt-4">
                <span className="text-sm text-gray-400">
                  {sourceText.length} / 5000
                </span>
              </div>
            </div>

            <div className="relative p-6 bg-gray-100 rounded-xl">
              <div className="w-full h-82 text-gray-500 text-lg">
                {sourceText || "Translation"}
              </div>
              <div className="flex items-center gap-4 absolute bottom-6 left-6">
                <button>
                  <VolumeIcon />
                </button>
                <button onClick={() => setIsBookmarkModalOpen(true)}>
                  <BookmarkIcon />
                </button>
                <button>
                  <CopyIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Translate />

      <Footer />

      <BookmarkModal
        isBookmarkModalOpen={isBookmarkModalOpen}
        setIsBookmarkModalOpen={setIsBookmarkModalOpen}
        onPressNewModal={() => setIsnewGroupModalOpen(true)}
      />
      <NewGroupModal
        isnewGroupModalOpen={isnewGroupModalOpen}
        setIsnewGroupModalOpen={setIsnewGroupModalOpen}
      />
      <RecordModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
      />
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
