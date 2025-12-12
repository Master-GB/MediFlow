import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors({credentials:true}));
app.use(express.json());

connectDB();
const PORT = process.env.PORT || 3000;

//default route
app.get('/',(req,res)=>{ res.send("API is running...");});
app.use('/api/auth',authRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})