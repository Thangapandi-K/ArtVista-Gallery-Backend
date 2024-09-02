//import
const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth')

//add routes
orderRouter.post('/order', auth.requireSignIn, orderController.placeOrder);
orderRouter.get('/', auth.requireSignIn, orderController.getOrder);
orderRouter.get('/all', auth.requireSignIn, auth.isAdmin, orderController.getAllOrders);
orderRouter.put('/update', auth.requireSignIn, auth.isAdmin, orderController.updateOrder);


//export
module.exports = orderRouter;