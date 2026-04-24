const Application = require('../models/Application');
const Job = require('../models/Job');

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
    const { jobId } = req.params;
    
    // Check if the requester is the one who posted the job (if not admin)
    if (req.user.role !== 'admin') {
      const job = await Job.findById(jobId);
      if (!job) return res.status(404).json({ message: 'Job not found' });
      if (job.postedBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You can only view applicants for your own jobs' });
      }
    }

    const applications = await Application.find({ jobId })
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
    const application = await Application.findById(req.params.id).populate('jobId');
    if (!application) return res.status(404).json({ message: 'Application not found' });

    // Check ownership of the job
    if (req.user.role !== 'admin' && application.jobId.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only update applicants for your own jobs' });
    }

    application.status = status.toLowerCase(); // Standardize to lowercase
    const updatedApplication = await application.save();
    
    const populated = await Application.findById(updatedApplication._id)
      .populate('userId', 'name email')
      .populate('jobId', 'title company');

    res.status(200).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
