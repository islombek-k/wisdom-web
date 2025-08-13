import { ChevronRight } from "@/shared/assets/icons";
import { Footer } from "@/shared/ui/Footer";
import HeroHeader from "@/shared/ui/HeroHeader";
import KeyFeature1 from "@/shared/assets/images/key-feature-1.png";
import KeyFeature2 from "@/shared/assets/images/key-feature-2.png";
import KeyFeature3 from "@/shared/assets/images/key-feature-3.png";
import AdBg from "@/shared/assets/images/ad-bg.png";
import LearnMoreProCard from "@/shared/ui/LearnMoreProCard";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/axios";
import { useState } from "react";

// API Types
interface GrammarWord {
  id: number;
  worden: {
    id: number;
    word: string;
  };
}

interface GrammarApiResponse {
  current_page: number;
  data: GrammarWord[];
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
const fetchGrammarData = async (
  page: number = 1
): Promise<GrammarApiResponse> => {
  // Try multiple parameter names for pagination
  const response = await apiClient.get(
    `/api/catalogue/grammar?page=${page}&page_size=10&limit=10&per_page=10`
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

const GrammarAndCollocation = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: grammarData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["grammar", currentPage],
    queryFn: () => fetchGrammarData(currentPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (grammarData?.next_page_url) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (grammarData?.prev_page_url) {
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
            Home
          </a>
          <ChevronRight />
          <a
            href="/grammar"
            className="text-sm text-breadcrumb-label hover:backdrop-opacity-90"
          >
            Grammar
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
                    Explore the English Grammar
                  </h1>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    Get clear grammar explanations with hundreds of examples of
                    how grammar is used in natural written and spoken English.
                  </p>
                </div>

                {isLoading ? (
                  <div className="flex justify-center items-center py-8 h-[1000px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-red-600">
                    Error loading grammar data. Please try again.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {grammarData?.data.map((item) => (
                      <a
                        key={item.id}
                        href={`/grammar/${item.id}`}
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

                {grammarData && (
                  <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                      <button
                        onClick={handlePrevious}
                        disabled={!grammarData.prev_page_url}
                        className={`p-2 transition-colors rotate-180 ${
                          grammarData.prev_page_url
                            ? "text-gray-600 hover:text-gray-800 cursor-pointer"
                            : "text-gray-300 cursor-not-allowed"
                        }`}
                      >
                        <ChevronRight />
                      </button>
                      <span className="text-sm text-gray-500 mr-2">
                        Previous
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {grammarData.links
                        .filter(
                          (link) =>
                            link.label !== "&laquo; Previous" &&
                            link.label !== "Next &raquo;" &&
                            link.label !== "..."
                        )
                        .map((link, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              link.url && handlePageChange(parseInt(link.label))
                            }
                            disabled={!link.url}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              link.active
                                ? "bg-primary-600 text-white"
                                : link.url
                                ? "text-gray-600 hover:bg-gray-100 cursor-pointer"
                                : "text-gray-300 cursor-not-allowed"
                            }`}
                          >
                            {link.label}
                          </button>
                        ))}
                    </div>

                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 ml-2">Next</span>
                      <button
                        onClick={handleNext}
                        disabled={!grammarData.next_page_url}
                        className={`p-2 transition-colors ${
                          grammarData.next_page_url
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
                  Key features
                </h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  Adapted from English Grammar Today, the English Grammar
                  provides authentic examples of the way in which grammar is
                  used in real-life situations, including standard and non-
                  standard varieties of English.
                </p>

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

            <div className="space-y-6">
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
              <div className="relative">
                <img src={AdBg} alt="ad" />
                <div className="absolute top-4 left-4 text-sm bg-white/70 hover:bg-white/90  px-4 py-2 rounded-3xl font-medium transition-colors">
                  Advertise
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GrammarAndCollocation;
