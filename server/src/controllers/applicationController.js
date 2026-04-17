const Application = require('../models/Application');

exports.applyToJob = async (req, res) => {
  try {
    const { jobId, coverNote } = req.body;
    const userId = req.user.id;

    // The unique constraint in mongoose will natively prevent duplicates
    const newApplication = new Application({
      userId,
      jobId,
      coverNote,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already applied to this job.' });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id })
      .populate('jobId')
      .sort({ appliedAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobApplicants = async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('userId', 'name email resumeLink')
      .sort({ appliedAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('userId', 'name email').populate('jobId', 'title company');

    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
