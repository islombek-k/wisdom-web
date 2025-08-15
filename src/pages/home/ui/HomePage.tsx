import {
  AppStoreBadge,
  ArrowRightIcon,
  LoginIcon,
  PlayStoreBadge,
} from "@/shared/assets/icons";

import QR from "@/shared/assets/images/QR.png";
import WisdomContainer from "@/shared/assets/images/bg_wisdom_container.png";
import FlipCard from "@/shared/assets/images/flip_card.png";
import { Footer } from "@/shared/ui/Footer";
import OrnamentBg from "@/shared/assets/images/BG_ornament.png";
import WordOne from "@/shared/assets/images/word_one.png";
import WordTwo from "@/shared/assets/images/word_two.png";
import WordThree from "@/shared/assets/images/word_three.png";
import HeroSliderSection from "@/features/home/ui/HeroSliderSection";
import PWAInstallButton from "@/shared/ui/pwa-install-button/PwaInstallButton";
import HeroHeader from "@/shared/ui/HeroHeader";
import NewsSection from "@/shared/ui/news-section/NewsSection";

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
    path: "/news/1",
  },
  {
    image: WordTwo,
    title: "Norwegians using ‘Texas’ to mean ‘crazy’ actually isn’t so crazy",
    id: 2,
    path: "/news/1",
  },
  {
    image: WordThree,
    title:
      "Giving back to English: how Nigerian words made it into the Oxford English Dictionary",
    id: 3,
    path: "/news/1",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br relative overflow-hidden">
      <HeroHeader />
      <HeroSliderSection />
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
                <PWAInstallButton />
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
      <NewsSection data={differenceInWords} title="Difference in words" />
      <Footer />
    </div>
  );
};

export default HomePage;
