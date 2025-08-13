import { CrownWhiteIcon, ProfileWhiteIcon } from "@/shared/assets/icons";
import WhiteLogo from "@/shared/assets/images/white_logo_wisdom.png";
import BgOrnament from "@/shared/assets/images/bg_big_ornament.png";
import SearchSection from "@/features/home/ui/SearchSection";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const HeroHeader = () => {
  const { t } = useTranslation();
  
  const navItems = [
    { name: t('navigation.home'), path: "/" },
    { name: t('navigation.translate'), path: "/translate" },
    { name: t('navigation.grammar'), path: "/grammar" },
    { name: t('navigation.wordbank'), path: "/wordbank" },
    { name: t('navigation.news'), path: "/news" },
    { name: t('navigation.aboutUs'), path: "/about-us" },
  ];
  return (
    <>
      <header className="relative z-10 px-6 py-4 bg-primary-900">
        <div className="mx-auto px-25 flex items-center justify-between">
          <nav className="flex items-center space-x-5">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="text-white font-medium hover:text-white/80 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            <a
              href="/wisdom-pro"
              className="flex items-center space-x-2 text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              <CrownWhiteIcon />
              <span className="text-sm font-medium">{t('navigation.wisdomPro')}</span>
            </a>

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
              <SearchSection />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HeroHeader;
