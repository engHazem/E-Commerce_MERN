import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import { seedInitialProducts } from './services/productService';
import productRoute from './routes/productRoute';
import cartRoute from './routes/cartRoute';

// Load environment variables from .env file
dotenv.config();

// intialize express app
const app = express();
const PORT = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

//Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL ||"")
.then(() => {
    console.log('Connected to MongoDB');
}
).catch(err => {
    console.error('Failed to connect to MongoDB', err);
}
);

// Seed initial products
seedInitialProducts();

// Define routes
app.use('/user',userRoute);
app.use('/product',productRoute);
app.use('/cart',cartRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);



