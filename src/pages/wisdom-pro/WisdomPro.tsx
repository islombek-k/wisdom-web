import LayoutHeroFooter from "@/shared/ui/LayoutHeroFooter";
import ProBadge from "@/shared/assets/images/ProBadge.png";
import PricingComparison from "@/features/wisdom-pro/ui/PricingComparison";
const WisdomPro = () => {
  return (
    <LayoutHeroFooter
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Wisdom Pro", href: "/wisdom-pro", isActive: true },
      ]}
    >
      <div className="flex gap-6 bg-white p-9 rounded-3xl mt-9">
        <div className="flex justify-center items-center flex-col gap-3 w-1/2">
          <h1 className="text-6xl font-bold">
            Master Every Word With Wisdom Pro
          </h1>
          <p className="text-gray-500 text-lg">
            From ad-free browsing and profile perks to heart auto-claim, custom
            word groups, and text size control — Wisdom Pro gives you it all.
          </p>
        </div>
        <img src={ProBadge} alt="Pro badge" className="w-1/2" />
      </div>
      <PricingComparison />
    </LayoutHeroFooter>
  );
};

export default WisdomPro;
