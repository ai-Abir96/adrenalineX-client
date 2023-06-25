import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import useAxiosBaseUrl from "../../../utils/hooks/useAxiosBaseUrl";
import { useQuery } from "@tanstack/react-query";
import { Fade, Slide } from "react-awesome-reveal";

const PopularInstrutors = () => {
  const { axiosBase } = useAxiosBaseUrl();
  const { data: instructors = [] } = useQuery(
    ["instructors"],
    async () => {
      const res = await axiosBase.get("/popular/instructors");
      return res.data.userData;
    }
  );

  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const handleMouseEnter = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const handleMouseLeave = () => {
    setSelectedInstructor(null);
  };

  return (
    <div>
      <Fade duration={1500}>
        <div className=" text-center mt-[200px] mb-16 text-5xl uppercase">
          Our Popular{" "}
          <span className=" text-orange">Instructors</span>
        </div>
      </Fade>
      <div className=" grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center gap-10">
        {instructors?.map((ins) => (
          <div key={ins._id}>
            <Slide cascade delay={100} duration={2000}>
              <motion.div
                className={`card md:w-[320px] lg:w-96 bg-green-50 shadow-xl`}
                onMouseEnter={() => handleMouseEnter(ins)}
                onMouseLeave={handleMouseLeave}
              >
                <figure>
                  <img
                    src={ins.photo}
                    alt=""
                    className="w-full h-[250px]"
                  />
                </figure>
                <div className="card-body">
                  <h2 className=" text-2xl text-orange uppercase">
                    {ins.name}
                  </h2>
                  <p className=" text-lg text-black font-semibold">
                    Email: {ins.email}
                  </p>
                </div>
                <AnimatePresence>
                  {selectedInstructor?._id === ins._id && (
                    <motion.div
                      className="card-body bg-white rounded-lg opacity-60 shadow-2xl flex items-center justify-center absolute inset-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="card-title text-black text-center uppercase">
                        {ins.name}
                      </h2>
                      <motion.div
                        className="card-actions text-black flex justify-center items-center text-3xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        <a href="#" className="social-link">
                          <FaFacebook />
                        </a>
                        <a href="#" className="social-link">
                          <FaTwitter />
                        </a>
                        <a href="#" className="social-link">
                          <FaLinkedin />
                        </a>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Slide>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstrutors;
