const Product = require("../Models/product.model");

module.exports = {
  createProduct: async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      res.status(200).json("Product created sucessfully");
    } catch (err) {
      res.status(500).json("Product created sucessfully", err);
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json("fail to get all products", err);
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      const {__v, createdAt, ...productData} =  product._doc;

      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json("fail to get the product", err);
    }
  },
  searchProduct: async (req, res) => {
    try {
      const result = await Product.aggregate([
        {
          $search: {
            index: "furniture",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*"
              }
            }
          }
        }
      ])
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json("fail to search the products", err);
    }
  },
};
