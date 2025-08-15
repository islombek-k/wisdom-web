import { ChevronRight } from "@/shared/assets/icons";
import { Footer } from "@/shared/ui/Footer";
import HeroHeader from "@/shared/ui/HeroHeader";
import KeyFeature1 from "@/shared/assets/images/key-feature-1.png";
import KeyFeature2 from "@/shared/assets/images/key-feature-2.png";
import KeyFeature3 from "@/shared/assets/images/key-feature-3.png";
import LearnMoreProCard from "@/shared/ui/LearnMoreProCard";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// API Types
interface CollocationWord {
  id: number;
  worden: {
    id: number;
    word: string;
  };
}

interface CollocationApiResponse {
  current_page: number;
  data: CollocationWord[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// API function
const fetchCollocationData = async (
  page: number = 1
): Promise<CollocationApiResponse> => {
  // Try multiple parameter names for pagination
  const response = await apiClient.get(
    `/api/catalogue/collocations?page=${page}&page_size=10&limit=10&per_page=10`
  );
  return response.data;
};

const keyFeatures = [
  {
    id: 1,
    icon: KeyFeature1,
    description:
      "Useful information on spelling, punctuation and word formation",
  },
  {
    id: 2,
    icon: KeyFeature2,
    description: "Important advice on how to use English in conversation",
  },
  {
    id: 3,
    icon: KeyFeature3,
    description:
      "Useful information on spelling, punctuation and word formation",
  },
];

const alphabetLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const Collocation = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: collocationData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["collocation", currentPage],
    queryFn: () => fetchCollocationData(currentPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (collocationData?.next_page_url) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (collocationData?.prev_page_url) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <HeroHeader />
      <div className="bg-white font-bold">
        <div className="flex items-center gap-3 py-4 mx-auto w-[1240px]">
          <a
            href="/"
            className="text-sm font-medium text-breadcrumb-label-secondary hover:backdrop-opacity-90"
          >
            {t("common.home")}
          </a>
          <ChevronRight />
          <a
            href="/collocation"
            className="text-sm text-breadcrumb-label hover:backdrop-opacity-90"
          >
            {t("common.collocation")}
          </a>
        </div>
      </div>
      <div className="mx-auto px-25 py-4">
        <div className="max-w-[1240px] mx-auto mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8">
                <div className="mb-8">
                  <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                    {t("collocation.exploreCollocations")}
                  </h1>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    {t("collocation.description")}
                  </p>
                </div>

                {isLoading ? (
                  <div className="flex justify-center items-center py-8 h-[1000px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-red-600">
                    {t("collocation.errorLoading")}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {collocationData?.data.map((item) => (
                      <a
                        key={item.id}
                        href={`/collocation/${item.id}`}
                        className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                      >
                        <span className="text-gray-900 font-medium">
                          {item.worden.word}
                        </span>
                        <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </a>
                    ))}
                  </div>
                )}

                {collocationData && (
                  <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                      <button
                        onClick={handlePrevious}
                        disabled={!collocationData.prev_page_url}
                        className={`p-2 transition-colors rotate-180 ${
                          collocationData.prev_page_url
                            ? "text-gray-600 hover:text-gray-800 cursor-pointer"
                            : "text-gray-300 cursor-not-allowed"
                        }`}
                      >
                        <ChevronRight />
                      </button>
                      <div className="flex items-center mx-4">
                        {Array.from(
                          { length: Math.min(5, collocationData.last_page) },
                          (_, i) => {
                            const page = i + 1;
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-1 mx-1 rounded transition-colors ${
                                  currentPage === page
                                    ? "bg-primary-600 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                              >
                                {page}
                              </button>
                            );
                          }
                        )}
                      </div>
                      <button
                        onClick={handleNext}
                        disabled={!collocationData.next_page_url}
                        className={`p-2 transition-colors ${
                          collocationData.next_page_url
                            ? "text-gray-600 hover:text-gray-800 cursor-pointer"
                            : "text-gray-300 cursor-not-allowed"
                        }`}
                      >
                        <ChevronRight />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl p-8 mt-8">
                <h2 className="text-2xl font-semibold text-black mb-4">
                  {t("common.keyFeatures")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {keyFeatures?.map((feature) => (
                    <div key={feature.id}>
                      <img src={feature.icon} alt="Feature icon" />
                      <p className="text-sm text-base-black leading-relaxed mt-3">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Browse the English Grammar
                </h3>

                <div className="grid grid-cols-7 gap-3 mb-6">
                  {alphabetLetters.slice(0, 28).map((letter) => (
                    <button
                      key={letter}
                      className="w-10 h-10 text-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>

              <LearnMoreProCard />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Collocation;
