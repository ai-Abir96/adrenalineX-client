import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { FcCancel } from "react-icons/fc";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import useAxiosProtected from "../../../../utils/hooks/useAxiosProtected";

const ManageClass = () => {
  const { axiosProtected } = useAxiosProtected();
  const { data: classes = [], refetch } = useQuery(
    ["classes"],
    async () => {
      const res = await axiosProtected.get("/all-classes");
      console.log(res.data.classesData);
      return res.data.classesData;
    }
  );

  const handleStatus = (id, status) => {
    console.log(status);
    Swal.fire({
      title: `Are you sure? You want to make Class status ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = `/class/status/${id}`;
        await axiosProtected.patch(url, { status }).then((res) => {
          console.log(res);
          if (res.data.updatedStatus.modifiedCount > 0) {
            refetch();
            Swal.fire({
              icon: "success",
              title: `Class Status is ${status}`,
              timer: 1000,
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className=" text-center text-black font-bold text-5xl mt-20 mb-10">
        All Added Classes
      </div>
      <div className="overflow-x-auto overflow-y-auto w-full">
        <table className="table">
          <thead>
            <tr className=" text-lg text-black font-bold text-center bg-slate-500">
              <th>Serial No</th>
              <th>Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Availble Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes?.map((cd, index) => (
              <tr key={cd._id}>
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
                  <div className="font-bold">{cd.price}</div>
                </td>
                <td>
                  <div className="font-bold">{cd.seats}</div>
                </td>
                <td>
                  <div className="font-bold">{cd.status}</div>
                </td>

                <td>
                  <div className="font-bold flex items-center">
                    {cd.status === "accepted" ||
                    cd.status === "rejected" ? (
                      <div className="mr-4">
                        <button className="btn bg-gray-200 btn-square btn-disabled text-2xl">
                          <TiTick />
                        </button>
                        <button className="btn bg-gray-200 btn-square btn-disabled ">
                          <div className="text-2xl">
                            <FcCancel />
                          </div>
                        </button>
                      </div>
                    ) : (
                      <div className="mr-4">
                        <button
                          onClick={() =>
                            handleStatus(cd._id, "accepted")
                          }
                          className="btn bg-green-500 hover:bg-green-700 btn-square text-2xl "
                        >
                          <TiTick />
                        </button>
                        <button
                          onClick={() =>
                            handleStatus(cd._id, "rejected")
                          }
                          className="btn bg-red-500 btn-square"
                        >
                          <div className="text-2xl">
                            <FcCancel />
                          </div>
                        </button>
                      </div>
                    )}

                    <Link to={`/dashboard/super/feedback/${cd._id}`}>
                      <button className="btn btn-primary-custom">
                        Feedback
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClass;
