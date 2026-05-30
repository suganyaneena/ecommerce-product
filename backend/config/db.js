// const { Pool } = require("pg");

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// module.exports = pool;

const { Pool } = require("pg");

const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
 ssl: {
   rejectUnauthorized: false
 }
});

pool.connect()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Error", err));

module.exports = pool;

console.log("DATABASE_URL:", process.env.DATABASE_URL);