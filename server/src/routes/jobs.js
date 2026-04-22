const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const isRecruiterOrAdmin = require('../middleware/isRecruiterOrAdmin');
const {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  toggleActive
} = require('../controllers/jobController');

const optionalVerifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const jwt = require('jsonwebtoken');
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (!err) req.user = user;
      next();
    });
  } else {
    next();
  }
};

router.get('/', optionalVerifyToken, getAllJobs);

// Management routes (Recruiter or Admin)
router.post('/', verifyToken, isRecruiterOrAdmin, createJob);
router.put('/:id', verifyToken, isRecruiterOrAdmin, updateJob);
router.delete('/:id', verifyToken, isRecruiterOrAdmin, deleteJob);
router.patch('/:id/toggle', verifyToken, isRecruiterOrAdmin, toggleActive);

module.exports = router;
