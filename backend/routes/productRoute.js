const express = require("express");
const { getAllProducts, createProduct } = require("../controllers/productController");

const Router = express.Router();

Router.route("/products").get(getAllProducts);
Router.route("/product/new").post(createProduct);

module.exports = Router;