import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import hostRoutes from './routes/host.routes';
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/error.handler';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', hostRoutes);

export default app;