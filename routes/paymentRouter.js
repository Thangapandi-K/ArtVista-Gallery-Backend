const express = require('express');
const paymentRouter = express.Router();
const auth = require('../middlewares/auth');
const paymentController = require('../controllers/paymentController');


paymentRouter.post('/payment', auth.requireSignIn, paymentController.handleCheckoutPayment)

module.exports = paymentRouter;