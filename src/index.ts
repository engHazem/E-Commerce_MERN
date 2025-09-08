import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/userRoutes';


// intialize express app
const app = express();
const PORT = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce')
.then(() => {
    console.log('Connected to MongoDB');
}
).catch(err => {
    console.error('Failed to connect to MongoDB', err);
}
);


app.use('/user',userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);



