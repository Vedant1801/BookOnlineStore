import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import banner1 from "../assets/banner5.jpg";
import banner2 from "../assets/banner6.jpg";
import banner3 from "../assets/bannner7.jpg";
import banner4 from "../assets/banner8.jpg";
import banner from "../assets/banner9.jpg";

const slides = [
  {
    image: banner1,
    title: "Find Your Next Page-Turner",
    description: "Dive into a world of books across all genres and spark your love for reading today.",
  },
  {
    image: banner2,
    title: "Hot Picks & New Arrivals",
    description: "Stay ahead with the latest bestsellers and newly released books for your collection.",
  },
  {
    image: banner3,
    title: "Books for Every Mood",
    description: "Whether you crave adventure, knowledge, or inspiration, we have a book for you.",
  },
  {
    image: banner4,
    title: "Unbeatable Deals on Books",
    description: "Enjoy special offers, discounts, and exclusive deals on your favorite reads.",
  },
  {
    image: banner,
    title: "Connect with Fellow Readers",
    description: "Join a community of book enthusiasts and share your reading adventures.",
  },
];


export default function Header() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      className="w-full h-auto"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative flex items-center justify-center w-full h-[500px] md:h-[600px] bg-cover bg-center text-center px-6 md:px-16 py-10"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${slide.image})`,
            }}
          >
            {/* Content Centered */}
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight animate-fadeIn">
                {slide.title.split(" ").slice(0, 3).join(" ")}{" "}
                <span className="text-yellow-400">{slide.title.split(" ").slice(3).join(" ")}</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl animate-fadeInSlow">{slide.description}</p>
              <button className="mt-6 cursor-pointer px-8 py-3 bg-yellow-500 text-black text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300 animate-bounce">
              Explore Stories
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

