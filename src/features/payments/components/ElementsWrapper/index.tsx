import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";

interface ElementsWrapperProps {
  children: React.ReactNode[] | React.ReactNode;
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY ?? "");

const ElementsWrapper: FunctionComponent<ElementsWrapperProps> = ({
  children,
}) => {
  const [clientSecret, setClientSecret] = useState<string>();
  useEffect(() => {
    const callBack = async () => {
      const stripeSecretKey = process.env.REACT_APP_STRIPE_SECRET_KEY;
      const apiUrl = "https://api.stripe.com/v1/payment_intents";

      axios
        .post(
          apiUrl,
          "amount=1099&currency=usd&payment_method_types%5B0%5D=card",
          {
            headers: {
              authorization: "Bearer " + stripeSecretKey,
            },
          }
        )
        .then((response) => {
          console.log("Success:", response.data);
          setClientSecret(response.data.client_secret ?? "");
        })
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        });
    };

    callBack();
  }, []);

  return (
    <>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: clientSecret }}
        >
          {children}
        </Elements>
      )}
    </>
  );
};

export default ElementsWrapper;
