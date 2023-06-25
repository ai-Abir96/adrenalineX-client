import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosProtected from "../../../../utils/hooks/useAxiosProtected";
import { useState } from "react";
import useAuth from "../../../../utils/hooks/useAuth";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
const SeclectedClass = () => {
  const { user } = useAuth();
  const { axiosProtected } = useAxiosProtected();
  const [deleteBookedId, setDeleteBookedId] = useState(null);

  const {
    data: selectedClasses = [],
    isLoading,
    refetch,
  } = useQuery(["selectedClasses"], async () => {
    const res = await axiosProtected.get(
      `/student/selected/classes/${user?.email}`
    );
    console.log(res);
    return res.data.selectedClasses;
  });

  const deleteMutation = useMutation(
    async () => {
      await axiosProtected.delete(`/booked/class/${deleteBookedId}`);
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const handleDelete = (bookedID) => {
    setDeleteBookedId(bookedID);
    deleteMutation.mutate();
  };

  return (
    <div className="lg:mx-[50px]">
      <div className="text-5xl font-bold text-center mt-16 mb-16 uppercase">
        My Selected Classes
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table overflow-x-auto">
            <thead>
              <tr className="text-xl bg-slate-400 text-center text-black">
                <th>Serial No</th>
                <th>Class Name</th>
                <th>Instructor</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedClasses?.map((selectedClass, index) => (
                <tr key={selectedClass._id}>
                  <td>{index + 1}</td>
                  <td>{selectedClass.className}</td>
                  <td>{selectedClass.instructorName}</td>
                  <td>{selectedClass.price}</td>

                  <td className=" flex">
                    <button
                      className="btn text-black bg-red-600 hover:bg-red-900 border-0 mr-5"
                      onClick={() => handleDelete(selectedClass._id)}
                    >
                      <FaTrash />
                    </button>
                    <Link
                      to={{
                        pathname: "/dashboard/student/payment",
                        search: `?selectedClassId=${selectedClass._id}&classId=${selectedClass.classId}&instructor=${selectedClass.instructorName}&price=${selectedClass.price}`,
                      }}
                    >
                      <button className=" btn bg-green-500 text-black border-0">
                        Pay
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SeclectedClass;
