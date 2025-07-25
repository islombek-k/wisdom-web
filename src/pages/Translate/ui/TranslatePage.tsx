import { useState } from "react";
import { Header } from "../../../shared/ui/Header";
import { Footer } from "../../../shared/ui/Footer";
import { ArrowLeftRightIcon, ArrowRightIcon } from "@/shared/assets/icons";

export const TranslatePage = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Uzbek");

  const popularSearches = [
    { id: "01", word: "money", link: true },
    { id: "02", word: "bear", link: true },
    { id: "03", word: "although", link: true },
    { id: "04", word: "lead", link: true },
    {
      id: "05",
      word: "be in the mood (for something/to do something)",
      italic: "idiom",
      link: true,
    },
    { id: "06", word: "air filter", link: true },
    { id: "07", word: "bee", link: true },
    { id: "08", word: "plain", link: true },
    { id: "09", word: "filter", link: true },
    { id: "10", word: "more than", link: true },
    { id: "11", word: "mobile", link: true },
    { id: "12", word: "frame", link: true },
    { id: "13", word: "keys", link: true },
    { id: "14", word: "Privacy", link: true },
    { id: "15", word: "to be in mood", link: true },
  ];

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
        {/* Single Card Container */}
        <div className="bg-white rounded-2xl shadow-sm">
          {/* Language Selection Header */}
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

          {/* Translation Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-6 ">
            {/* Source Text */}
            <div className="p-6 border border-gray-200 rounded-2xl">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Start typing..."
                className="w-full h-48 resize-none border-none outline-none text-gray-900 placeholder-gray-400 text-lg bg-transparent"
                maxLength={5000}
              />
              <div className="flex justify-end mt-4">
                <span className="text-sm text-gray-400">
                  {sourceText.length} / 5000
                </span>
              </div>
            </div>

            {/* Translated Text */}
            <div className="p-6 bg-gray-100 rounded-xl">
              <div className="w-full h-48 text-gray-500 text-lg">
                {translatedText || "Translation"}
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-lg font-medium text-gray-900">History</h2>
              <ArrowRightIcon />
            </div>

            <div className="text-center py-8">
              <div className="text-gray-900 font-medium mb-2">No history</div>
              <div className="text-gray-500 text-sm">
                Type something to make a history
              </div>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="rounded-b-2xl border-b border-gray-200">
            <div className="m-6 mt-0 p-6 bg-primary-50 rounded-xl">
              <h2 className="text-lg font-medium text-gray-900">
                Popular searches
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
                {popularSearches.map((item) => (
                  <div key={item.id} className="flex items-center gap-1">
                    <span className="text-sm text-base-black font-medium min-w-[24px]">
                      {item.id}
                    </span>
                    <div className="flex-1">
                      {item.link ? (
                        <button className="text-primary-600 underline hover:text-primary-700 text-left text-sm">
                          {item.word}
                          {item.italic && (
                            <span className="italic text-base-black ml-1">
                              {item.italic}
                            </span>
                          )}
                        </button>
                      ) : (
                        <span className="text-gray-900 text-sm">
                          {item.word}
                          {item.italic && (
                            <span className="italic text-base-black ml-1">
                              {item.italic}
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
