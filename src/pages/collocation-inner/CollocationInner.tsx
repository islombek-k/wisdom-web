import { ChevronRight } from "@/shared/assets/icons";
import { Footer } from "@/shared/ui/Footer";
import HeroHeader from "@/shared/ui/HeroHeader";
import KeyFeature1 from "@/shared/assets/images/key-feature-1.png";
import KeyFeature2 from "@/shared/assets/images/key-feature-2.png";
import KeyFeature3 from "@/shared/assets/images/key-feature-3.png";
import AdBg from "@/shared/assets/images/ad-bg.png";
import WordExplanationCard from "@/features/grammar/WordExplanationCard";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/axios";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

// API Types
interface Collocation {
  id: number;
  body: string;
}

interface CollocationDetailResponse {
  word: string;
  collocations: Collocation[];
}

// API function
const fetchCollocationDetail = async (
  id: string
): Promise<CollocationDetailResponse> => {
  const response = await apiClient.get(`/api/catalogue/collocation/view/${id}`);
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

const CollocationInner = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const {
    data: collocationData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["collocation-detail", id],
    queryFn: () => fetchCollocationDetail(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div>
        <HeroHeader />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-2">{t("common.loading")}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <HeroHeader />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center py-8 text-red-600">
            {t("collocation.errorLoading")}
          </div>
        </div>
      </div>
    );
  }

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
                    {collocationData?.word ||
                      t("collocation.collocationDetails")}
                  </h1>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    {t("collocation.detailDescription")}
                  </p>
                </div>

                {collocationData && (
                  <WordExplanationCard
                    grammarData={{
                      word: collocationData.word,
                      grammars: collocationData.collocations.map((col) => ({
                        id: col.id,
                        body: col.body,
                      })),
                    }}
                  />
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {t("grammar.browseGrammar")}
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

              <div className="bg-gradient-to-br from-[#02BFF4] to-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-extrabold mb-3">
                  Unlock the Power of Words with Wisdom Pro
                </h3>
                <p className="text-primary-100 text-sm mb-6 leading-relaxed">
                  Go beyond definitions. With Wisdom Pro, access advanced
                  etymologies, usage examples, pronunciation audio, grammar
                  insights, and more – all ad-free.
                </p>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Learn more about Pro →
                </button>
              </div>
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

export default CollocationInner;
