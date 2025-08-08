import { useEffect, useRef, useState } from "react";
import {
  AppStoreBadge,
  ArrowRightIcon,
  ArrowUpLeftIcon,
  CrownWhiteIcon,
  DesktopIcon,
  LoginIcon,
  PlayStoreBadge,
  ProfileWhiteIcon,
  SearchIcon,
} from "@/shared/assets/icons";
import WhiteLogo from "@/shared/assets/images/white_logo_wisdom.png";
import BgOrnament from "@/shared/assets/images/bg_big_ornament.png";
import QR from "@/shared/assets/images/QR.png";
import WisdomContainer from "@/shared/assets/images/bg_wisdom_container.png";
import FlipCard from "@/shared/assets/images/flip_card.png";
import { Footer } from "@/shared/ui/Footer";
import OrnamentBg from "@/shared/assets/images/BG_ornament.png";
import WordOne from "@/shared/assets/images/word_one.png";
import WordTwo from "@/shared/assets/images/word_two.png";
import WordThree from "@/shared/assets/images/word_three.png";
import { useWordbankStore } from "@/shared/stores/wordbankStore";
import { useNavigate } from "react-router";
import HeroSliderSection from "@/features/home/ui/HeroSliderSection";
import { useMutation } from "@tanstack/react-query";
import { searchApi } from "@/features/search/api/searchApi";
import useDebounce from "@/shared/hooks/useDebounce";
import { getSearchType } from "@/pages/translate/ui/TranslatePage";
import type { SearchResultItem } from "@/features/search/types";

const cardData = [
  {
    type: "GRAMMAR",
    title: "Other Than or Other Then: Which One Is Correct?",
    descrption:
      "Other than is a phrase used to mean “besides” or “except for.” It is a synonym of barring and apart from. The phrase “other then” doesn’t have a meaning in English.",
    id: 1,
  },
  {
    type: "COLLOCATION",
    title:
      "“Fathers Day” vs. “Father’s Day”: What’s The Correct Way For Celebrating Dad?",
    descrption:
      "We all know what Father’s Day is: the one day of the year where we take time to recognize how special dads are.",
    id: 2,
  },
  {
    type: "Grammar",
    title: "Woman vs. Women: What’s the Difference?",
    descrption:
      "Woman is an irregular noun. The plural form of woman is women (and not womans), as in The panel consisted of four women and three men. ",
    id: 2,
  },
];

const differenceInWords = [
  {
    image: WordOne,
    title: "For linguists, it was the decade of the pronoun",
    id: 1,
  },
  {
    image: WordTwo,
    title: "Norwegians using ‘Texas’ to mean ‘crazy’ actually isn’t so crazy",
    id: 2,
  },
  {
    image: WordThree,
    title:
      "Giving back to English: how Nigerian words made it into the Oxford English Dictionary",
    id: 3,
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dictionary");
  const [selectedLanguage, setSelectedLanguage] = useState("Uzbek");
  const [searchResult, setSearchResult] = useState<SearchResultItem[]>([]);
  const { sourceText, setSourceText } = useWordbankStore();
  const debouncedSourceLang = useDebounce(sourceText, 500);
  const dropdownRef = useRef(null);

  const navItems = [
    "Dictionary",
    "AI Translate",
    "Grammar",
    "Collocations",
    "Word War",
    "My Contacts",
    "My Words",
    "News",
    "About Us",
  ];

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
        // setTranslation(bestResult);
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

  const searchTabs = ["Dictionary", "Grammar", "Collocations"];

  return (
    <div className="min-h-screen bg-gradient-to-br relative overflow-hidden">
      <header className="relative z-10 px-6 py-4 bg-primary-900">
        <div className="mx-auto px-25 flex items-center justify-between">
          <nav className="flex items-center space-x-5">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-white font-medium hover:text-white/80 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
              <CrownWhiteIcon />
              <span className="text-sm font-medium">Wisdom Pro</span>
            </button>

            <a
              href="/register"
              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ProfileWhiteIcon />
            </a>
          </div>
        </div>
      </header>

      <main
        style={{
          backgroundImage: `url(${BgOrnament})`,
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex gap-25 items-center py-20">
          <div className="flex justify-between items-center gap-25 px-25">
            <div className="mb-12">
              <img
                src={WhiteLogo}
                alt="Wisdom Dictionary"
                className="mx-auto h-20"
              />
            </div>

            <div>
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
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
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
                            : "bg-gray-50 text-gray-500 hover:bg-gray-100"
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
                          // onClick={() => handleSuggestionClick(suggestion)}
                          className={`p-5 hover:bg-gray-100 border-b border-b-gray-200 w-full py-3 cursor-pointer transition-colors flex items-center justify-between  ${
                            index === 0 ? "rounded-t-xl" : ""
                          } `}
                        >
                          {/* <Search className="w-4 h-4 text-gray-400 mr-3" /> */}
                          <span className=" text-gray-900">
                            {result.word_class}
                          </span>
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
          </div>
        </div>
      </main>
      <HeroSliderSection />
      {/* <div className="flex items-center px-25 gap-3 mt-8 w-full h-96">
        <div>
          <img
            src={WordDetail}
            alt="word detail"
            className="max-w-2/3 w-full h-full"
            // style={{
            //   background:
            //     "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 76.16%)",
            // }}
          />
        </div>
        <img src={Quote} alt="quote" className="max-w-1/3 w-full h-full" />
      </div> */}
      <div className="px-25 mt-8">
        <div className="bg-white rounded-4xl relative">
          <div className="py-[59px] pl-[64px]">
            <h2 className="font-semibold text-3xl mb-4">
              Download Wisdom dictionary app
            </h2>
            <div className="flex gap-6">
              <img src={QR} />
              <div>
                <p className="text-gray-500 w-[284px]">
                  Use your phone's camera to scan the QR code to download our
                  free app.
                </p>
                <div className="flex items-center gap-3">
                  <AppStoreBadge />
                  <PlayStoreBadge />
                </div>
                <button className="flex gap-2 text-sm font-semibold text-white hover:cursor-pointer items-center bg-primary-600 py-2.5 px-4 rounded-lg mt-4">
                  <DesktopIcon />
                  Download Desktop app
                </button>
              </div>
            </div>
            <img src={WisdomContainer} className="absolute right-0 bottom-0" />
          </div>
        </div>
      </div>
      <div className="px-25 mt-8">
        <div className="bg-white rounded-4xl relative p-9">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-2xl mb-4">Difference in words</h2>
            <a
              href="/"
              className="flex items-center gap-2 text-primary-700 text-sm font-semibold"
            >
              Explore more <ArrowRightIcon stroke="#026aa2" />
            </a>
          </div>
          <div className="flex justify-between gap-3 w-full">
            {cardData.map((card) => (
              <div key={card.id} className="relative w-full rounded-2xl">
                <img
                  src={OrnamentBg}
                  className="object-cover no-repeat rounded-2xl"
                />
                <div className="rounded-2xl absolute inset-0 bg-gradient-to-b from-transparent to-gray-300/20" />
                <div className="absolute top-6 left-6">
                  <span className="backdrop-blur-sm px-3 py-1 rounded-md text-sm font-semibold text-base-black">
                    {card.type}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-base-black">
                  <h3 className="text-lg font-bold mb-3 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {card.descrption}
                  </p>
                  <button className="flex items-center gap-2 text-primary-400 text-sm text-primary-700 font-semibold  transition-colors">
                    Read more <ArrowRightIcon stroke="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-25 mt-8">
        <div className="bg-white rounded-[36px] relative">
          <div className="py-[108px] pl-[100px] max-w-[488px] w-full">
            <h2 className="font-semibold text-3xl mb-6">
              Learn new words with flipping cards
            </h2>
            <p className="text-gray-600 text-xl mt-6">
              Check your understanding of English words with definitions in your
              own language using flip cards.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <button className="bg-primary-600 py-3 px-5 rounded-xl font-semibold text-white">
                Get Started
              </button>
              <a
                href="/register"
                className="flex items-center gap-1 border-1 border-gray-300 py-3 px-5 rounded-xl font-semibold text-base-black"
              >
                Sign In
                <LoginIcon />
              </a>
            </div>
          </div>
          <img src={FlipCard} className="absolute right-18 bottom-0" />
        </div>
      </div>
      <div className="px-25 mt-8">
        <div className="bg-white rounded-4xl relative p-9">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-semibold text-2xl mb-4">Difference in words</h2>
            <a
              href="/"
              className="flex items-center gap-2 text-primary-700 text-sm font-semibold"
            >
              Explore more <ArrowRightIcon stroke="#026aa2" />
            </a>
          </div>
          <div className="flex gap-3 overflow-hidden w-full">
            {differenceInWords.map((word) => (
              <div
                key={word.id}
                className="relative w-full rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={word.image}
                  alt="Art"
                  className="w-full h-auto object-cover"
                />

                <div className="absolute bottom-0 left-0 right-0 backdrop-blur-2xl bg-white/20 p-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {word.title}
                  </h3>
                  <a
                    href="#"
                    className="flex items-center gap-2 mt-2 text-primary-700 font-medium hover:underline"
                  >
                    Read more <ArrowRightIcon stroke="#026aa2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
