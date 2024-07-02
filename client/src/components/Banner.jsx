import { useState, useEffect, useCallback } from "react";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [
    "https://amazonproone.vercel.app/static/media/img2.bc1bdb910ead16c65197.jpg",
    "https://amazonproone.vercel.app/static/media/img5.aa945e25375bfdee385f.jpg",
    "https://amazonproone.vercel.app/static/media/img3.c80809bb40bee5c34372.jpg",
    "https://amazonproone.vercel.app/static/media/img1.efb3d39101f7ef77d616.jpg",
  ];

  const prevSlide = useCallback(() => {
    setCurrentSlide(currentSlide === 0 ? data.length - 1 : currentSlide - 1);
  }, [currentSlide, data.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide(currentSlide === data.length - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, data.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [nextSlide]);

  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="h-[650px] w-screen relative">
        <div
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
          className="w-[400vw] h-full flex transition-transform duration-1000"
        >
          {data.map((src, index) => (
            <img
              key={index}
              className="w-screen h-full object-cover"
              src={src}
              alt={`Image${index + 1}`}
              loading={index === 0 ? "priority" : "lazy"}
            />
          ))}
        </div>
        <div className="absolute w-fit left-0 right-0 mx-auto flex gap-8 bottom-52">
          <div
            onClick={prevSlide}
            className="w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
          >
            <HiArrowLeft />
          </div>
          <div
            onClick={nextSlide}
            className="w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
          >
            <HiArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
