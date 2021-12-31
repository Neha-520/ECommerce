const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const Router = express.Router();

Router.route("/products").get(getAllProducts);

Router.route("/admin/product/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

Router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

Router.route("/product/:id").get(getProductDetails);

module.exports = Router;