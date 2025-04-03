import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import user_router from './routers/user_router.js';
import product_router from './routers/product_router.js';

dotenv.config(); // R: Doesn't look nice but order of operations. Make sure to init the dotenv before setting PORT.
const PORT = process.env.PORT || 8000;
const app = express();
const corsOptions = { // R: Setting up Cors.
    origin: 'http://localhost:5173', // R: Default VITE port.
    method: ["GET", "POST", 'PUT', "DELETE"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routers
app.use('/User/', user_router);
app.use('/Product/', product_router);

// Start Up.
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB is Connected!");
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        })
    }
);

// Unknown Website Exception Catching.
app.use("", (req, res) => {
  res.status(404).send("Page not found!");
});