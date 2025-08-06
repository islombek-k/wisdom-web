import {
  LogoIcon,
  CrownIcon,
  AppStorBlackIcon,
  PlayStoreBlackIcon,
} from "@/shared/assets/icons";

export const Footer = () => {
  const navItems = [
    { name: "Dictionary", href: "#" },
    { name: "Translate", href: "#" },
    { name: "Grammar", href: "#" },
    { name: "Thesaurus", href: "#" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-[1240px] mx-auto px-4 py-8">
        <LogoIcon />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          {/* Logo and Navigation */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <nav className="flex flex-wrap items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center justify-center gap-2 text-primary-600 font-medium">
                <CrownIcon />
                <span className="text-transparent font-extrabold bg-clip-text bg-[linear-gradient(92.04deg,#026AA2_-3.79%,#512CCB_49.4%,#AF1AB7_103.79%)]">
                  Wisdom Pro
                </span>
              </div>
            </nav>
          </div>

          {/* App Download Section */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-black-base font-medium self-start">
              Get the app
            </p>
            <div className="flex items-center gap-3">
              <a href="/">
                <AppStorBlackIcon />
              </a>
              <a href="/">
                <PlayStoreBlackIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            © 2023 Wisdom Dictionary. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
