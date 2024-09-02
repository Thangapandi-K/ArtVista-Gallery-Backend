//import
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const requestLogger = require('./utils/logger');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const paymentRouter = require('./routes/paymentRouter');

//create app
const app = express();

//middleware
app.use(cors({
    origin: ['', 'http://localhost:5173'],
    credentials: true
}));

app.use('/uploads', express.static('uploads'));

app.use(cookieParser());

app.use(express.json());

app.use(requestLogger);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/checkout', paymentRouter)

//export
module.exports = app;