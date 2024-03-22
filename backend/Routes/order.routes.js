const router = require("express").Router();
const orderController = require("../Controllers/orderController");

router.get("/:id", orderController.getUserOrders);
router.get("/", orderController.getOrders);


module.exports = router;
