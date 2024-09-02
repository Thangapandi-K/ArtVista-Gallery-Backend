//import
const express = require('express');
const cartRouter = express.Router();
const auth = require('../middlewares/auth');
const cartController = require('../controllers/cartController');

//add routes
cartRouter.post('/add', auth.requireSignIn, cartController.addToCart);
cartRouter.get('/', auth.requireSignIn, cartController.getCart);
cartRouter.get('/all', auth.requireSignIn, auth.isAdmin, cartController.getAllCart);
cartRouter.delete('/delete', auth.requireSignIn, cartController.deleteCart);
cartRouter.delete('/:id', auth.requireSignIn, cartController.removeProduct);

//export
module.exports = cartRouter;