import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../utils/hooks/useAuth";
import useAxiosProtected from "../../../../utils/hooks/useAxiosProtected";
import { Link } from "react-router-dom";

const MyClasses = () => {
  const { user } = useAuth();
  const { axiosProtected } = useAxiosProtected();
  const { data: myClasses = [] } = useQuery(
    ["myClasses", user?.email],
    async () => {
      const res = await axiosProtected.get(
        `/instructor/classes/${user?.email}`
      );
      return res.data.classesData;
    }
  );
  const getStatusColor = (status) => {
    switch (status) {
      case "rejected":
        return "text-red-500";
      case "pending":
        return "text-yellow-500";
      case "accepted":
        return "text-green-500";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className=" text-center text-5xl font-bold mt-16 mb-10">
        My Classes
      </div>
      <div className="overflow-x-auto overflow-y-auto w-full">
        <table className="table">
          <thead>
            <tr className=" font-bold text-lg text-black bg-slate-500">
              <th>Serial No</th>
              <th>Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Availble Seats</th>
              <th>Enrolled Students</th>
              <th>Price</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myClasses?.map((cd, index) => (
              <tr key={cd._id} className=" text-center">
                <th>{index + 1}</th>
                <td>
                  <img src={cd.image} className=" w-20 h-20" alt="" />
                </td>

                <td>
                  <div className="font-bold">{cd.courseName}</div>
                </td>
                <td>
                  <div className="font-bold">{cd.instructorName}</div>
                </td>
                <td>
                  <div className="font-bold">
                    {cd.instructorEmail}
                  </div>
                </td>

                <td>
                  <div className="font-bold">{cd.seats}</div>
                </td>

                <td>
                  <div className="font-bold">
                    {parseInt(cd.enrolledStudent) === 0
                      ? 0
                      : cd.enrolledStudent}
                  </div>
                </td>
                <td>
                  <div className="font-bold">{cd.price}</div>
                </td>
                <td>
                  <div
                    className={`font-bold ${getStatusColor(
                      cd.status
                    )}`}
                  >
                    {cd.status}
                  </div>
                </td>
                <td>
                  <div
                    className={`font-bold ${getStatusColor(
                      cd.status
                    )}`}
                  >
                    {cd.status === "rejected" ? cd.feedback : ""}
                  </div>
                </td>
                <td>
                  <Link
                    to={`/dashboard/instructor/update/class/${cd._id}`}
                  >
                    <button className=" btn hover:bg-blue-400 bg-blue-200 border-none">
                      Update
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
