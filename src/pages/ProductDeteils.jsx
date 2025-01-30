import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { backendApi } from "../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    backendApi
      .get(`/products/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          setProduct(response.data.data.attributes);
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        toast.error("Failed to load product details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.error("❌ Please select a color.");
      return;
    }

    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      color: selectedColor,
      quantity: selectedQuantity,
    };

    dispatch(addToCart(cartItem));

    toast.success(`✅ ${product.title} added to cart!`);
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="container mx-auto mt-10 flex items-center justify-between gap-10">
      {/* ToastContainer (Agar App.js da bo‘lsa, bu yerdan olib tashlang) */}
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="w-1/2 h-1/2 flex justify-between">
        <img
          className="rounded-md h-1/5"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div>
        <h1 className="capitalize text-3xl font-bold">{product.title}</h1>
        <p className="mt-3 text-xl">${product.price}</p>
        <p className="mt-6 leading-8 mb-5">{product.description}</p>

        <div>
          <select 
            className="select select-primary w-full max-w-xs" 
            value={selectedQuantity} 
            onChange={(e) => setSelectedQuantity(Number(e.target.value))}
          >
            {[...Array(20)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Available Colors:</h3>
            <div className="flex gap-2 mt-2">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer ${selectedColor === color ? 'ring-2 ring-blue-500' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5">
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
