const router = require("express").Router()
const productController = require("../Controllers/product.controller")

router.get('/',productController.getAllProduct)
router.get('/:id',productController.getProduct)
router.get('/search/:key',productController.searchProduct)
router.post('/',productController.createProduct)

module.exports =router