import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300 w-[280px]">

      <img
        src={`https://ecommerce-product-1h77.onrender.com/uploads/${product.image_url}`}
        // src={`http://localhost:5000/uploads/${product.image_url}`}
        
        alt={product.name}
        className="w-full h-[250px] object-cover"
      />

      <div className="p-4">

        <h2 className="text-2xl font-bold">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4">

          <h3 className="text-2xl font-bold text-green-600">
            ₹ {product.price}
          </h3>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            In Stock
          </span>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="block text-center mt-5 bg-black text-white py-3 rounded-xl hover:bg-gray-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;