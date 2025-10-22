import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import createLimiter from './Middleware/Rate-Limiter.js';
import AuthRoute from './app-core/auth/Routes/AuthRoutes.js';
import customersRoutes from './app-core/Customer-Routes.js';
import adminRoutes from './app-core/Admin-Routes.js';

const app = express();

const allowedOrigins = new Set([
    'http://localhost:3000',
    'https://asalfarid.com',
]);

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (origin && allowedOrigins.has(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);}
    next();
});

app.use((req, res, next) => {
    const _set = res.setHeader.bind(res);
    res.setHeader = (name, value) => {
        if (String(name).toLowerCase() === 'access-control-allow-origin') {
            console.log('ACAO:', value, '->', req.method, req.originalUrl);
        }
        return _set(name, value);
    };
    res.on('finish', () => {
        const final = res.getHeader('Access-Control-Allow-Origin');
        if (final) console.log('Final ACAO:', final, '=>', req.method, req.originalUrl);
    });
    next();
});

app.set("trust proxy", 1);
app.use(express.json());
app.use(createLimiter());
app.use(cookieParser());
app.use(morgan('combined'));

app.use('/api/auth', AuthRoute);
app.use('/api', customersRoutes);
app.use('/api', adminRoutes);

export default app;
