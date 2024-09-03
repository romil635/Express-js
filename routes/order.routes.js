const express = require("express");

const orderRoutes = express.Router();

const { addNewOrder } = require("../controller/order.controller");

const { verifyToken } = require("../helpers/verifyToken");

orderRoutes.post("/", verifyToken, addNewOrder);

orderRoutes.get("/", verifyToken, getAllCarts);
orderRoutes.get("/", verifyToken, getAllOder);

// Route to soft delete an order
orderRoutes.delete("/",varifyToken,this.deleteOder);

module.exports = orderRoutes;
