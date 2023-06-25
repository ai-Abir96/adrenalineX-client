import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const Payment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedClassId = searchParams.get("selectedClassId");
  const classId = searchParams.get("classId");
  const price = searchParams.get("price");
  return (
    <div className=" mt-80 w-1/2">
      <Elements stripe={stripePromise}>
        <CheckoutForm
          selectedClassId={selectedClassId}
          price={price}
          classId={classId}
        />
      </Elements>
    </div>
  );
};

export default Payment;
