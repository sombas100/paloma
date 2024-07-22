import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./Checkout.css";
import { CartItem } from "../../redux/slices/cartSlice";

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const totalPrice = cartItems.reduce(
    (acc: any, item: any) => acc + item.price * item.qty,
    0
  );
  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <div>
          <ul>
            {cartItems.map((item: CartItem) => (
              <li key={item.product}>
                {item.name} = £{item.price} x {item.qty}
              </li>
            ))}
          </ul>
          <h3>Total: £{totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Checkout;
