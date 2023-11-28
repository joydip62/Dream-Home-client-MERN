import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router";

// VITE_Payment_Gateway_PK=pk_test_51JRYnrSF5YBIw6ri5pTOlYfmWr5HDQQSScPvRwL7jhB2NIXvTdpJPEkyqJiwTj4MgP6zGlQ64z4Qfy4JQWy1r92D0071CxmfZX;

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const offered = useLoaderData();
  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm offered={offered}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
