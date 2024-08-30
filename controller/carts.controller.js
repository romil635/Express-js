const carts =require("../model/carts.modal");

exports.addtoCart = async(req,res) => {
     try {
          let cart = await carts.findOne({
               user:req.user._id,
               product:req.body.product,
               isDelete:false,
          });
          if (cart) {
               
               cart.quantity += req.body.quantity || 1; 
               await cart.save();
               return res.json({ message: "Quantity updated", cart });
           } else {
               cart = await carts.create({
                   user: req.user._id,
                   ...req.body,
               });
               return res.status(201).json({ message: "Cart Added", cart });
           }
          } catch (error) {
                    console.log(error);
                    res.status(500).json({message:"Server Error"});
}
};

exports.getAllCarts = async (req,res) => {
     try {
          const carts = await Cart.find({ user: req.user._id, isDelete: false }).populate('product');
          res.json(carts);
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Server error" });
      }
};
exports.updateCart = async (req,res) => {
     try {
          let cart = await Cart.findOne({
              _id: req.params.id,
              user: req.user._id,
              isDelete: false,
          });
          if (!cart) {
              return res.status(404).json({ message: "Cart item not found" });
          }
          cart.quantity = req.body.quantity || cart.quantity;
          await cart.save();
          res.json({ message: "Cart updated", cart });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Server error" });
      }
};

exports.deleteCart = async (req, res) => {
     try {
         let cart = await Cart.findOne({
             _id: req.params.id,
             user: req.user._id,
             isDelete: false,
         });
         if (!cart) {
             return res.status(404).json({ message: "Cart item not found" });
         }
         cart.isDelete = true;
         await cart.save();
         res.json({ message: "Cart item deleted" });
     } catch (error) {
         console.error(error);
         res.status(500).json({ message: "Server error" });
     }
 };