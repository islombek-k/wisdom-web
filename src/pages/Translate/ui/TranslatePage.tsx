import { useState, useEffect } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { searchApi } from "@/features/search/api/searchApi";
import { type SearchType } from "@/features/search/types";
import useDebounce from "@/shared/hooks/useDebounce";
import { useWordbankStore } from "@/shared/stores/wordbankStore";

const getSearchType = (sourceLang: string, targetLang: string): SearchType => {
  const source = sourceLang.toLowerCase();
  const target = targetLang.toLowerCase();

  if (source.includes("uzbek") && target.includes("english")) {
    return "uz";
  } else if (source.includes("english") && target.includes("uzbek")) {
    return "en";
  } else if (source.includes("uzbek") && target.includes("uzbek")) {
    return "globaluz";
  } else {
    return "global";
  }
};

export const TranslatePage = () => {
  // const [sourceText, setSourceText] = useState("");
  const [sourceLang, setSourceLang] = useState("Uzbek");
  const [targetLang, setTargetLang] = useState("English");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [isnewGroupModalOpen, setIsnewGroupModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  const { setTranslation, translation, sourceText, setSourceText } =
    useWordbankStore();
  const debouncedSourceLang = useDebounce(sourceText, 500);
  const searchMutation = useMutation({
    mutationFn: searchApi.search,
    onSuccess: (response) => {
      if (response.status && response.result.length > 0) {
        const bestResult =
          response.result
            .filter((item) => item.star > 0)
            .sort((a, b) => b.star - a.star)[0] || response.result[0];

        setTranslation(bestResult);
      } else {
        setTranslation({
          word: "No translation found",
        });
      }
    },
    onError: () => {
      setTranslation({
        word: "Translation failed",
      });
    },
  });

  useEffect(() => {
    if (debouncedSourceLang.trim()) {
      const searchType = getSearchType(sourceLang, targetLang);
      searchMutation.mutate({
        type: searchType,
        search: debouncedSourceLang.trim(),
      });
    } else {
      setTranslation({
        word: "",
      });
    }
  }, [debouncedSourceLang, sourceLang, targetLang]);

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translation?.word || "");
    setTranslation({
      word: sourceText,
    });
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
                {searchMutation.isPending
                  ? "Translating..."
                  : translation?.word_class || "Translation"}
              </div>
              <div className="flex items-center gap-4 absolute bottom-6 left-6">
                <button>
                  <VolumeIcon />
                </button>
                <button
                  disabled={sourceText.length === 0}
                  onClick={() => setIsBookmarkModalOpen(true)}
                >
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
        translation={{
          id: translation?.id ?? 0,
          word: translation?.word ?? "",
          star: translation?.star ?? 0,
          word_class: translation?.word_class ?? "",
          type: translation?.type ?? "",
        }}
      />
      <NewGroupModal
        isnewGroupModalOpen={isnewGroupModalOpen}
        setIsnewGroupModalOpen={setIsnewGroupModalOpen}
        setIsBookmarkModalOpen={setIsBookmarkModalOpen}
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
