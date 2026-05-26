# Ecommerce Product Listing App

Simple ecommerce product listing application built using:

- React.js
- Node.js
- Express.js
- PostgreSQL
- Tailwind CSS
- Swagger

# Features

## User Side

- Product Listing
- Product Search
- Product Detail Page
- Pagination

## Admin Side

- Create Product
- Delete Product
- Upload Product Image
## Backend

- REST APIs
- PostgreSQL Database
- Swagger Documentation
- Image Upload using Multer

---

# Tech Stack

## Frontend

- React.js
- Vite
- Axios
- React Router DOM
- Tailwind CSS

## Backend

- Node.js
- Express.js
- PostgreSQL
- Multer
- Swagger

---

# Project Structure

```bash
ecommerce-product/
│
├── backend/
│
└── frontend/
```

---

# Backend Setup

## Step 1 — Open Backend Folder

```bash
cd backend
```

---
## Step 2 — Install Backend Packages

```bash
npm install
```

### Required Backend Packages

```bash
npm install express cors dotenv pg multer
```

### Swagger Packages

```bash
npm install swagger-ui-express swagger-jsdoc
```

### Development Package

```bash
npm install --save-dev nodemon
```

# Frontend Setup

## Step 1 — Open Frontend Folder

```bash
cd frontend
```

---

# Step 2 — Install Frontend Packages

```bash
npm install
```

### Required Frontend Packages

```bash
npm install axios react-router-dom
```

### Tailwind CSS Installation

```bash
npm install -D tailwindcss @tailwindcss/vite
```

---

# Step 3 — Configure Vite

## vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

---

# Step 4 — Add Tailwind CSS

## src/index.css

```css
@import "tailwindcss";
```

---

# Step 5 — Run Frontend

```bash
npm run dev
```

Frontend URL:

```bash
http://localhost:5173
```

---

# Environment Variables

## Backend `.env`

Create `.env` file inside backend folder.

```env
PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=ecommerce
DB_PASSWORD=yourpassword
DB_PORT=5432
```

---

# Run Backend Server

## Development Mode

```bash
npm run dev
```

## Production Mode

```bash
npm start
```

Backend URL:

```bash
http://localhost:5000
```

---

# Swagger API Documentation

Swagger is used for API testing and documentation.

Swagger URL:

```bash
http://localhost:5000/api/docs
```

---

# Swagger Installation

```bash
npm install swagger-ui-express swagger-jsdoc
```

---

# Swagger Configuration

## backend/swagger/swagger.js

```js
const swaggerJsDoc = require("swagger-jsdoc");

const options = {

  definition: {
    openapi: "3.0.0",

    info: {
      title: "Ecommerce Product API",
      version: "1.0.0",
      description: "Product Listing API",
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec =
  swaggerJsDoc(options);

module.exports = swaggerSpec;
```

---

# Swagger Setup in server.js

```js
const swaggerUi =
  require("swagger-ui-express");

const swaggerSpec =
  require("./swagger/swagger");

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
```

---

# Available APIs

## Get All Products

```http
GET /api/products
```

---

## Search Products

```http
GET /api/products?q=shoe&page=1
```

---

## Get Product By ID

```http
GET /api/products/:id
```

---

## Create Product

```http
POST /api/products
```

---

## Update Product

```http
PUT /api/products/:id
```

---

## Delete Product

```http
DELETE /api/products/:id
```

---

# Image Upload

Images are uploaded using Multer.

Uploaded images are stored inside:

```bash
backend/uploads/
```

---

# Run Complete Project

## Start Backend

```bash
cd backend
npm run dev
```

---

## Start Frontend

```bash
cd frontend
npm run dev
```

---

# Application URLs

## Frontend

```bash
http://localhost:5173
```

## Backend

```bash
http://localhost:5000
```

## Swagger API Docs

```bash
http://localhost:5000/api/docs
```

# Database Setup

## Step 1 — Open PostgreSQL

Open:
- pgAdmin
OR
- PostgreSQL SQL Shell (psql)

---

# Step 2 — Create Database

Run this SQL query:

```sql
CREATE DATABASE ecommerce;
```

---

# Step 3 — Open ecommerce Database

Select the `ecommerce` database.

---

# Step 4 — Create Products Table

Run this SQL query:

```sql
CREATE TABLE products (

    id SERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    description TEXT,

    price DECIMAL(10,2),

    image_url TEXT,

    sku VARCHAR(100),

    reviews INTEGER DEFAULT 0,

    availability BOOLEAN DEFAULT true,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Step 5 — Insert Sample Product Data

```sql
INSERT INTO products
(name, description, price, image_url, sku, reviews, availability)

VALUES

(
'Nike Shoes',
'Running shoes for men',
4999,
'uploads/shoes.jpg',
'NIKE001',
4,
true
),

(
'iPhone 15',
'Apple smartphone',
79999,
'uploads/iphone.jpg',
'APPLE001',
5,
true
);
``