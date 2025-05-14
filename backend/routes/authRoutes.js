import express from 'express';
import { googleAuth } from '../controllers/authController.js';

const router = express.Router();

// Root route for the authentication service
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Authentication service is operational!',
        status: 'success',
        availableEndpoints: [
            {
                method: 'GET',
                endpoint: '/auth',
                description: 'Status check for the authentication service',
            },
            {
                method: 'GET',
                endpoint: '/auth/google',
                description: 'Initiate Google Authentication process',
            },
        ],
    });
});

// Route to handle Google Authentication
router.get('/google', async (req, res, next) => {
    try {
        await googleAuth(req, res);
    } catch (error) {
        console.error('Error during Google Authentication:', error);
        res.status(500).json({
            message: 'An error occurred during Google Authentication',
            status: 'error',
        });
    }
});

export default router;
