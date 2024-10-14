import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import { signup, login, getUserName } from './Controllers/authController.js';
import { addToCart, getCartByUserId, removeFromCart, clearCart } from './Controllers/cartController.js';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "./Controllers/productController.js";
import { addOrder, getOrdersByUser } from './Controllers/orderController.js';


const app = express();
const port = process.env.PORT || 3001;


app.use(cors());
app.use(bodyParser.json());


dotenv.config();

const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Could not connect to MongoDB...', err));



// Auth Routes
app.post('/signup', signup);
app.post('/login', login);
app.get('/username/:userId', getUserName);


// Product Routes
app.get('/products', getAllProducts);
app.get('/products/:id', getProductById);
app.post('/products', createProduct);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);


// Cart Routes
app.post('/cart', addToCart);
app.get('/cart/:userId', getCartByUserId);
app.delete('/cart', removeFromCart);
app.post('/cart/clear', clearCart);


// Order Routes
app.post('/orders', addOrder);
app.get('/orders/:userId', getOrdersByUser);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});