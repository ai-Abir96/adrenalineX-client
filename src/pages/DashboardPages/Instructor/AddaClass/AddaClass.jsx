import { useForm } from "react-hook-form";
import useAuth from "../../../../utils/hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosProtected from "../../../../utils/hooks/useAxiosProtected";

const AddaClass = () => {
  const image_host_url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMAGE_HOSTING_KEY
  }`;
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const { axiosProtected } = useAxiosProtected();

  const addClass = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(image_host_url, { method: "POST", body: formData })
      .then((res) => res.json())
      .then(async (result) => {
        if (result.success) {
          const imageURL = result.data.display_url;
          const { courseName, price, seats } = data;
          const newCourse = {
            courseName,
            instructorEmail: user?.email,
            instructorName: user?.displayName,
            price,
            seats,
            image: imageURL,
          };
          const res = axiosProtected.post(
            "/instructor/add/class",
            newCourse
          );
          if (res) {
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Course Added Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      });
  };
  return (
    <div className=" w-full py-20">
      <div className=" text-center uppercase text-5xl font-bold">
        Add a class
      </div>
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
            <div className="card-body w-[1024px] ">
              <form onSubmit={handleSubmit(addClass)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image*</span>
                  </label>
                  <input
                    type="file"
                    placeholder="Image"
                    {...register("image", { required: true })}
                    className="file-input file-input-bordered file-input-primar w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Course Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Course Name"
                    {...register("courseName", {
                      required: true,
                    })}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Instructor&apos;s Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder={user?.displayName}
                    {...register("instructorName")}
                    className="input input-bordered input-disabled"
                    disabled
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Instrcutor&apos;s Email
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder={user?.email}
                    {...register("instructorEmail")}
                    className="input input-bordered input-disabled"
                    disabled
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Available Seats
                    </span>
                  </label>
                  <input
                    type="number"
                    {...register("seats", {
                      required: true,
                    })}
                    placeholder="Enter Available Seats"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Price"
                    {...register("price", {
                      required: true,
                    })}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary-custom"
                  >
                    Add
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

export default AddaClass;
