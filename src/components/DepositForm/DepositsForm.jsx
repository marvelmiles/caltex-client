import React from "react";
import { useState, useEffect } from "react";
import { useCtx } from "../../context";
import Redirect from "../Redirect";
import { stripePromise } from "../../config/stripe";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";

const DepositsForm = () => {
  const {
    locState: { payment = {} },
    setSnackBar
  } = useCtx();

  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    stripePromise()
      .then(stripe => {
        setStripe(stripe);
      })
      .catch(err =>
        setSnackBar("Something went wrong! Check network and reload browser")
      );
  }, [setSnackBar]);

  if (!payment.amount)
    return (
      <Redirect
        to="/Deposit/DepositPage"
        message="Deposit amount is required!"
      />
    );

  return (
    <Elements stripe={stripe}>
      <StripeForm />
    </Elements>
  );
};

export default DepositsForm;
