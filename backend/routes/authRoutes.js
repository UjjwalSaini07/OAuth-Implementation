import express from 'express';
import passport from 'passport';
import { googleAuth } from '../controllers/authController.js';
import { githubAuth, githubCallback } from '../controllers/GithubauthController.js';

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
            {
                method: 'GET',
                endpoint: '/auth/github',
                description: 'Initiate GitHub Authentication process',
            },
        ],
    });
});

// Google Authentication
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

// GitHub Authentication Route
router.get('/github', githubAuth);

// GitHub Callback Route
router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth/failure' }),
    githubCallback
);

// Failure Route
router.get('/failure', (req, res) => {
    res.status(401).json({
        message: 'GitHub Authentication failed.',
        status: 'error',
    });
});

export default router;
