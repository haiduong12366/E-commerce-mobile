const Product = require("../Models/product.model");
const Cart = require("../Models/cart.model");

module.exports = {
  addToCart: async (req, res) => {
    const { userId, cartItem, quantity } = req.body;
    try {
      const cart = await Cart.findOne({ userId });
      if (cart) {
        const existingProduct =  cart.products.find(
          (product) => product.cartItem.toString() === cartItem
        );
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.products.push({ cartItem, quantity });
        }
        await cart.save();
        res.status(200).json("Product updated in cart");
      } else {
        const newCart = new Cart({
          userId,
          products: [{ cartItem, quantity }],
        });
        await newCart.save();
        res.status(200).json("Product added to cart");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getCart: async (req, res) => {
    const userId = req.params.id;
    try {
      const cart = await Cart.find({ userId }).populate(
        "products.cartItem",
        "_id title supplier price imageUrl"
      );
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCartItem: async (req, res) => {
    const cartItemId = req.params.cartItemId;
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { "products._id": cartItemId },
        { $pull: { products: { _id: cartItemId } } },
        { new: true }
      );
      if (!updatedCart) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete cart item" });
    }
  },

  decrementCartItem: async (req, res) => {
    const { userId, cartItem } = req.body;
    try {
      const cart = await Cart.findOne({ userId });
      
      if (!cart) {
        return res.status(404).json("Cart not found");
      }
      const existingProduct = cart.products.find((product) => {
        return product.cartItem.toString() === cartItem;
      });
      if (!existingProduct) {
        return res.status(404).json("Product not found in cart");
      }
      if (existingProduct.quantity === 1) {
        await Cart.updateOne({ userId }, { $pull: { products: { cartItem } } });
      } else {
        existingProduct.quantity -= 1;
      }
      await cart.save();

      res.status(200).json("Product updated");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
