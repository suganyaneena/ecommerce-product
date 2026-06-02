import { useEffect, useState } from "react";

import API from "../api/api";

import Navbar from "../components/Navbar";

function AdminPage() {

  const [products, setProducts] = useState([]);
  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      price: "",
      sku: "",
      reviews: "",
      availability: true,
    });
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const fetchProducts = async () => {

    const res = await API.get("/products");

    console.log(res.data.data);
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {

    if (e.target.name === "image") {

      setFormData({
        ...formData,
        image: e.target.files[0],
      });

    } else {

      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });

    }
  };

  const editProduct = (product) => {
    setFormData({
    name: product.name,
    description: product.description,
    price: product.price,
    sku: product.sku,
    });

    setEditId(product.id);
    setImagePreview(product.image_url);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

      // validation
      if (!formData.name) {
        return alert("Name is required");
      }

      if (!formData.description) {
        return alert("Description is required");
      }

      if (!formData.price) {
        return alert("Price is required");
      }

      if (!formData.sku) {
        return alert("SKU is required");
      }

      // if (!formData.image) {
      //   return alert("Image is required");
      // }

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("sku", formData.sku);
    if (formData.image) {
      data.append("image", formData.image);
    }


    try {
    
       let response;


       if (editId) {

          response = await API.put(
            `/products/${editId}`,
            data
          );

          alert("Product Updated");

        } else {

          response = await API.post(
            "/products",
            data
          );

          alert("Product Created");
        }


        console.log(response.data);

        fetchProducts();

        setFormData({
          name: "",
          description: "",
          price: "",
          sku: "",
          image: "",
        });

        setEditId(null);

    } catch (error) {
        console.log(error.response?.data);
        console.log(error.message);
    }
  };

  const deleteProduct = async (id) => {

    await API.delete(
      `/products/${id}`
    );

    fetchProducts();
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-10">
          Admin Dashboard
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <form 
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-5"
          >

            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Product Name"
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              placeholder="Price"
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            {/* <input
              type="text"
              name="image_url"
              placeholder="Image URL"
              onChange={handleChange}
              className="border p-4 rounded-xl"
            /> */}

            {/* <input
                type="file"
                onChange={(e) =>
                    setFormData({
                    ...formData,
                    image: e.target.files[0],
                    })
                }
                className="border p-4 rounded-xl"
            /> */}
            <input
              type="file"
              name="image"
              // value={imagePreview}
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="sku"
              value={formData.sku}
              placeholder="SKU"
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <textarea
              name="description"
              value={formData.description}
              placeholder="Description"
              onChange={handleChange}
              className="border p-4 rounded-xl md:col-span-2"
            />

            <button className="bg-black text-white py-4 rounded-xl md:col-span-2 hover:bg-gray-800">
              {editId ? "Update Product" : "Create Product"}
            </button>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-5 rounded-2xl shadow"
            >

              <img
                src={`https://ecommerce-product-1h77.onrender.com/uploads/${product.image_url}`}
                alt={product.name}
                className="h-[200px] w-full object-cover rounded-xl"
              />

              <h2 className="text-2xl font-bold mt-4">
                {product.name}
              </h2>

              <h3 className="text-green-600 font-bold text-xl mt-2">
                ₹ {product.price}
              </h3>

              <button
                onClick={() => editProduct(product)}
                className="mt-2 bg-blue-500 text-white px-5 py-2 rounded-lg ml-2"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteProduct(product.id)
                }
                className="mt-5 bg-red-500 text-white px-5 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
