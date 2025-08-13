import LayoutHeroFooter from "@/shared/ui/LayoutHeroFooter";
import NewsImage from "@/shared/assets/images/news-image.png";
import LearnMoreProCard from "@/shared/ui/LearnMoreProCard";

const relatedNews = [
  {
    title: "I feel it in my bones (Idioms with ‘bone’)",
    description:
      "A little while back, my colleague, Liz Walter, published a post on phrases that contain the word ‘blood’. Today, I’m picking up the ‘parts of the body’ theme with a post on idioms with the word ‘bone’. There are a surprising number of them!",
    id: 1,
  },
  {
    title: "I feel it in my bones (Idioms with ‘bone’)",
    description:
      "A little while back, my colleague, Liz Walter, published a post on phrases that contain the word ‘blood’. Today, I’m picking up the ‘parts of the body’ theme with a post on idioms with the word ‘bone’. There are a surprising number of them!",
    id: 2,
  },
  {
    title: "I feel it in my bones (Idioms with ‘bone’)",
    description:
      "A little while back, my colleague, Liz Walter, published a post on phrases that contain the word ‘blood’. Today, I’m picking up the ‘parts of the body’ theme with a post on idioms with the word ‘bone’. There are a surprising number of them!",
    id: 3,
  },
  {
    title: "I feel it in my bones (Idioms with ‘bone’)",
    description:
      "A little while back, my colleague, Liz Walter, published a post on phrases that contain the word ‘blood’. Today, I’m picking up the ‘parts of the body’ theme with a post on idioms with the word ‘bone’. There are a surprising number of them!",
    id: 4,
  },
];

const NewsDetails = () => {
  return (
    <LayoutHeroFooter
      breadcrumb={[
        { label: "Home", href: "/" },
        {
          label: "News",
          href: "/news",
        },
        {
          label: "Ascending and descending: talking about going up or down",
          isActive: true,
        },
      ]}
    >
      <div className="flex w-full gap-6 mt-9">
        <div className="flex flex-col gap-6 w-2/3 bg-white p-9 rounded-3xl">
          <img src={NewsImage} alt="news image" className="w-full" />
          <h1 className="text-4xl font-semibold">
            Ascending and descending: talking about going up or down
          </h1>
          <p className="text-gray-500 text-lg">
            My colleague Kate Woodford recently wrote a post about the stock
            market, which included several synonyms for going up and going down.
            The context was of prices, values and amounts, but most of these
            words can be used very literally for objects as well – prices rise
            but so do hot-air balloons. This post continues the theme with a few
            more words for going up and down, some of which are used in rather
            specific contexts. They ascended a steep slope and were rewarded
            with a splendid view. The path descends to a narrow lane on the
            right. We watched the rocket go up into the sky. I went down to the
            cellar to get some onions. The related nouns are ascent and descent.
            Common collocations (or words that often go together) are steep,
            rapid and gradual, and again, these words can be used figuratively:
            The aircraft began its ascent. The book describes the family’s
            gradual descent into poverty. The verb scale means to climb a steep
            surface such as the side of a mountain or a wall. It is not used for
            more gradual slopes such as stairs or hills. The verbs mount and
            dismount are used for getting up onto or down from things such as
            horses or bicycles: The thieves managed to scale the wall at the
            rear of the property. He dismounted from his bicycle and walked over
            to the boy. Water or other liquids that fall quickly and in large
            amounts, especially over something such as rocks, can be said to
            cascade, as can other things that look similar. Something,
            especially a bird, that moves quickly and usually downward through
            the air with a smooth movement can be described as swooping: Water
            cascaded over the top of the dam. The owl swooped down from its
            perch. Something that sinks either moves down through water or a
            soft substance or falls to a lower level. A nice way of emphasizing
            that something falls, drops, or sinks quickly and in a straight line
            is to add the phrase like a stone: The boat hit a rock and sank like
            a stone. I hope these words are useful, and that your knowledge of
            English vocabulary continues in an upward direction!
          </p>
        </div>
        <div className="w-1/3">
          <div className="gap-6 bg-white p-9 rounded-3xl mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-xl">Related news</h3>
              <a href="/" className="text-primary-700 text-sm font-semibold">
                Explore
              </a>
            </div>
            {relatedNews.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 gap-4 p-4 rounded-2xl mb-3"
              >
                <h4 className="text-base-black font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-base-black line-clamp-2 mb-4">
                  {item.description}
                </p>
                <a href="/" className="text-primary-600 text-sm font-semibold">
                  Read more
                </a>
              </div>
            ))}
          </div>
          <LearnMoreProCard />
        </div>
      </div>
    </LayoutHeroFooter>
  );
};

export default NewsDetails;
