import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./Checkout.css";
import { CartItem } from "../../redux/slices/cartSlice";
import StripeCheckout from "../../Components/StripeCheckout";

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total: any, item: any) => total + item.price * item.qty,
      0
    );
  };
  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <StripeCheckout />
      <div className="cart-summary">
        <h2 className="checkout-summary">Order Summary</h2>
        {cartItems.map((item: CartItem) => (
          <div key={item.product} className="cart-item">
            <p className="checkout-item-name">{item.name}</p>
            <p className="checkout-item-price">
              £{item.price} x {item.qty}
            </p>
          </div>
        ))}
        <h2 className="checkout-total">Total: £{calculateTotalPrice()}</h2>
      </div>
    </div>
  );
};

export default Checkout;
