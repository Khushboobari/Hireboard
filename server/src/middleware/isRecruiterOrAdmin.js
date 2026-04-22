const isRecruiterOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'recruiter')) {
    next();
  } else {
    res.status(403).json({ message: 'You are not authorized (Recruiters and Admins only)' });
  }
};

module.exports = isRecruiterOrAdmin;
