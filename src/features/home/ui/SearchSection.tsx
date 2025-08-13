import { SearchIcon } from "@/shared/assets/icons";
import { useWordbankStore } from "@/shared/stores/wordbankStore";

import { ArrowUpLeftIcon } from "@/shared/assets/icons";
import { useEffect, useRef, useState } from "react";
import type { SearchResultItem } from "@/features/search/types";
import { useNavigate } from "react-router";
import { getSearchType } from "@/pages/translate/ui/TranslatePage";
import useDebounce from "@/shared/hooks/useDebounce";
import { useMutation } from "@tanstack/react-query";
import { searchApi } from "@/features/search/api/searchApi";

const searchTabs = ["Dictionary", "Grammar", "Collocations"];

const SearchSection = () => {
  const { sourceText, setSourceText } = useWordbankStore();
  const [activeTab, setActiveTab] = useState("Dictionary");
  const [searchResult, setSearchResult] = useState<SearchResultItem[]>([]);

  const [selectedLanguage, setSelectedLanguage] = useState("Uzbek");
  const dropdownRef = useRef(null);
  const debouncedSourceLang = useDebounce(sourceText, 500);

  const searchMutation = useMutation({
    mutationFn: searchApi.search,
    onSuccess: (response) => {
      if (response.status && response.result.length > 0) {
        const bestResult =
          response.result
            .filter((item) => item.star > 0)
            .sort((a, b) => b.star - a.star)[0] || response.result[0];
        console.log("bestResult", bestResult);
        setSearchResult(response?.result);
      } else {
        // setTranslation({
        //   word: "No translation found",
        // });
      }
    },
  });

  useEffect(() => {
    if (debouncedSourceLang.trim()) {
      const searchType = getSearchType("Uzbek", "English");
      searchMutation.mutate({
        type: searchType,
        search: debouncedSourceLang.trim(),
      });
    }
  }, [debouncedSourceLang]);

  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSearchResult([]);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchResult([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div className="flex items-center gap-2">
        <div className="relative w-full bg-white rounded-xl">
          <div className="flex items-center px-5">
            <SearchIcon />
            <input
              type="text"
              value={sourceText}
              onChange={(e) => {
                setSourceText(e.target.value);
                if (e.target.value.trim() === "") {
                  setSearchResult([]);
                }
              }}
              placeholder="Search dictionary"
              className="flex-1 outline-none px-4 py-4 text-lg  rounded-l-xl w-[500px]"
            />

            <div className="flex gap-2 py-2">
              <button
                onClick={() =>
                  setSelectedLanguage(
                    selectedLanguage === "English" ? "Uzbek" : "English"
                  )
                }
                className={`px-6 py-4 text-sm font-semibold rounded-md ml-4 ${
                  selectedLanguage === "English"
                    ? "bg-gray-200 text-gray-700"
                    : " text-gray-700 hover:bg-gray-100"
                }`}
              >
                English
              </button>
              <button
                onClick={() =>
                  setSelectedLanguage(
                    selectedLanguage === "Uzbek" ? "English" : "Uzbek"
                  )
                }
                className={`px-6 py-4 text-sm font-semibold rounded-md ${
                  selectedLanguage === "Uzbek"
                    ? "bg-gray-200 text-gray-700"
                    : " text-gray-500 hover:bg-gray-100"
                }`}
              >
                Uzbek
              </button>
            </div>
          </div>
          {sourceText.trim() && searchResult.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto"
            >
              {searchResult.map((result, index) => (
                <button
                  key={result.id}
                  className={`p-5 hover:bg-gray-100 border-b border-b-gray-200 w-full py-3 cursor-pointer transition-colors flex items-center justify-between  ${
                    index === 0 ? "rounded-t-xl" : ""
                  } `}
                >
                  <span className=" text-gray-900">{result.word_class}</span>
                  <ArrowUpLeftIcon />
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => {
            if (sourceText.trim()) {
              navigate("/translate");
            }
          }}
          className="p-[21px] bg-primary-600 text-white rounded-xl hover:opacity-95 transition-colors"
        >
          <SearchIcon stroke="white" />
        </button>
      </div>
      <div className="flex gap-2 rounded-lg p-2">
        {searchTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors bg-primary-600 text-white ${
              activeTab === tab ? "border border-white" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchSection;
