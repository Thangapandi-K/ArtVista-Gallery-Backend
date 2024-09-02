//import 
const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer')

//add routes
productRouter.post('/addproduct', auth.requireSignIn, auth.isAdmin, upload.single('image'), productController.addProduct);
productRouter.get('/viewproducts', productController.viewAllProduct);
productRouter.delete('/:id', auth.requireSignIn, auth.isAdmin, productController.deleteProduct);
productRouter.put('/product', auth.requireSignIn, auth.isAdmin, productController.editDetails);

//export
module.exports = productRouter;