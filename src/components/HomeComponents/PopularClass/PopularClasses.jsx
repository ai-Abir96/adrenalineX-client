import { useQuery } from "@tanstack/react-query";
import useAxiosBaseUrl from "../../../utils/hooks/useAxiosBaseUrl";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { Fade } from "react-awesome-reveal";

const PopularClasses = () => {
  const { axiosBase } = useAxiosBaseUrl();
  const { data: classes = [] } = useQuery(["classes"], async () => {
    const res = await axiosBase.get("/popular/classes");
    return res.data.classesData;
  });

  return (
    <div>
      <div>
        <div className=" mt-[200px] ">
          <Fade delay={500}>
            <div className=" text-center text-5xl uppercase">
              Our Popular
              <span className="text-orange">Classes</span>
            </div>
          </Fade>
          <Swiper
            modules={[Autoplay, Pagination]}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              1500: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
            }}
            className="mt-20 mb-10"
          >
            {classes?.map((cl) => (
              <SwiperSlide key={cl._id} className=" mb-16 ">
                <div className="card w-[350px] bg-green-50 shadow-2xl">
                  <figure>
                    <img
                      src={cl.image}
                      alt=""
                      className="w-full h-[250px]"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className=" text-xl uppercase font-bold text-orange">
                      {cl.courseName}
                    </h2>

                    <div className=" flex">
                      <img src="" alt="" />
                      <div>
                        <h2 className=" text-black uppercase font-bold text-lg">
                          {cl.instructorName}
                        </h2>
                        <p>
                          <span className="text-black font-bold">
                            Price:{" "}
                          </span>
                          <span className=" text-gray-500">
                            {cl.price}$
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PopularClasses;
