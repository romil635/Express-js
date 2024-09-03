// const express = require("express")
// const productRotes = express.Router()
// const { addNewProduct, getAllProduct, getProduct, replaceProduct, updateProduct, deleteProduct } = require("../controller/product.controller")

// productRotes.post('/',addNewProduct)

// productRotes.get("/",getAllProduct)

// productRotes.get("/get-product" ,getProduct)

// productRotes.put("/" ,updateProduct)

// productRotes.delete("/" , deleteProduct)

// module.exports = productRotes



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