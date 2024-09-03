const product = require("../model/Product.model");
class ProductServices {
  async addNewProduct(body) {
    try {
      const product = await product.create(body);
      return product;
    } catch (err) {
      return err;
    }
  }
  async 
};
