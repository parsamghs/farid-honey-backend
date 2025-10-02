import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

import createLimiter from './src/Middleware/Rate-Limiter.js'
import AuthRoute from './src/app-core/auth/Routes/AuthRoutes.js'
import customersRoutes from './src/app-core/Customer-Routes.js';
import adminRoutes from './src/app-core/Admin-Routes.js';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(createLimiter());
app.use(cookieParser());

app.use('/api/auth', AuthRoute);
app.use('/api', customersRoutes);
app.use('/api', adminRoutes);

app.listen(port, () => {
    console.log(`Server is running 🚀`);
});
