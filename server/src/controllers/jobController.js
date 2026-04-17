const Job = require('../models/Job');

exports.getAllJobs = async (req, res) => {
  try {
    const { type, search, location, isDeadlineActive } = req.query;
    let query = { isActive: true };

    if (type) {
      query.type = type;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (isDeadlineActive === 'true') {
      query.deadline = { $gte: new Date() };
    }

    // If an admin is requesting, they might want to see all jobs, even inactive ones.
    if (req.user && req.user.role === 'admin') {
      delete query.isActive;
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 }).populate('postedBy', 'name');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const newJob = new Job({
      ...req.body,
      postedBy: req.user.id
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Job has been deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleActive = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    job.isActive = !job.isActive;
    const updatedJob = await job.save();
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
