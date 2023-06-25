import { useQuery } from "@tanstack/react-query";
import useAxiosProtected from "../../../../utils/hooks/useAxiosProtected";
import useAuth from "../../../../utils/hooks/useAuth";

const PaymentHistory = () => {
  const { user } = useAuth();
  const { axiosProtected } = useAxiosProtected();
  const userEmail = user?.email;

  const { data: paymentHistory = [], isLoading } = useQuery(
    ["paymentHistory"],
    async () => {
      const res = await axiosProtected.get(
        `/enrolled/courses/${userEmail}`
      );
      const sortedPaymentHistory = res.data.enrolledCourses.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      return sortedPaymentHistory;
    }
  );
  return (
    <div>
      <div>
        <div className="py-10 md:mx-[50px]">
          <div className="text-5xl font-bold text-center mb-16 uppercase">
            Payment History
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-xl bg-slate-400 text-center text-black">
                    <th>Date</th>
                    <th>Payment Email</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Transaction ID</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory?.map((ph) => (
                    <tr key={ph._id}>
                      <td>{ph.date}</td>
                      <td>{ph.email}</td>
                      <td>{ph.price}</td>
                      <td>
                        <span className=" bg-green-200 p-2 rounded-3xl">
                          {ph.status}
                        </span>
                      </td>
                      <td>{ph.transactionId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
