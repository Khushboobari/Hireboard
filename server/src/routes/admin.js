const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const isRecruiterOrAdmin = require('../middleware/isRecruiterOrAdmin');
const { getStats, generateCoverNote } = require('../controllers/adminController');

// Stats (Admin and Recruiter)
router.get('/stats', verifyToken, isRecruiterOrAdmin, getStats);

// AI Cover Note (Proxying Anthropic API)
// Accessible by any authenticated student wanting an AI cover note
router.post('/cover-note', verifyToken, generateCoverNote);

module.exports = router;
