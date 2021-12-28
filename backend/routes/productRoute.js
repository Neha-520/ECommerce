const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");

const Router = express.Router();

Router.route("/products").get(getAllProducts);

Router.route("/product/new").post(createProduct);

Router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = Router;