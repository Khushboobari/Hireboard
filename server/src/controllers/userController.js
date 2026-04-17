const User = require('../models/User');
const Job = require('../models/Job');

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, resumeLink, skills } = req.body;
    
    // We update fields except password or role manually to prevent hijacking
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          name,
          email,
          resumeLink,
          skills
        }
      },
      { new: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.toggleSavedJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const jobIndex = user.savedJobs.indexOf(jobId);
    
    if (jobIndex === -1) {
      // Not saved, so save it
      user.savedJobs.push(jobId);
    } else {
      // Already saved, so remove it
      user.savedJobs.splice(jobIndex, 1);
    }

    await user.save();
    
    res.status(200).json(user.savedJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedJobs');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.savedJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
