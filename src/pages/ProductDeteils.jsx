import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendApi } from "../axios";
import { Toaster, toast } from "sonner";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    backendApi
      .get(`/products/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          setProduct(response.data.data.attributes);
          toast.success("Product details loaded successfully!");
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        toast.error("Failed to load product details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="container mx-auto mt-10 flex items-center justify-between gap-10">
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
          <select className="select select-primary w-full max-w-xs">
            {[...Array(20)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <Toaster position="top-center" />
          <button
            className="btn btn-primary"
            onClick={() => toast.success("Item added to cart!")}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
