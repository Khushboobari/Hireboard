require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./src/models/Job');
const User = require('./src/models/User');

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const adminUser = await User.findOne({ role: 'admin' }) || await User.findOne({});
    if (!adminUser) {
      console.log('No users found in database to link jobs to. Please create an admin user first.');
      process.exit();
    }

    const dummyJobs = [
      {
        title: 'Frontend React Developer',
        company: 'Vercel',
        type: 'job',
        description: 'We are looking for an amazing frontend developer familiar with Next.js, React, and TailwindCSS to join our core open-source team.',
        location: 'Remote',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true,
        postedBy: adminUser._id
      },
      {
        title: 'Software Engineering Intern',
        company: 'Google',
        type: 'internship',
        description: 'Join Google as a software engineering intern this summer. You will be working heavily with Python and GO to scale our backend metrics pipeline.',
        location: 'Mountain View, CA',
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        isActive: true,
        postedBy: adminUser._id
      },
      {
        title: 'Full Stack Node.js Engineer',
        company: 'Stripe',
        type: 'job',
        description: 'Stripe is looking for a Full Stack engineer who loves Express, Node.js, and scaling APIs safely and securely for millions of payment transactions.',
        location: 'San Francisco (Hybrid)',
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), 
        isActive: true,
        postedBy: adminUser._id
      },
      {
        title: 'Product Design Intern',
        company: 'Figma',
        type: 'internship',
        description: 'Help shape the future of design. We want someone who breathes UI/UX and loves prototyping interactions.',
        location: 'Remote',
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), 
        isActive: true,
        postedBy: adminUser._id
      },
      {
        title: 'Cloud DevOps Engineer',
        company: 'Amazon Web Services',
        type: 'job',
        description: 'Manage fleets of EC2 instances and build robust CI/CD pipelines using Jenkins and Docker for AWS internal tooling.',
        location: 'Seattle, WA',
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), 
        isActive: true,
        postedBy: adminUser._id
      },
      {
        title: 'Data Science Analyst',
        company: 'Spotify',
        type: 'job',
        description: 'Analyze millions of songs and user listening habits to build the next generation of our Discover Weekly AI algorithm. Python & SQL required.',
        location: 'New York, NY',
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), 
        isActive: true,
        postedBy: adminUser._id
      }
    ];

    await Job.insertMany(dummyJobs);
    console.log('Successfully injected dummy jobs!');
    process.exit();
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedJobs();
