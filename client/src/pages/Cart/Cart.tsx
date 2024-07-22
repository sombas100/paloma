import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { removeFromCart, updateCartItem } from "../../redux/slices/cartSlice";
import { Button } from "flowbite-react";
import "./Cart.css";
import { CartItem } from "../../redux/slices/cartSlice";
import { FaTrash } from "react-icons/fa";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, qty: number) => {
    dispatch(updateCartItem({ product: id, qty }));
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total: any, item: any) => total + item.price * item.qty, 0)
      .toFixed(2);
  };

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h1 className="cart-title">Your cart</h1>
        {cartItems.length === 0 ? (
          <div>Your cart is empty.</div>
        ) : (
          <div className="checkout-card">
            {cartItems.map((item: CartItem) => (
              <div key={item.product} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h2 className="cart-item-name">{item.name}</h2>
                  <p className="cart-item-price">£{item.price}</p>
                  <div className="quantity-selector">
                    <Button
                      color="gray"
                      onClick={() =>
                        handleQuantityChange(item.product, item.qty - 1)
                      }
                      disabled={item.qty <= 1}
                    >
                      -
                    </Button>
                    <input
                      type="text"
                      inputMode="numeric"
                      className="quantity-input"
                      value={item.qty}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.product,
                          parseInt(e.target.value)
                        )
                      }
                      min="1"
                    />
                    <Button
                      color="gray"
                      onClick={() =>
                        handleQuantityChange(item.product, item.qty + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    color="red"
                    onClick={() => handleRemoveFromCart(item.product)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <h2>Total Price: £{calculateTotalPrice()}</h2>
            </div>
          </div>
        )}
        <Button pill color="warning">
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
