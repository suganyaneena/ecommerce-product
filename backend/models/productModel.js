const pool = require("../config/db");

const getProducts = async (search, limit, offset) => {
  const result = await pool.query(
    `SELECT * FROM products
     WHERE name ILIKE $1
     ORDER BY id DESC
     LIMIT $2 OFFSET $3`,
    [`%${search}%`, limit, offset]
  );

  return result.rows;
};

const getProductById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

const createProduct = async (data) => {

  console.log("MODEL DATA:");
  console.log(data);

  const query = `
    INSERT INTO products
    (
      name,
      description,
      price,
      sku,
      reviews,
      image_url
    )
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  const values = [
    data.name,
    data.description,
    Number(data.price),
    Number(data.sku),
    Number(data.reviews || 0),
    data.image_url,
  ];

  console.log("VALUES:");
  console.log(values);

  return await pool.query(query, values);
};

const updateProduct = async (id, data) => {
  const {
    name,
    description,
    price,
    image_url,
    sku,
    reviews,
    availability,
  } = data;

  const result = await pool.query(
    `UPDATE products
     SET name=$1,
         description=$2,
         price=$3,
         image_url=$4,
         sku=$5,
         reviews=$6,
         availability=$7
     WHERE id=$8
     RETURNING *`,
    [
      name,
      description,
      price,
      image_url,
      sku,
      reviews,
      availability,
      id,
    ]
  );

  return result.rows[0];
};

const deleteProduct = async (id) => {
  await pool.query(
    "DELETE FROM products WHERE id=$1",
    [id]
  );
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};