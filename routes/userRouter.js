//import
const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

//auth check
userRouter.get('/checkAuth', userController.checkAuth);
//routes
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/logout', auth.requireSignIn, userController.logout);
userRouter.get('/allusers', auth.requireSignIn, auth.isAdmin, userController.getUsers);
userRouter.delete('/:id', auth.requireSignIn, auth.isAdmin, userController.deleteUser);
userRouter.get('/profile', auth.requireSignIn, userController.getProfile);
userRouter.put('/profile', auth.requireSignIn, userController.editProfile);

//export
module.exports = userRouter;