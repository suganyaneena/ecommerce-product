const productModel = require("../models/productModel");
const upload = require("../middleware/upload");

const getProducts = async (req, res) => {
  try {
    const { q = "", page = 1 } = req.query;

    const limit = 10;
    const offset = (page - 1) * limit;

    const products = await productModel.getProducts(
      q,
      limit,
      offset
    );

    res.status(200).json({
      success: true,
      page: Number(page),
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productModel.getProductById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {

    console.log("BODY DATA:");
    // console.log(req.body);
    console.log(req.file);


     const productData = {
      ...req.body,
      image_url: req.file
        ? req.file.filename
        : null,
    };

    console.log('productData',productData);

    const product = await productModel.createProduct(
      productData
    );

    console.log("PRODUCT CREATED:");
    console.log(product);

    res.status(201).json({
      success: true,
      message: "Product created",
      data: product,
    });

  } catch (error) {

    console.log("ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {

  try {

    console.log("PARAM ID:");
    console.log(req.params.id);

    console.log("BODY DATA:");
    console.log(req.body);

    console.log("FILE DATA:");
    console.log(req.file);

    const productData = {
      ...req.body,
    };

    if (req.file) {

      console.log("NEW IMAGE:");
      console.log(req.file.filename);

      productData.image_url =
        req.file.filename;
    }

    console.log("FINAL PRODUCT DATA:");
    console.log(productData);

    const product =
      await productModel.updateProduct(
        req.params.id,
        productData
      );

    console.log("UPDATED PRODUCT:");
    console.log(product);

    res.status(200).json({
      success: true,
      message: "Product updated",
      data: product,
    });

  } catch (error) {

    console.log("ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productModel.deleteProduct(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};