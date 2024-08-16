const Product = require("../model/product.model")

exports.addNewProduct =async (req, res) => {
    try{
        let title = await Product.findOne({title: req.body.title});
        // console.log(product);
        if(title){
            return res.status(400).json({message: "Product already exists"});
        }
        title = await Product.create(req.body);
        res.status(201).json({title, message: "User Addede Success"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
        
    }
};

exports.getAllProduct =async (req, res) => {
    try{
        let titles = await Product.find();
        res.status(200).json(titles);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
};

exports.getProduct =async (req, res) => {
    try{
        // let titles = await Product.findOne({title: req.query.title});
        // let titles = await Product.findOne({_id: req.query.productId});
        let titles = await Product.findById(req.query.productId);
        console.log(titles);
        if(!titles) {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json(titles);
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
};

exports.updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.query.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user = await User.findByIdAndUpdate(user._id, { $set: req.body }, { new: true });
    res.status(202).json({ user, message: 'User update success' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.query.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user = await User.findOneAndDelete({ _id: user._id });
    res.status(200).json({ user, message: 'User Delete success' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ product, message: 'Product created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.query.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product = await Product.findByIdAndUpdate(product._id, { $set: req.body }, { new: true });
    res.status(202).json({ product, message: 'Product update success' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.query.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product = await Product.findOneAndDelete({ _id: product._id });
    res.status(200).json({ product, message: 'Product Delete success' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
