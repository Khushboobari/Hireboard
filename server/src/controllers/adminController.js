const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User');
const Anthropic = require('@anthropic-ai/sdk');

exports.getStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const activeJobs = await Job.countDocuments({ isActive: true });
    const totalApplications = await Application.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    
    // Aggregation 1: Group by status to calculate Shortlist Rate
    const statusStats = await Application.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    let shortlistedCount = 0;
    statusStats.forEach(stat => {
      if (stat._id === 'Shortlisted') shortlistedCount = stat.count;
    });
    const shortlistRate = totalApplications > 0 
      ? Math.round((shortlistedCount / totalApplications) * 100) 
      : 0;

    // Aggregation 2: Applications per job with status breakdown
    const appPerJobAgg = await Application.aggregate([
      {
        $group: {
          _id: "$jobId",
          total: { $sum: 1 },
          shortlisted: { $sum: { $cond: [{ $eq: ["$status", "Shortlisted"] }, 1, 0] } },
          rejected: { $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] } },
          applied: { $sum: { $cond: [{ $eq: ["$status", "Applied"] }, 1, 0] } }
        }
      },
      { $sort: { total: -1 } }
    ]);

    // Populate job details
    const populatedAppsPerJob = await Job.populate(appPerJobAgg, { path: '_id', select: 'title company' });

    const applicationsPerJob = populatedAppsPerJob
      .filter(item => item && item._id) // Filter out nulls or invalid IDs
      .map(item => ({
        id: item._id?._id || 'unknown',
        title: item._id?.title || 'Unknown Job',
        company: item._id?.company || '-',
        total: item.total || 0,
        shortlisted: item.shortlisted || 0,
        rejected: item.rejected || 0,
        applied: item.applied || 0
      }));

    res.status(200).json({
      totalJobs,
      activeJobs,
      totalApplications,
      totalStudents,
      shortlistRate,
      applicationsPerJob
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.generateCoverNote = async (req, res) => {
  try {
    const { jobTitle, company, userProfile } = req.body;

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const promptText = `Generate a short, professional, and engaging cover note (max 3-4 sentences) for a student applying for the "${jobTitle}" position at "${company}". The student's relevant profile details are: ${userProfile || 'A passionate student eager to learn and contribute'}. Don't include formatting like [Date] or signature lines, just the core message.`;

    const message = await anthropic.messages.create({
      max_tokens: 200,
      temperature: 0.7,
      system: "You are a professional career coach helping students write compelling cover notes.",
      messages: [
        { role: 'user', content: promptText }
      ],
      model: 'claude-3-5-sonnet-20241022',
    });

    const coverNote = message.content[0].text;
    res.status(200).json({ coverNote });

  } catch (error) {
    console.error("Claude/AI Error:", error.message);
    
    // Fallback: Generate a professional template if AI fails
    const { jobTitle, company } = req.body;
    const userName = req.user?.name || 'Applicant';
    
    const fallbackNote = `Dear Hiring Manager,\n\nI am writing to express my strong interest in the ${jobTitle || 'position'} at ${company || 'your company'}. With my background and passion for this field, I am confident in my ability to contribute meaningfully to your team. I look forward to the opportunity to discuss my qualifications further.\n\nBest regards,\n${userName}`;
    
    res.status(200).json({ 
      coverNote: fallbackNote,
      isFallback: true,
      message: 'AI Service currently unavailable. Using professional template.' 
    });
  }
};
