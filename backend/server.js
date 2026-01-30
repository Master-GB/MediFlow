import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import userProfileRouter from './routes/userProfileRoute.js';

dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:5173/', '']

app.use(cookieParser());
app.use(cors({ origin: allowedOrigins ,credentials:true}));
app.use(express.json());

connectDB();
const PORT = process.env.PORT || 3000;

//default route
app.get('/',(req,res)=>{ res.send("API is running...");});
app.use('/api/auth',authRoutes);
app.use('/api/user',userRouter);
app.use('/api/profile',userProfileRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})