import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import userProfileRouter from './routes/userProfileRoute.js';
import messageRouter from './routes/messgeRoute.js';

dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5173/']

app.use(cookieParser());
app.use(cors({ origin: allowedOrigins ,credentials:true}));
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

connectDB();
const PORT = process.env.PORT || 3000;

//default route
app.get('/',(req,res)=>{ res.send("API is running...");});
app.use('/api/auth',authRoutes);
app.use('/api/user',userRouter);
app.use('/api/profile',userProfileRouter);
app.use('/api/message',messageRouter);

app.use((err, req, res, next) => {
    if (!err) return next();

    if (err.name === 'MulterError') {
        return res.status(400).json({
            success: false,
            message: 'File upload error',
            error: err.message,
        });
    }

    if (typeof err.message === 'string' && err.message.includes('Only images')) {
        return res.status(400).json({
            success: false,
            message: 'Invalid file type',
            error: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: 'Server error',
        error: err.message,
    });
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})