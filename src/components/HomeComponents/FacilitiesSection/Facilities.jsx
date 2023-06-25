import { Fade, Slide, Zoom } from "react-awesome-reveal";

const Facilities = () => {
  return (
    <div className="my-[200px]">
      <Fade delay={500} direction="top">
        <div className=" text-center text-5xl uppercase mb-16">
          Our <span className=" text-orange">Facilities</span>
        </div>
      </Fade>
      <div className="flex flex-col">
        <div>
          <Slide delay={100} duration={1500} direction="right">
            <div className="card shadow-2xl border-l-4 border-orange-600 lg:w-3/5 mx-4 my-4">
              <div className="card-body">
                <Zoom delay={500} cascade>
                  <h2 className="card-title text-2xl font-bold">
                    Sports Fields
                  </h2>

                  <p className=" ">
                    Our summer school camp, AdrenalineX, offers
                    well-maintained sports fields that provide the
                    perfect space for various outdoor sports
                    activities. Whether it&apos;s soccer, baseball,
                    cricket, or any other sport, our fields are
                    designed to accommodate different sports and
                    ensure a safe and enjoyable experience for all
                    participants.
                  </p>
                </Zoom>
              </div>
            </div>
          </Slide>
        </div>
        <div className="self-end my-20 lg:w-3/5">
          <Slide delay={100} duration={1500}>
            <div className="card shadow-2xl border-r-4 border-orange-600  px-4 my-4 self-end text-justify">
              <div className="card-body">
                <Zoom cascade delay={500}>
                  <h2 className="text-2xl font-bold ">
                    Indoor Facilities
                  </h2>
                  <p>
                    Our indoor facilities are equipped with
                    state-of-the-art sports halls that cater to a
                    range of indoor sports. With ample space for
                    basketball, volleyball, badminton, and more,
                    participants can engage in their favorite sports
                    regardless of weather conditions. Our
                    well-maintained indoor facilities provide a
                    comfortable and safe environment for sports
                    enthusiasts to practice and compete.
                  </p>
                </Zoom>
              </div>
            </div>
          </Slide>
        </div>
        <div>
          <Slide delay={100} duration={1500} direction="right">
            <div className="card shadow-2xl border-l-4 border-orange-600 lg:w-3/5  mx-4 my-4">
              <div className="card-body">
                <Zoom delay={500} cascade>
                  <h2 className="card-title text-2xl font-bold">
                    Swimming Pool
                  </h2>
                  <p>
                    Dive into the refreshing experience of our
                    swimming pool! AdrenalineX offers a spacious
                    swimming pool where participants can enjoy
                    swimming lessons, water sports activities, and
                    leisurely splashing about. Under the supervision
                    of our trained lifeguards, participants can
                    enhance their swimming skills, stay active, and
                    beat the summer heat in our safe and
                    well-maintained swimming pool.
                  </p>
                </Zoom>
              </div>
            </div>
          </Slide>
        </div>
        <div className="self-end my-20 lg:w-3/5">
          <Slide delay={100} duration={1500}>
            <div className="card shadow-2xl border-r-4 border-orange-600  mx-4 my-4 text-justify">
              <div className="card-body">
                <Zoom cascade delay={500}>
                  <h2 className="card-title text-2xl font-bold">
                    Fitness Center
                  </h2>
                  <p>
                    Our summer school camp also offers a fully
                    equipped fitness center for participants who want
                    to focus on their physical fitness and strength
                    training. Our fitness center features a range of
                    exercise equipment, including treadmills, weight
                    machines, and free weights. With the guidance of
                    our experienced trainers, participants can engage
                    in personalized fitness programs and achieve their
                    fitness goals in a safe and supportive
                    environment.
                  </p>
                </Zoom>
              </div>
            </div>
          </Slide>
        </div>
        <div>
          <Slide delay={100} duration={1500} direction="right">
            <div className="card shadow-2xl border-l-4 border-orange-600 lg:w-3/5  mx-4 my-4">
              <div className="card-body">
                <Zoom cascade delay={500}>
                  <h2 className="card-title text-2xl font-bold">
                    Sports Equipment
                  </h2>
                  <p>
                    At AdrenalineX, we provide a wide range of sports
                    equipment and gear to ensure participants have
                    access to the necessary tools for their favorite
                    sports. From soccer balls and baseball bats to
                    basketballs and tennis rackets, our collection of
                    sports equipment caters to various sports
                    disciplines. Participants can enjoy their sports
                    activities with top-quality gear that enhances
                    their performance and promotes a fun and engaging
                    experience.
                  </p>
                </Zoom>
              </div>
            </div>
          </Slide>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Facilities;
