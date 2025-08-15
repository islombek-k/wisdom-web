import WordOne from "@/shared/assets/images/word_one.png";
import WordTwo from "@/shared/assets/images/word_two.png";
import WordThree from "@/shared/assets/images/word_three.png";
import NewsSection from "@/shared/ui/news-section/NewsSection";
import Skull from "@/shared/assets/images/skull.png";
import LayoutHeroFooter from "@/shared/ui/LayoutHeroFooter";
const data = [
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
  {
    image: WordOne,
    title: "For linguists, it was the decade of the pronoun",
    id: 4,
    path: "/news/1",
  },
  {
    image: WordTwo,
    title: "Norwegians using ‘Texas’ to mean ‘crazy’ actually isn’t so crazy",
    id: 5,
    path: "/news/1",
  },
  {
    image: WordThree,
    title:
      "Giving back to English: how Nigerian words made it into the Oxford English Dictionary",
    id: 6,
    path: "/news/1",
  },
  {
    image: WordOne,
    title: "For linguists, it was the decade of the pronoun",
    id: 7,
    path: "/news/1",
  },
  {
    image: WordTwo,
    title: "Norwegians using ‘Texas’ to mean ‘crazy’ actually isn’t so crazy",
    id: 8,
    path: "/news/1",
  },
  {
    image: WordThree,
    title:
      "Giving back to English: how Nigerian words made it into the Oxford English Dictionary",
    id: 9,
    path: "/news/1",
  },
  {
    image: WordOne,
    title: "For linguists, it was the decade of the pronoun",
    id: 10,
    path: "/news/1",
  },
  {
    image: WordTwo,
    title: "Norwegians using ‘Texas’ to mean ‘crazy’ actually isn’t so crazy",
    id: 11,
    path: "/news/1",
  },
  {
    image: WordThree,
    title:
      "Giving back to English: how Nigerian words made it into the Oxford English Dictionary",
    id: 12,
    path: "/news/1",
  },
];

const news = [
  {
    title: "I feel it in my bones (Idioms with ‘bone’)",
    description:
      "A little while back, my colleague, Liz Walter, published a post on phrases that contain the word ‘blood’. Today, I’m picking up the ‘parts of the body’ theme with a post on idioms with the word ‘bone’. There are a surprising number of them!",
    id: 1,
    image: Skull,
  },
  {
    title: "I feel it in my bones (Idioms with ‘bone’)",
    description:
      "A little while back, my colleague, Liz Walter, published a post on phrases that contain the word ‘blood’. Today, I’m picking up the ‘parts of the body’ theme with a post on idioms with the word ‘bone’. There are a surprising number of them!",
    id: 2,
    image: Skull,
  },
  {
    title: "I feel it in my bones (Idioms with ‘bone’)",
    description:
      "A little while back, my colleague, Liz Walter, published a post on phrases that contain the word ‘blood’. Today, I’m picking up the ‘parts of the body’ theme with a post on idioms with the word ‘bone’. There are a surprising number of them!",
    id: 3,
    image: Skull,
  },
];

const News = () => {
  return (
    <LayoutHeroFooter
      breadcrumb={[
        { label: "Home", href: "/" },
        {
          label: "News",
          href: "/news",
          isActive: true,
        },
      ]}
    >
      <div className="mt-9">
        <div className="bg-white rounded-4xl p-9">
          <h1 className="text-4xl font-bold mb-6">Latest news</h1>
          <div className="flex gap-6">
            <div className="relative w-1/2 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={WordOne}
                alt="Art"
                className="w-full h-[449px] object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 backdrop-blur-2xl bg-black/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Ascending and descending: talking about going up or down
                </h3>
                <p className="text-white text-sm line-clamp-2">
                  My colleague Kate Woodford recently wrote a post about the
                  stock market, which included several synonyms for going up and
                  going down. The context was of prices, values and amounts, but
                  most of these words can be used very literally for objects as
                  well – prices rise but so do hot-air balloons. This post
                  continues the theme with a few more words for going up and
                  down, some of which are used in rather specific contexts.
                </p>
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-6">
              {news.map((item) => (
                <div className="flex gap-3" key={item.id}>
                  <img src={item.image} alt="card image" className="w-full" />
                  <div className="flex flex-col">
                    <div className="flex-grow">
                      <p className="text-base-black font-bold mb-2">
                        {item.title}
                      </p>
                      <p className="text-base-black text-sm line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <a
                      href="/"
                      className="text-primary-600 font-medium hover:underline mt-auto"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <NewsSection
        data={data}
        title="A blog from Wisdom dictionary"
        description="Keep update with our news. We will publish 3 times a week"
        isPagination
      />
    </LayoutHeroFooter>
  );
};

export default News;
