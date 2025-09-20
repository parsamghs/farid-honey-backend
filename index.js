import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import chalk from 'chalk';
import boxen from 'boxen';

import createLimiter from './src/Middleware/Rate-Limiter.js'
import AuthRoute from './src/app-core/Auth/Routes/AuthRoutes.js'
import UsersRoute from './src/app-core/Customers/Routes/Users-Central-Routes.js';
import ProductsRoute from './src/app-core/Customers/Routes/Products-Central-Routes.js';
import AddressesRoute from './src/app-core/Customers/Routes/Addresses-Central-Routes.js';
import CartsRoute from './src/app-core/Customers/Routes/Carts-Central-Routes.js';
import OrdersRoute from './src/app-core/Customers/Routes/Orders-Central-Routes.js';


const app = express();
const port = process.env.PORT || 3001;
const url = `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.use(createLimiter());
app.use(cookieParser());

app.use('/api/auth', AuthRoute);
app.use('/api/users', UsersRoute);
app.use('/api/products', ProductsRoute);
app.use('/api/address',AddressesRoute);
app.use('/api/carts', CartsRoute);
app.use('/api/orders', OrdersRoute);

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
