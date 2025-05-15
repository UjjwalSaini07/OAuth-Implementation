import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import './config/dbConnect.js';
import AppError from './utils/appError.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.redirect('/auth');
    } else {
        next();
    }
});

app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);

// Handle undefined routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// Global error-handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: err.status || 'error',
        message: err.message,
    });
});

// Start server
const httpServer = app.listen(PORT, () => {
    console.clear();
    console.log(`${chalk.green.bold('\n=========================================')}`);
    console.log(`${chalk.green.bold('🚀 Server Status: ')}${chalk.cyan.bold('Online')}`);
    console.log(`${chalk.green.bold('🌐 Listening on: ')}${chalk.yellow.underline(`http://localhost:${PORT}`)}`);
    console.log(`${chalk.green.bold('📅 Started at: ')}${chalk.magenta(new Date().toLocaleString())}`);
    console.log(`${chalk.green.bold('=========================================\n')}`);
});

// Handle server close event
httpServer.on('close', () => {
  console.log(chalk.red.bold('\n========================================='));
  console.log(chalk.red.bold('🛑 Server Status: ') + chalk.yellow.bold('Offline'));
  console.log(chalk.red.bold('🔔 Server has been closed.'));
  console.log(chalk.red.bold('=========================================\n'));
});

// Graceful shutdown on Ctrl+C
process.on('SIGINT', () => {
  console.log(chalk.blue.bold('Gracefully shutting down the server...'));
  httpServer.close(() => {
    console.log(chalk.blue.bold('Server shut down complete.'));
    process.exit(0);
  });
});
