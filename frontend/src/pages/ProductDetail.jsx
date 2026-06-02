import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../api/api";

import Navbar from "../components/Navbar";

function ProductDetail() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {

    const res = await API.get(
      `/products/${id}`
    );

    setProduct(res.data.data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-6xl mx-auto p-10">

        <div className="bg-white rounded-2xl shadow-lg grid md:grid-cols-2 gap-10 p-10">

          <img
            src={`https://ecommerce-product-1h77.onrender.com/uploads/${product.image_url}`}
            // src={`http://localhost:5000/uploads/${product.image_url}`}
          
            // src={product.image_url}
            alt={product.name}
            // className="w-full rounded-2xl"
           className="w-full h-[250px] object-cover rounded-2xl"
          />

          <div>

            <h1 className="text-5xl font-bold">
              {product.name}
            </h1>

            <p className="text-gray-500 mt-5 text-lg">
              {product.description}
            </p>

            <h2 className="text-4xl text-green-600 font-bold mt-8">
              ₹ {product.price}
            </h2>

            <div className="mt-8 space-y-3 text-lg">

              <p>
                <strong>SKU:</strong>
                {product.sku}
              </p>

              <p>
                <strong>Reviews:</strong>
                {product.reviews}
              </p>

              <p>
                <strong>Availability:</strong>

                {product.availability
                  ? " In Stock"
                  : " Out Of Stock"}
              </p>
            </div>

            <button className="mt-10 bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;