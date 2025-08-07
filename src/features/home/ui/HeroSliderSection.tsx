import React, { useState, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIco } from "@/shared/assets/icons";

interface Slide {
  id: number;
  quote: string;
  author: string;
  image: string;
}

const HeroSliderSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Sample slides data for the quote slider
  const slides: Slide[] = [
    {
      id: 1,
      quote:
        "Live as if you were to die tomorrow. Learn as if you were to live forever.",
      author: "Mahatma Gandhi",
      image:
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=600&fit=crop&crop=face",
    },
    {
      id: 2,
      quote: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
    },
    {
      id: 3,
      quote: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face",
    },
    {
      id: 4,
      quote:
        "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=400&h=600&fit=crop&crop=face",
    },
    {
      id: 5,
      quote:
        "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face",
    },
  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = (): void => {
    setCurrentSlide((prev: number) => (prev + 1) % slides.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide(
      (prev: number) => (prev - 1 + slides.length) % slides.length
    );
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  const handleReadMore = (): void => {
    console.log("Navigate to learn more page");
  };

  return (
    <div className="w-full px-25 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative group">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 h-96 overflow-hidden relative">
            <div className="absolute inset-0 opacity-30">
              <img
                src="https://images.unsplash.com/photo-1551191164-6897149d6ad0?w=800&h=600&fit=crop"
                alt="Highland Cattle"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            </div>

            <div className="absolute bottom-8 left-8">
              <div className="relative z-10 mb-6">
                <h2 className="text-white text-2xl font-semibold mb-2">
                  Do you know this?
                </h2>
                <p className="text-gray-300 text-sm">
                  Learn more about this word in details.
                </p>
              </div>

              <div className="relative z-10">
                <button
                  onClick={handleReadMore}
                  className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:transform hover:scale-105"
                >
                  Read more
                  <ArrowRightIco />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden h-96 relative">
            <div className="relative w-full h-full">
              {slides.map((slide: Slide, index: number) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                    index === currentSlide
                      ? "transform translate-x-0"
                      : index < currentSlide
                      ? "transform -translate-x-full"
                      : "transform translate-x-full"
                  }`}
                >
                  <div className="absolute inset-0">
                    <img
                      src={slide.image}
                      alt={slide.author}
                      className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                  </div>

                  <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center">
                    <blockquote className="text-white text-xl md:text-2xl font-light leading-relaxed mb-6">
                      "{slide.quote}"
                    </blockquote>
                    <cite className="text-gray-300 text-lg not-italic">
                      -{slide.author}
                    </cite>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-6 left-0 right-0 flex justify-between items-center px-8">
              <div className="flex gap-2">
                {slides.map((_: Slide, index: number) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 h-2 bg-white rounded-full"
                        : "w-2 h-2 bg-white/40 hover:bg-white/60 rounded-full"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prevSlide}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <ArrowLeftIcon />
                </button>

                <button
                  onClick={nextSlide}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <ArrowRightIco />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSliderSection;
