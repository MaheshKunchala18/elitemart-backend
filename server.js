import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import { signup, login, getUserName } from './Controllers/authController.js';


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



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});