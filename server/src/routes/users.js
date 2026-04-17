const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { updateProfile, toggleSavedJob, getSavedJobs } = require('../controllers/userController');

// All user routes require authentication
router.put('/profile', verifyToken, updateProfile);
router.patch('/saved-jobs/:jobId', verifyToken, toggleSavedJob);
router.get('/saved-jobs', verifyToken, getSavedJobs);

module.exports = router;
