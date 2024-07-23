import React, { useState } from "react";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../Config/axiosInstance";

import "./StripeCheckout.css";
import { FaCcStripe } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [foreName, setForeName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const {
        data: { clientSecret },
      } = await axiosInstance.post("/payment/create-payment-intent", {
        amount: 1000,
      });

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement)!,
            billing_details: {
              name: `${foreName} ${lastName}`,
            },
          },
        }
      );

      if (error) {
        setError(error.message || "An error occurred processing the payment");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("Payment successful!", paymentIntent);
      } else {
        console.log("Payment status:", paymentIntent?.status);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred processing the payment");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="form-row">
        <label htmlFor="foreName">First Name</label>
        <input
          id="foreName"
          type="text"
          value={foreName}
          onChange={(e) => setForeName(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="cardNumber">Card Number</label>
        <CardNumberElement id="cardNumber" className="stripe-input" />
      </div>
      <div className="form-row">
        <label htmlFor="expiryDate">Expiry Date</label>
        <CardExpiryElement id="expiryDate" className="stripe-input" />
      </div>
      <div className="form-row">
        <label htmlFor="cvc">CVC</label>
        <CardCvcElement id="cvc" className="stripe-input" />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="submit-button"
      >
        <FaCcStripe style={{ marginRight: "8px" }} className="w-6 h-6" />
        {loading ? "Processing..." : "Pay now"}
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

const StripeCheckout: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeCheckout;
