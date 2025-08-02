import { useMutation } from "@tanstack/react-query";
import { searchApi } from "../api/searchApi";
import { type SearchType, type TranslationResult } from "../types";
import { useState, useCallback } from "react";

export const useSearch = () => {
  return useMutation({
    mutationFn: searchApi.search,
    retry: 2,
  });
};

export const useTranslate = () => {
  const [translationHistory, setTranslationHistory] = useState<
    TranslationResult[]
  >([]);
  const [currentTranslation, setCurrentTranslation] =
    useState<TranslationResult | null>(null);

  const searchMutation = useSearch();

  const translateText = useCallback(
    async (text: string, sourceLang: string, targetLang: string) => {
      if (!text.trim()) {
        setCurrentTranslation(null);
        return;
      }

      const searchType: SearchType = getSearchType(sourceLang, targetLang);

      try {
        const response = await searchMutation.mutateAsync({
          type: searchType,
          search: text.trim(),
        });

        if (response.status && response.result.length > 0) {
          const bestResult =
            response.result
              .filter((item) => item.star > 0)
              .sort((a, b) => b.star - a.star)[0] || response.result[0];

          const translation: TranslationResult = {
            originalText: text,
            translatedText: bestResult.word_class,
            searchType,
            results: response.result,
            timestamp: Date.now(),
          };

          setCurrentTranslation(translation);

          setTranslationHistory((prev) =>
            [translation, ...prev.filter((t) => t.originalText !== text)].slice(
              0,
              10
            )
          );
        } else {
          const translation: TranslationResult = {
            originalText: text,
            translatedText: "No translation found",
            searchType,
            results: [],
            timestamp: Date.now(),
          };
          setCurrentTranslation(translation);
        }
      } catch (error) {
        console.error("Translation error:", error);
        setCurrentTranslation({
          originalText: text,
          translatedText: "Translation failed",
          searchType,
          results: [],
          timestamp: Date.now(),
        });
      }
    },
    [searchMutation]
  );

  const clearTranslation = useCallback(() => {
    setCurrentTranslation(null);
  }, []);

  const getAlternativeTranslations = useCallback(() => {
    return currentTranslation?.results.slice(1, 6) || [];
  }, [currentTranslation]);

  return {
    translateText,
    clearTranslation,
    getAlternativeTranslations,
    currentTranslation,
    translationHistory,
    isTranslating: searchMutation.isPending,
    error: searchMutation.error?.message || null,
    translatedText: currentTranslation?.translatedText || "",
  };
};

function getSearchType(sourceLang: string, targetLang: string): SearchType {
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
}
