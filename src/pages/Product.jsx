import React, { useEffect, useState } from "react";
import { backendApi } from "../axios";
import Card from "../componets/Card";

function Pagination() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [company, setCompany] = useState("all");
  const [sort, setSort] = useState("a-z");
  const [price, setPrice] = useState(1000);
  const [freeShipping, setFreeShipping] = useState(false);

  const fetchProducts = () => {
    setLoading(true);

    const filters = [];
    if (search) filters.push(`search=${search}`);
    if (category !== "all") filters.push(`category=${category}`);
    if (company !== "all") filters.push(`company=${company}`);
    if (freeShipping) filters.push(`free_shipping=true`);
    filters.push(`price_lte=${price}`);
    filters.push(`sort=${sort}`);

    const query = filters.length > 0 ? `&${filters.join("&")}` : "";

    backendApi
      .get(`/products?page=${currentPage}${query}`)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          setProducts(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const previousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const applyFilters = () => {
    setCurrentPage(1); 
    fetchProducts();
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setCompany("all");
    setSort("a-z");
    setPrice(1000);
    setFreeShipping(false);
    setCurrentPage(1);
    fetchProducts();
  };

  return (
    <div className="container mx-auto p-5">
      <div className="grid grid-cols-4 gap-4 mt-5 mb-5 bg-blue-300 p-5 rounded-md">
        <div className="flex flex-col gap-3">
          <label htmlFor="search" className="text-white">
            Search Product
          </label>
          <input
            id="search"
            type="text"
            placeholder="Type here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="flex flex-col gap-3 items-center mt-9">
          <select
            className="select w-full max-w-xs"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Tables">Tables</option>
            <option value="Chairs">Chairs</option>
            <option value="Kids">Kids</option>
            <option value="Sofas">Sofas</option>
            <option value="Beds">Beds</option>
          </select>
        </div>

        <div>
          <select
            className="select w-full max-w-xs mt-9"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value="all">All Companies</option>
            <option value="Modeza">Modeza</option>
            <option value="Luxora">Luxora</option>
            <option value="Artifex">Artifex</option>
            <option value="Comfora">Comfora</option>
            <option value="Homestead">Homestead</option>
          </select>
        </div>

        <div>
          <select
            className="select w-full max-w-xs mt-9"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="high">High to Low</option>
            <option value="low">Low to High</option>
          </select>
        </div>

        <div className="mt-9">
          <div className="flex justify-between">
            <span>Select Price</span>
            <span>${price}</span>
          </div>
          <input
            type="range"
            min={0}
            max={1000}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="range range-primary"
          />
          <div className="flex justify-between">
            <span>$0</span>
            <span>Max: $1000</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 ml-5 mt-3 justify-center text-center items-center">
          <label htmlFor="shipping" className="text-white">
            Free Shipping
          </label>
          <input
            id="shipping"
            type="checkbox"
            checked={freeShipping}
            onChange={(e) => setFreeShipping(e.target.checked)}
            className="checkbox"
          />
        </div>

        <div className="flex gap-3 items-center mt-9">
          <button onClick={applyFilters} className="btn btn-primary">
            SEARCH
          </button>
          <button onClick={resetFilters} className="btn btn-secondary">
            RESET
          </button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 ? (
          products.map((item, index) => (
            <Card
              key={index}
              images={item.attributes.image}
              id={item.id}
              title={item.attributes.title}
              price={item.attributes.price}
            />
          ))
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}

        <button
          onClick={previousPage}
          className={`btn btn-primary ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button onClick={nextPage} className="btn btn-primary" disabled={loading}>
          Next
        </button>
    </div>
  );
}

export default Pagination;
