const express = require('express');
const productRoutes = express.Router();
const{
    registerProduct,
    loginProduct
} = require("../controller/product.controller")

productRoutes.post('/register', registerProduct);
productRoutes.get('/login', loginProduct);

module.exports = productRoutes;