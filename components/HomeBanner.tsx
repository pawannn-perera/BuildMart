"use client";
import React, { useState, useEffect } from "react";
import Title from "./Title";

const HomeBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide data
  const slides = [
    {
      image: "/images/banner1.png",
    },
    {
      image: "/images/banner2.png",
    },
    {
      image: "/images/banner3.png",
    },
    {
      image: "/images/banner4.png",
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Hero Slider */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Image Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? "w-4 bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <div className="flex flex-col items-center justify-center gap-5 px-4 max-w-6xl mx-auto">
        <Title className="text-3xl md:text-4xl uppercase font-bold text-center">
          Featured Construction Materials
        </Title>
        <p className="text-sm text-center text-lightColor/80 font-medium max-w-[480px]">
          Explore our wide range of high-quality construction materials to
          complete your projects efficiently and effectively.
        </p>
      </div>
    </div>
  );
};

export default HomeBanner;
