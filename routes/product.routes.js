const express = require('express');
const productRoutes = express.Router();
const{
    addNewProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct
} = require("../controller/product.controller")

productRoutes.post('/', addNewProduct);

productRoutes.get('/', getAllProduct)

productRoutes.get("/get-product", getProduct)


productRoutes.patch("/:id", updateProduct)

productRoutes.delete("/:id", deleteProduct)

module.exports = productRoutes;