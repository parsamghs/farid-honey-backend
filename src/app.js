import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import createLimiter from './Middleware/Rate-Limiter.js';
import AuthRoute from './app-core/auth/Routes/AuthRoutes.js';
import customersRoutes from './app-core/Customer-Routes.js';
import adminRoutes from './app-core/Admin-Routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(createLimiter());
app.use(cookieParser());

app.use('/api/auth', AuthRoute);
app.use('/api', customersRoutes);
app.use('/api', adminRoutes);

export default app;
