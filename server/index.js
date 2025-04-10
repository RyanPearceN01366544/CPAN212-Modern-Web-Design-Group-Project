import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routers/user_router.js';
import productRouter from './routers/product_router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
<<<<<<< HEAD
<<<<<<< HEAD
    origin: ['http://localhost:5173', 'http://localhost:5175'], // Allow both ports
=======
    origin: 'http://localhost:5173', // Allow client application
>>>>>>> d8e3586 (Implement user authentication with MongoDB integration)
=======
    origin: ['http://localhost:5173', 'http://localhost:5175'], // Allow both ports
>>>>>>> 8f97ca3948dd4581105e40dc27f7c7dc2e44be15
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Routes
app.use('/User', userRouter);
app.use('/Product', productRouter);

// Unknown Website Exception Catching.
app.use("", (req, res) => {
    res.status(404).json({ message: "Resource not found" });
});

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/shopease')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });