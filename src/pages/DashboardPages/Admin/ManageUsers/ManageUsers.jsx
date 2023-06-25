import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosProtected from "../../../../utils/hooks/useAxiosProtected";

const ManageUsers = () => {
  const { axiosProtected } = useAxiosProtected();
  const { data: users = [], refetch } = useQuery(
    ["users"],
    async () => {
      const res = await axiosProtected.get("/get-users");
      return res.data.userData;
    }
  );

  const handleRole = (id, role) => {
    Swal.fire({
      title: `Are you sure? You want to make this User ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = `/user/role/${id}`;

        await axiosProtected.patch(url, { role }).then((res) => {
          console.log(res);
          if (res.data.updatedUser.modifiedCount > 0) {
            refetch();
            Swal.fire({
              icon: "success",
              title: `User is ${role} now`,
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
        All Registered Users
      </div>
      <div className="overflow-x-auto overflow-y-auto w-full">
        <table className="table">
          <thead>
            <tr className=" text-lg text-center font-bold text-black bg-slate-500">
              <th>Serial No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((ud, index) => (
              <tr key={ud._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    src={ud.photo}
                    className=" w-20 h-20 rounded-full"
                    alt=""
                  />
                </td>
                <td>
                  <div className="font-bold">{ud.name}</div>
                </td>
                <td>
                  <div className="font-bold">{ud.email}</div>
                </td>
                <td>
                  <div className="font-bold">{ud.role}</div>
                </td>
                <td>
                  <div className="font-bold">
                    {ud.role === "admin" ? (
                      <button className="btn  bg-gray-700 btn-disabled ">
                        Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRole(ud._id, "admin")}
                        className="btn border-none bg-green-500 hover:text-black hover:bg-green-600   "
                      >
                        Admin
                      </button>
                    )}
                    {ud.role === "instructor" ? (
                      <button className="btn bg-gray-700 btn-disabled ">
                        Instructor
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleRole(ud._id, "instructor")
                        }
                        className="btn border-none bg-green-500 hover:text-black hover:bg-green-600  "
                      >
                        Instructor
                      </button>
                    )}
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

export default ManageUsers;
