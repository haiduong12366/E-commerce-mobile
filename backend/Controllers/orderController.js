const Order = require("../Models/order.model");

module.exports = {

  getOrders: async (req, res) => {
    const userId =  req.params.id;
    
    const allOrder = await Order.find()

    res.status(200).json(allOrder)


},

  getUserOrders: async (req, res) => {
    const userId = req.params.id;
    try {
      const userOrders = await Order.find({ userId })
        .populate(
          "productId",
          "-description -product_location",
        )
        

      res.status(200).json(userOrders);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
