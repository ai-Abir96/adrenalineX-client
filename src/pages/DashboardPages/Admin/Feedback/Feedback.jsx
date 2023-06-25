import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useAxiosProtected from "../../../../utils/hooks/useAxiosProtected";
import Swal from "sweetalert2";

const Feedback = () => {
  const { classId } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const { axiosProtected } = useAxiosProtected();
  console.log(classId);
  const handleFeedback = async (data) => {
    console.log(data);
    try {
      const res = await axiosProtected.patch(
        `/classes/feedback/${classId}`,
        {
          feedback: data.feedback,
        }
      );
      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Feedback Sent Successfull",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className=" w-full m-auto lg:px-[150px] px-5">
      <div className=" text-5xl font-bold text-center mt-20">
        Feedback
      </div>
      <div>
        <form onSubmit={handleSubmit(handleFeedback)}>
          <textarea
            className="textarea textarea-primary text-black w-full mt-5 h-[250px]"
            placeholder="Enter your FeedBack"
            {...register("feedback", { required: true })}
          />
          <div className=" text-end">
            <button type="submit" className="btn btn-primary-custom">
              Send Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
