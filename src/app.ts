import express, { Application } from 'express';
import morgan from 'morgan'
import authRoutes from './routes/auth.routes';
import hostRoutes from './routes/host.routes';
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/error.handler';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/product', hostRoutes);

export default app;