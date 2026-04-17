require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const Job = require('./src/models/Job');
const User = require('./src/models/User');
const bcrypt = require('bcryptjs');

const seedJobs = async () => {
  await connectDB();
  
  // Clear existing jobs
  await Job.deleteMany({});
  console.log('Cleared existing jobs...');

  let adminUser = await User.findOne({ role: 'admin' });
  if (!adminUser) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@hireboard.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Created admin user...');
  }

  const jobs = [
    {
      title: 'Senior Frontend Developer',
      company: 'Google',
      type: 'job',
      description: 'We are looking for a highly skilled React developer to lead our web app development team. You will be working with React, Redux, and modern web APIs.',
      location: 'Mountain View, CA / Remote',
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      isActive: true,
      postedBy: adminUser._id,
      requirements: [
        '5+ years of experience with React and Redux',
        'Strong understanding of CSS-in-JS and Tailwind CSS',
        'Experience with CI/CD pipelines',
        'Excellent problem-solving skills'
      ],
      responsibilities: [
        'Lead the development of new user-facing features',
        'Build reusable code and libraries for future use',
        'Optimize applications for maximum speed and scalability',
        'Collaborate with other team members and stakeholders'
      ],
      aboutCompany: 'Google is a global leader in technology, focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics.'
    },
    {
      title: 'Backend Node.js Engineer',
      company: 'Meta',
      type: 'job',
      description: 'Join our backend team to build scalable APIs and microservices. Must have experience with Express, MongoDB, and caching strategies.',
      location: 'Menlo Park, CA / Remote',
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      isActive: true,
      postedBy: adminUser._id,
      requirements: [
        'Proficiency in Node.js and Express',
        'Experience with MongoDB and Mongoose',
        'Knowledge of RESTful API design',
        'Understanding of scalable backend systems'
      ],
      responsibilities: [
        'Design and implement high-performance backend services',
        'Collaborate with frontend developers to integrate APIs',
        'Participate in code reviews and architectural discussions',
        'Ensure the security and reliability of backend systems'
      ],
      aboutCompany: 'Meta builds technologies that help people connect, find communities, and grow businesses.'
    },
    {
      title: 'Data Science Intern',
      company: 'Amazon',
      type: 'internship',
      description: 'Summer internship focused on machine learning models and data pipelines. Great opportunity to learn AWS SageMaker and Python ML stacks.',
      location: 'Seattle, WA',
      deadline: new Date(new Date().setDate(new Date().getDate() + 15)),
      isActive: true,
      postedBy: adminUser._id,
      requirements: [
        'Currently pursuing a degree in Computer Science or Data Science',
        'Familiarity with Python and machine learning libraries (Scikit-learn, TensorFlow)',
        'Basic understanding of SQL',
        'Excellent analytical and communication skills'
      ],
      responsibilities: [
        'Develop and evaluate machine learning models',
        'Analyze large datasets to extract meaningful insights',
        'Assist in building and maintaining data pipelines',
        'Present findings to the data science team'
      ],
      aboutCompany: 'Amazon is a multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.'
    },
    {
      title: 'Full Stack Web Developer',
      company: 'Microsoft',
      type: 'job',
      description: 'Help build the next generation of enterprise tools using React, Node.js, and Azure services.',
      location: 'Redmond, WA',
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      isActive: true,
      postedBy: adminUser._id,
      requirements: [
        'Experience with both frontend and backend development',
        'Proficiency in React and Node.js',
        'Familiarity with Cloud services (Azure, AWS)',
        'Knowledge of modern web standards and best practices'
      ],
      responsibilities: [
        'Work on both frontend and backend components',
        'Collaborate with cross-functional teams to deliver high-quality software',
        'Contribute to the design and architecture of enterprise tools',
        'Ensure robust and scalable system performance'
      ],
      aboutCompany: 'Microsoft is a global leader in software, services, devices, and solutions.'
    },
    {
      title: 'UI/UX React Frontend Intern',
      company: 'Canva',
      type: 'internship',
      description: 'Are you obsessed with user interfaces? Join us as a frontend intern building interactive and beautiful web experiences.',
      location: 'Sydney, AUS / Remote',
      deadline: new Date(new Date().setDate(new Date().getDate() + 20)),
      isActive: true,
      postedBy: adminUser._id,
      requirements: [
        'Passion for design and user experience',
        'Basic knowledge of React and CSS',
        'Portfolio demonstrating UI/UX projects',
        'Ability to work in a collaborative environment'
      ],
      responsibilities: [
        'Assist in building web components for Canva editor',
        'Work closely with designers to implement designs',
        'Participate in user research and feedback sessions',
        'Contribute to the improvement of user interfaces'
      ],
      aboutCompany: 'Canva is an online design and publishing tool with a mission to empower everyone in the world to design anything and publish anywhere.'
    }
  ];

  try {
    await Job.insertMany(jobs);
    console.log(`Successfully added ${jobs.length} detailed mock jobs.`);
    process.exit(0);
  } catch (err) {
    console.error('Error adding jobs:', err);
    process.exit(1);
  }
};

seedJobs();
