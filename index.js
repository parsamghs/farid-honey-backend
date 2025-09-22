import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import chalk from 'chalk';
import boxen from 'boxen';

import createLimiter from './src/Middleware/Rate-Limiter.js'
import AuthRoute from './src/app-core/Auth/Routes/AuthRoutes.js'
import customersRoutes from './src/app-core/Customer-Routes.js';
import adminRoutes from './src/app-core/Admin-Routes.js';

const app = express();
const port = process.env.PORT || 3001;
const url = `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.use(createLimiter());
app.use(cookieParser());

app.use('/api/auth', AuthRoute);
app.use('/api', customersRoutes);
app.use('/api', adminRoutes);

app.listen(port, () => {
    const message = chalk.white('Server running on') + ' ' +
                    chalk.greenBright.bold(url) + ' ✅';
    console.log(
        boxen(message, {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'cyan',
            align: 'center'
        })
    );
});
