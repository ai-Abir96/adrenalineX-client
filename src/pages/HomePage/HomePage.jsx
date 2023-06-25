import Banner from "../../components/HomeComponents/Banner/Banner";
import Facilities from "../../components/HomeComponents/FacilitiesSection/Facilities";
import PopularClasses from "../../components/HomeComponents/PopularClass/PopularClasses";
import PopularInstrutors from "../../components/HomeComponents/PopularInstructor/PopularInstrutors";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <div className="2xl:mx-[300px] xl:mx-[100px] lg:mx-[50px] md:mx-[30px]">
        <PopularInstrutors />
        <PopularClasses />
        <Facilities />
      </div>
    </div>
  );
};

export default HomePage;
