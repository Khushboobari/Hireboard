const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const isRecruiterOrAdmin = require('../middleware/isRecruiterOrAdmin');
const {
  applyToJob,
  getMyApplications,
  getJobApplicants,
  updateStatus
} = require('../controllers/applicationController');

// Student routes
router.post('/', verifyToken, applyToJob);
router.get('/mine', verifyToken, getMyApplications);

// Management routes (Recruiter or Admin)
router.get('/:jobId', verifyToken, isRecruiterOrAdmin, getJobApplicants);
router.patch('/:id/status', verifyToken, isRecruiterOrAdmin, updateStatus);

module.exports = router;
