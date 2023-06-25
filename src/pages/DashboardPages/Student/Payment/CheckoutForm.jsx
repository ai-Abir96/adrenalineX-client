import { useEffect, useState } from "react";
import useAuth from "../../../../utils/hooks/useAuth";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useAxiosProtected from "../../../../utils/hooks/useAxiosProtected";
import Swal from "sweetalert2";

const CheckoutForm = ({ price, selectedClassId, classId }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const { axiosProtected } = useAxiosProtected();
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [isPaymentInProgress, setIsPaymentInProgress] =
    useState(false);

  useEffect(() => {
    if (price > 0 && !clientSecret) {
      axiosProtected
        .post("/create-payment-intent", { price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [price, axiosProtected, clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPaymentInProgress) {
      return;
    }

    setIsPaymentInProgress(true);

    if (!stripe || !elements) {
      setIsPaymentInProgress(false);
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      setIsPaymentInProgress(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod(
      {
        type: "card",
        card,
      }
    );

    if (error) {
      setCardError(error.message);
      setIsPaymentInProgress(false);
    } else {
      setCardError("");
      console.log("payment method", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      setIsPaymentInProgress(false);
    }

    console.log(paymentIntent);
    setProcessing(true);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        email: user.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        selectedClassId,
        classId,
      };
      axiosProtected.post("/payment", payment).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setIsPaymentInProgress(false);
      });
    } else {
      setIsPaymentInProgress(false);
    }
  };

  return (
    <div className="w-full m-0 p-0">
      <form onSubmit={handleSubmit} className=" flex flex-col">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "20px",
                color: "#301934",
                "::placeholder": {
                  color: "#228B22",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className=" btn bg-green-600 mt-5 w-1/3 m-auto"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-900">{cardError}</p>}
      {transactionId && (
        <p className="text-green-900">
          Your Transaction ID is: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
