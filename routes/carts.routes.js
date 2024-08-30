const express = require("express");
const cartRoutes = express.Router();
const {
    addToCart,
    getAllCarts,
    updateCarts,
    deleteCarts
} = require("../controller/carts.controller");
const { verifyToken } = require('../helpers/verifyToken');

cartRoutes.post("/", verifyToken, addToCart);
cartRoutes.get("/", verifyToken, getAllCarts);
cartRoutes.put("/", verifyToken, updateCarts);
cartRoutes.delete("/",verifyToken,deleteCarts)


module.exports = cartRoutes;
