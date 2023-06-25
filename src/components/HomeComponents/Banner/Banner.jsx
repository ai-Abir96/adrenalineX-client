import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./banner.css";
import "swiper/css/autoplay";

const Banner = () => {
  const banner = [
    "/images/banner/banner1.jpg",
    "/images/banner/banner2.jpg",
    "/images/banner/banner5.jpg",
    "/images/banner/banner6.jpg",
    "/images/banner/banner7.jpg",
  ];
  const texts = [
    "Ignite Your Passion for Sports this Summer!",
    "Unleash Your Potential in the Summer Sports Academy!",
    "Experience Thrilling Sports Adventures at AdrenalineX!",
    "Join Us for a Summer of Sports Excellence!",
    "Elevate Your Skills in the Ultimate Summer Sports Program!",
  ];

  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        loop={true}
      >
        {banner.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="lg:h-[900px] h-[500px] relative"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute  top-0 left-0 w-full h-full flex items-center justify-center">
                <div className=" text-center lg:px-10 text-4xl px-2  lg:text-8xl text-grad font-bold">
                  {texts[index]}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
