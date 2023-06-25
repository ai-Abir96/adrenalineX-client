import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../utils/hooks/useAuth";
import useAxiosProtected from "../../../../utils/hooks/useAxiosProtected";

const EnrolledClass = () => {
  const { user } = useAuth();
  const { axiosProtected } = useAxiosProtected();
  const userEmail = user?.email; // Replace with the user's email

  const {
    data: enrolledCourses = [],
    isLoading,
    isError,
  } = useQuery(["enrolledCourses"], async () => {
    const res = await axiosProtected.get(
      `/enrolled/courses/${userEmail}`
    );

    console.log(res.data.enrolledCourses);
    return res.data.enrolledCourses;
  });

  if (isError) {
    return <div>Error fetching enrolled courses</div>;
  }
  return (
    <div>
      <div className="py-10 md:mx-[50px]">
        <div className="text-5xl font-bold text-center mb-16 uppercase">
          My Enrolled Classes
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-xl bg-slate-400 text-center text-black">
                  <th>Serial No</th>
                  <th>Class Name</th>
                  <th>Instructor</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {enrolledCourses?.map((enrolledCourse, index) => (
                  <tr key={enrolledCourse._id}>
                    <td>{index + 1}</td>

                    <td>{enrolledCourse.className}</td>
                    <td>{enrolledCourse.instructorName}</td>
                    <td>{enrolledCourse.price}</td>
                    <td>
                      <span className=" bg-green-200 p-2 rounded-3xl">
                        {enrolledCourse.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledClass;
