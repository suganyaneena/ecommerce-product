import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://ecommerce-product-1h77.onrender.com/api",
});

export default API;