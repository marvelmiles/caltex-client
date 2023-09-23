import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = () => {
  try {
    return loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  } catch (err) {
    throw err;
  }
};
