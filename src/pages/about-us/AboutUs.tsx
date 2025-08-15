import LayoutHeroFooter from "@/shared/ui/LayoutHeroFooter";
import WisdomBanner from "@/shared/assets/images/wisdom-banner.png";
import LearnMoreProCard from "@/shared/ui/LearnMoreProCard";
import NewsImage from "@/shared/assets/images/news-image.png";

const AboutUs = () => {
  return (
    <LayoutHeroFooter
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "About us", href: "/about-us", isActive: true },
      ]}
    >
      <div className="mt-9 flex gap-6">
        <div className="flex flex-col gap-6 bg-white p-9 rounded-4xl w-2/3">
          <img
            src={WisdomBanner}
            alt="Banner"
            className="w-full"
            height={399}
          />
          <h1 className="text-4xl font-semibold">We are Wisdom dictionary</h1>
          <p className="text-gray-500 text-lg">
            An About Us page exists to share a business’ story and history and
            provide a deeper connection with customers. Consumers want to know
            the team behind the brand they are supporting. An About Us page
            provides the perfect real estate to pull back the curtain and reveal
            who is working behind the scenes. Most importantly, though, an About
            Us page facilitates trust between the consumer and the business.
            More than 33% of consumers say that “trust” is a core factor when
            deciding which businesses to support. With an About Us page, you can
            begin to form an emotional relationship with customers and engage
            with them on a deeper level. So how can you create one that
            resonates? Let’s look at some of the components you need to include
            in your About Us page. The best About Us pages share the company and
            founders’ stories. It’s a chance to pull back the curtain on the
            business and showcase the people who make it happen. Some of the
            most effective About Us pages: Connect the consumer to the business
            on a deeper level Provide contextual insight into why the founders
            created the business Share the business’s core values, mission,
            beliefs, and vision Answer any questions that consumers may have
            about the business There are four main components to an About Us
            page: 1. Share the story of why the company was founded This is your
            chance to focus on your company’s “why.” It could be what sets you
            apart from other competitors on the market. Share the moment you
            gained the inspiration for your business and what motivated you to
            start it. 2. Highlight your background and your founding team’s role
            Who are you? Why are you the right person to lead your company at
            this time? Share your background and personal story. That’ll connect
            you to your customers. 3. Document the evolution of the company
            State everything from the obstacles to the product enhancements.
            Bring your new customers up to speed. Where is the company today?
            How is it different from where it was before? 4. Document the
            mission and vision What is your company trying to solve? Where is it
            going? End the About Us page by detailing the steps you’re taking to
            transform the business into your ultimate vision. With these four
            components, you’ll create a stellar About Us page that will wow
            prospects and convert new customers. Combining these elements with
            the right website builder and proper page design will help
            you transform a visitor into a customer. It’s important to remember
            what your customers want, too. Users in your target audience want to
            see your mission statement, social proof, and an example of using
            your product. These elements on your About Us web page will build
            trust with the target audience. Now, let’s look at some companies
            that championed those components and brought them to life.
          </p>
        </div>
        <div className="w-1/3">
          <div className="gap-6 bg-white p-9 rounded-3xl mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-xl">Wisdom gallery</h3>
              <a href="/" className="text-primary-700 text-sm font-semibold">
                Explore
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <img src={NewsImage} alt="new" className="rounded-3xl" />
              <img src={NewsImage} alt="new" className="rounded-3xl" />
              <img src={NewsImage} alt="new" className="rounded-3xl" />
              <img src={NewsImage} alt="new" className="rounded-3xl" />
            </div>
          </div>
          <LearnMoreProCard />
        </div>
      </div>
    </LayoutHeroFooter>
  );
};

export default AboutUs;
