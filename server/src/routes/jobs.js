const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');
const {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  toggleActive
} = require('../controllers/jobController');

// Public route to get jobs (with filters, active only unless logged in as admin)
// Will use an optional verifier if we want to pass the token, but for now we can just 
// check if auth header exists inside getAllJobs if needed.
// Actually, let's use an optional verifyToken middleware or handle it in controller.
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

// Admin only routes
router.post('/', verifyToken, isAdmin, createJob);
router.put('/:id', verifyToken, isAdmin, updateJob);
router.delete('/:id', verifyToken, isAdmin, deleteJob);
router.patch('/:id/toggle', verifyToken, isAdmin, toggleActive);

module.exports = router;
