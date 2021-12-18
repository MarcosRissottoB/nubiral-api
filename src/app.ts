import express, { Application } from 'express';
import morgan from 'morgan'
import authRoutes from './routes/auth.routes';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);

export default app;