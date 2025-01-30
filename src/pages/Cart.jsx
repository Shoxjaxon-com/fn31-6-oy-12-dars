import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id, color) => {
    dispatch(removeFromCart({ id, color }));
    toast.info("❌ Item removed from cart!");
  };

  const handleIncreaseQuantity = (id, color) => {
    dispatch(updateQuantity({ id, color, quantity: 1 }));
    toast.success("✅ Item quantity increased!");
  };

  const handleDecreaseQuantity = (id, color) => {
    dispatch(updateQuantity({ id, color, quantity: -1 }));
    toast.success("✅ Item quantity decreased!");
  };

  return (
    <div className="container mx-auto mt-10">
      <ToastContainer position="top-center" autoClose={2000} />

      <h1 className="text-3xl font-bold mb-5">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid gap-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">${item.price}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-gray-500">
                    Color:{" "}
                    <span
                      className="w-5 h-5 inline-block rounded-full border"
                      style={{ backgroundColor: item.color }}
                    ></span>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="btn btn-info"
                  onClick={() => handleIncreaseQuantity(item.id, item.color)}
                >
                  +
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => handleDecreaseQuantity(item.id, item.color)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => handleRemoveFromCart(item.id, item.color)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
