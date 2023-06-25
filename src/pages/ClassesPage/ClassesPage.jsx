import { useQuery } from "@tanstack/react-query";
import useAxiosProtected from "../../utils/hooks/useAxiosProtected";
import useAuth from "../../utils/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const ClassesPage = () => {
  const { axiosProtected } = useAxiosProtected();
  const { user } = useAuth();
  const [isRole, setIsRole] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const checkRole = async () => {
        const token = localStorage.getItem("adrenalineX");

        await fetch(
          `https://ax-server-ai-abir96.vercel.app/user/${user?.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setIsRole(data.result);
          });
      };
      checkRole();
    }
  }, [user]);

  const { data: classes = [], refetch } = useQuery(
    ["classes"],
    async () => {
      let result = null;
      await fetch(
        "https://ax-server-ai-abir96.vercel.app/all/accepted/classes"
      )
        .then((res) => res.json())
        .then((data) => {
          result = data.classesData;
        });

      return result;
    }
  );

  const handleBookNow = async (classId) => {
    const bookedData = { studentEmail: user?.email, classId };
    try {
      const res = await axiosProtected.post("/booked/class", {
        bookedData,
      });
      refetch();
      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Added Course",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error booking class:", error);
    }
  };

  return (
    <div className=" py-52 md:mx-[300px]">
      <div className=" text-5xl font-bold text-center mb-16">
        Check Out Our <span className=" text-orange">Classes</span>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 justify-items-center gap-10">
        {classes?.map((cl) => (
          <div
            key={cl._id}
            className={`card w-[400px] hover:scale-110 shadow-2xl transition-transform duration-300 ${
              parseInt(cl.seats) === 0
                ? "bg-red-400 text-white"
                : "bg-green-100"
            }`}
          >
            <figure>
              <img
                src={cl.image}
                className="h-[250px] w-full"
                alt=""
              />
            </figure>
            <div className="card-body">
              <h2 className=" text-black font-bold text-xl uppercase">
                {cl.courseName}
              </h2>
              <p className=" text-black text-lg ">
                <span className="font-semibold">Instructor :</span>{" "}
                {cl.instructorName}
              </p>
              <p className=" text-black text-lg ">
                <span className="font-semibold">
                  Available Seats:{" "}
                </span>
                {cl.seats}
              </p>

              <div className="card-actions justify-between  items-center ">
                <div>
                  <p className=" text-black text-lg">
                    <span className=" font-semibold">Price:</span>{" "}
                    {cl.price} $
                  </p>
                </div>
                <div className="self-end">
                  {user ? (
                    <button
                      onClick={() => {
                        handleBookNow(cl._id);
                      }}
                      className={`btn  ${
                        isRole.admin ||
                        isRole.instructor ||
                        cl.seats === 0
                          ? "btn-disabled text-gray-500 "
                          : "btn-primary-custom"
                      }`}
                    >
                      Book now!
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className={`btn  ${
                        cl.seats === 0
                          ? "btn-disabled text-gray-500 "
                          : "btn-primary-custom"
                      }`}
                    >
                      Book now!
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;
