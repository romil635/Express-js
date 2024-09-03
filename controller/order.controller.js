const Order = require("../model/order.model");
const Cart = require("../model/cart.model");

exports.addNewOrder = async (req, res) => {
  try {
    
    let carts = await Cart.find({
      user: req.user._id,
      isDelete: false
    }).populate({ path: "productId" });

    if (carts.length === 0) {
      return res.json({ message: 'No Cart Found' });
    }

    
    let orderItems = carts.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
      totalPrice: item.quantity * item.productId.price
    }));
// console.log(orderItems);
    let amount = orderItems.reduce((total, item) => total + item.totalPrice, 0);
// console.log(amount);
    let order = await Order.create({
      user: req.user._id,
      items: orderItems,
      paidAmount: amount
    });
    await Cart.updateMany({ user: req.user._id, isDelete: false }, { isDelete: true });
    res.json({ message: 'Order Placed', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all orders that are not soft-deleted
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ deleted: false }).populate('user');
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Soft delete an order
exports.softDeleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.deleted = true;
        await order.save();

        res.status(200).json({ success: true, message: 'Order soft deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};



// ADD NEW ORDER IN THE METHS POPULATE METHS IN USE THIS CODE //

// let find = [
// {
// $match: { user: req.user._id, isDelete: false },
// },
// {
// $lookup: {
// from: "products",
// localField: "productId",
// foreignField: "_id",
// as: "product"
// }
// }
// ];
// let carts = await Cart.aggregate(find);