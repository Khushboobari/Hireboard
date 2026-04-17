const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');
const {
  applyToJob,
  getMyApplications,
  getJobApplicants,
  updateStatus
} = require('../controllers/applicationController');

// Student routes
router.post('/', verifyToken, applyToJob);
router.get('/mine', verifyToken, getMyApplications);

// Admin routes
router.get('/:jobId', verifyToken, isAdmin, getJobApplicants);
router.patch('/:id/status', verifyToken, isAdmin, updateStatus);

module.exports = router;
