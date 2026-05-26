import { useEffect, useState } from "react";

import API from "../api/api";

import ProductCard from "../components/ProductCard";

import Navbar from "../components/Navbar";

function ProductList() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const fetchProducts = async () => {

    try {

      const res = await API.get(
        `/products?q=${search}&page=${page}`
      );

      setProducts(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-5xl font-bold text-center mb-10">
          Our Products
        </h1>

        <div className="flex justify-center gap-4 mb-10">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border w-[350px] p-4 rounded-xl shadow-sm outline-none"
          />

          <button
            onClick={fetchProducts}
            className="bg-black text-white px-6 rounded-xl hover:bg-gray-800"
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap gap-8 justify-center">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="flex justify-center gap-5 mt-12">

          <button
            onClick={() =>
              setPage(page > 1 ? page - 1 : 1)
            }
            className="bg-white px-5 py-3 rounded-lg shadow"
          >
            Prev
          </button>

          <div className="text-2xl font-bold">
            {page}
          </div>

          <button
            onClick={() => setPage(page + 1)}
            className="bg-white px-5 py-3 rounded-lg shadow"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;