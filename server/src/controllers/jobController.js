const Job = require('../models/Job');

exports.getAllJobs = async (req, res) => {
  try {
    const { type, search, location, isDeadlineActive, mine } = req.query;
    let query = { isActive: true };

    if (type) {
      query.type = type;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    if (location) {
      // If $or already exists from search, we need to wrap it in an $and
      const locationQuery = {
        $or: [
          { location: { $regex: location, $options: 'i' } },
          { city: { $regex: location, $options: 'i' } }
        ]
      };
      
      if (query.$or) {
        query.$and = [
          { $or: query.$or },
          locationQuery
        ];
        delete query.$or;
      } else {
        query.$or = locationQuery.$or;
      }
    }

    if (isDeadlineActive === 'true') {
      query.deadline = { $gte: new Date() };
    }

    // Role-based filtering
    if (req.user) {
      if (req.user.role === 'admin') {
        if (mine === 'true') {
           query.postedBy = req.user.id;
        } else {
           delete query.isActive; // Admin sees all jobs
        }
      } else if (req.user.role === 'recruiter') {
        if (mine === 'true') {
           delete query.isActive; // Recruiter sees all their jobs (including inactive)
           query.postedBy = req.user.id;
        }
        // If mine is not true, recruiter sees all active jobs (default behavior)
      }
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
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Check ownership
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You can only update your own jobs' });
    }

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
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Check ownership
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You can only delete your own jobs' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Job has been deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleActive = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Check ownership
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You can only toggle your own jobs' });
    }

    job.isActive = !job.isActive;
    const updatedJob = await job.save();
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
