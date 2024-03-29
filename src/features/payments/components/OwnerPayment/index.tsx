import { FunctionComponent, useEffect, useState } from "react";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Button } from "@chakra-ui/react";

interface OwnerPaymentProps {}

const OwnerPayment: FunctionComponent<OwnerPaymentProps> = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://walkie-doggie-135ce.web.app/owner-home",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <Button
          type={"submit"}
          mt={"2rem"}
          w={"100%"}
          bg={"black"}
          color={"white"}
          fontSize={"1.1rem"}
          fontWeight={"400"}
        >
          Pay 200 UAH
        </Button>
      </form>
    </>
  );
};

export default OwnerPayment;
