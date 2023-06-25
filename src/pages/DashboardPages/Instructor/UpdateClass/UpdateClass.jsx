import { useForm } from "react-hook-form";
import useAxiosProtected from "../../../../utils/hooks/useAxiosProtected";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateClass = () => {
  const { classId } = useParams();

  const { register, handleSubmit, reset } = useForm();
  const { axiosProtected } = useAxiosProtected();
  const handleUpdateClass = async (data) => {
    try {
      const res = await axiosProtected.put(
        `/instructor/class/update/${classId}`,
        data
      );

      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Class Information Update Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };
  return (
    <div className=" w-full  py-20">
      <div className=" text-center uppercase text-5xl font-bold">
        Update class
      </div>
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
            <div className="card-body w-[1024px] ">
              <form onSubmit={handleSubmit(handleUpdateClass)}>
                <div className="form-control">
                  <label className="label">
                    <span className="text-lg font-semibold">
                      Course Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Course Name"
                    {...register("courseName", {})}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="text-lg font-semibold">
                      Available Seats
                    </span>
                  </label>
                  <input
                    type="number"
                    {...register("seats", {})}
                    placeholder="Enter Available Seats"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-lg font-semibold">
                      Price
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Price"
                    {...register("price", {})}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary-custom"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateClass;
