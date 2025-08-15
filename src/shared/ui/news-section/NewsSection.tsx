import { ArrowRightIcon, ChevronRight } from "@/shared/assets/icons";

export interface NewsSectionProps {
  data: {
    title: string;
    image: string;
    id: number;
    path: string;
  }[];
  isExploreMoreVisible?: boolean;
  title?: string;
  description?: string;
  isPagination?: boolean;
}

const NewsSection = ({
  data,
  isExploreMoreVisible,
  title,
  description,
}: NewsSectionProps) => {
  return (
    <div className="mt-8">
      <div className="bg-white rounded-4xl relative p-9">
        <div className="flex items-center justify-between w-full">
          <div className="mb-6">
            <h2 className="font-semibold text-2xl mb-3">{title}</h2>
            {description && (
              <p className="text-lg text-gray-500">{description}</p>
            )}
          </div>
          {isExploreMoreVisible && (
            <a
              href="/"
              className="flex items-center gap-2 text-primary-700 text-sm font-semibold"
            >
              Explore more <ArrowRightIcon stroke="#026aa2" />
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-3 w-full">
          {data.map((word) => (
            <a
              href="/news/1"
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
            </a>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-8">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <div className="rotate-180">
              <ChevronRight />
            </div>
          </button>
          <button className="text-sm text-gray-500 mr-2 hover:opacity-90">
            Previous
          </button>

          <button className="w-8 h-8 bg-primary-600 text-white rounded-lg text-sm font-medium">
            1
          </button>
          <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
            2
          </button>
          <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
            3
          </button>
          <span className="text-gray-400 mx-1">...</span>
          <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
            10
          </button>

          <button className="text-sm text-gray-500 ml-2 hover:opacity-90">
            Next
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
