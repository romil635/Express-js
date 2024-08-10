const express = require("express");
const app = express();
const morgan = require("morgan");
const products = require("./product.json");
console.log(products);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome To Express Server");
});
// Products Routes
// Create Product
app.post("/products", (req, res) => {
     console.log(req.body);
     products.push(req.body);
     res.json({ message: "Product Added Successfully" });
   });
   
   // Read Product - Get All Products
   app.get("/products", (req, res) => {
     res.json(products);
   });
   
   // Get Single Product
   app.get("/products/:id", (req, res) => {
     const id = +req.params.id;
     const product = products.find(product => product.id === id);
     res.json(product);
   });
   
   // Replace Data Method - PUT
   app.put("/products/:id", (req, res) => {
     const id = +req.params.id;
     const productIndex = products.findIndex(product => product.id === id);
     products.splice(productIndex, 1, req.body);
     res.json({ message: "Product Updated Successfully" });
   });
   
   // Update Data Method - PATCH
   app.patch("/products/:id", (req, res) => {
     const id = +req.params.id;
     const productIndex = products.findIndex(product => product.id === id);
     const product = products[productIndex];
     products.splice(productIndex, 1, { ...product, ...req.body });
     res.json({ message: "Product Data Updated Successfully" });
   });
   
   // Delete Data - DELETE
   app.delete("/products/:id", (req, res) => {
     const id = +req.params.id;
     const productIndex = products.findIndex(product => product.id === id);
     products.splice(productIndex, 1);
     res.json({ message: "Product Deleted Successfully" });
   });
   
   app.listen(2024, () => {
     console.log("Server started at http://localhost:2024");
   });
   


   // ---------------------------------------------- PRODUCT TASK ------------------------------------------------//