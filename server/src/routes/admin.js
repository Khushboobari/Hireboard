const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');
const { getStats, generateCoverNote } = require('../controllers/adminController');

// Stats (Admin Only)
router.get('/stats', verifyToken, isAdmin, getStats);

// AI Cover Note (Proxying Anthropic API)
// Accessible by any authenticated student wanting an AI cover note
router.post('/cover-note', verifyToken, generateCoverNote);

module.exports = router;
