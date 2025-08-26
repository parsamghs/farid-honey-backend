import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import boxen from 'boxen';

import Users_Route from './Routes/Users-Central-Routes.js';
import ProductsRoute from './Routes/Products-Central-Routes.js';
import AddressesRoute from './Routes/Addresses-Central-Routes.js';
import CartsRoute from './Routes/Carts-Central-Routes.js';
import OrdersRoute from './Routes/Orders-Central-Routes.js';

const app = express();
const port = process.env.PORT || 3001;
const url = `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.use('/api/users', Users_Route);
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
