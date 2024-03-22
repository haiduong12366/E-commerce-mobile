const router = require('express').Router();
const paymentController = require('../Controllers/paymentsController');

router.post("/", paymentController.createPayment);
// router.post("/fulfillment", paymentController.stripeHook);



module.exports = router