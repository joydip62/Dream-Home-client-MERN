import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

// VITE_PAYMENT_PK =pk_test_51JRYnrSF5YBIw6ri5pTOlYfmWr5HDQQSScPvRwL7jhB2NIXvTdpJPEkyqJiwTj4MgP6zGlQ64z4Qfy4JQWy1r92D0071CxmfZX;


const stripPromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
const Pay = () => {
    const wishlist = useLoaderData();
    return (
      <div>
        <Elements stripe={stripPromise}>
          <CheckoutForm wishlist={wishlist} />
        </Elements>
      </div>
    );
};

export default Pay;