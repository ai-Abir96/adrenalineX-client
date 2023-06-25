import { useQuery } from "@tanstack/react-query";
import useAxiosBaseUrl from "../../utils/hooks/useAxiosBaseUrl";

const InstructorPage = () => {
  const { axiosBase } = useAxiosBaseUrl();
  const { data: instructors = [] } = useQuery(
    ["instructors"],
    async () => {
      const res = await axiosBase.get("/all/instructors");
      console.log(res.data.userData);
      return res.data.userData;
    }
  );

  return (
    <div className=" py-48 lg:mx-80">
      <div className=" text-5xl text-center font-bold mb-10">
        Our Valuable <span className="text-orange">Instructors</span>
      </div>
      <div className=" grid lg:grid-cols-3 grid-cols-1 justify-items-center gap-10">
        {instructors?.map((ins) => (
          <div key={ins._id}>
            <div className={`card w-[350px] bg-[#FAF4E8] shadow-2xl`}>
              <figure>
                <img
                  src={ins.photo}
                  alt=""
                  className="w-full h-[250px]"
                />
              </figure>
              <div className="card-body">
                <h2 className=" uppercase text-xl font-bold text-black">
                  {ins.name}
                </h2>
                <p className="text-black">Email: {ins.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorPage;
