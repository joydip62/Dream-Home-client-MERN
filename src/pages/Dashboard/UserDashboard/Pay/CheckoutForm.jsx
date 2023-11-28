import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const CheckoutForm = ({ wishlist }) => {
    console.log(wishlist.offeredAmount);
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
    const elements = useElements();
    
    // const broughtProperty = {
    //   _id: wishlist._id,
    //   propertyTitle: wishlist.propertyTitle,
    //   propertyLocation: wishlist.propertyLocation,
    //   propertyPrice: wishlist.propertyPrice,
    //   offeredAmount: wishlist.offeredAmount,
    //   propertyImage: wishlist.propertyImage,
    //   agentName: wishlist.agentName,
    //   agentEmail: wishlist.agentEmail,
    //   buyerName: wishlist.buyerName,
    //   buyerEmail: wishlist.buyerEmail,
    //   offerDate: wishlist.offerDate,
    //   status: wishlist.status,
    // };
 const totalPrice = wishlist.offeredAmount;
    const axiosSecure = useAxiosSecure();

      useEffect(() => {
        if (totalPrice > 0) {
          axiosSecure
            .post("/create-payment-intent", { price: totalPrice })
            .then((res) => {
              console.log(res.data.clientSecret);
              setClientSecret(res.data.clientSecret);
            });
        }
      }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }
  };
  return (
    <div className="flex-none">
      <form onSubmit={handleSubmit} className="w-full">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",

                "::placeholder": {
                  color: "#aab7c4",
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
          disabled={!stripe || !clientSecret}
          className="btn btn-success mt-5"
        >
          Pay
        </button>
        <p className="text-3xl text-red-600 font-bold">{error}</p>
      </form>
    </div>
  );
};

export default CheckoutForm;