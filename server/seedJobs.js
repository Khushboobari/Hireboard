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
      salary: '$150,000 - $220,000',
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
      salary: '$140,000 - $200,000',
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
      salary: '$8,000 / Month',
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
      title: 'AI/ML Engineering Intern',
      company: 'OpenAI',
      type: 'internship',
      description: 'Work at the forestfront of AI. Help us evaluate and fine-tune large language models for various applications.',
      location: 'San Francisco, CA',
      salary: '$10,000 / Month',
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      isActive: true,
      postedBy: adminUser._id,
      requirements: [
        'Strong background in Deep Learning and NLP',
        'Experience with PyTorch or JAX',
        'Excellent mathematical foundations',
        'Contribution to open-source ML projects is a plus'
      ],
      responsibilities: [
        'Implement and test new model architectures',
        'Benchmark model performance on standard datasets',
        'Contribute to internal research projects',
        'Collaborate with world-class AI researchers'
      ],
      aboutCompany: 'OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity.'
    },
    {
      title: 'Cloud DevOps Engineer',
      company: 'Microsoft',
      type: 'job',
      description: 'Join the Azure team to manage global infrastructure. We are looking for automation experts who love Terraform and Kubernetes.',
      location: 'Redmond, WA / Remote',
      salary: '$130,000 - $180,000',
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      isActive: true,
      postedBy: adminUser._id,
      requirements: [
        'Experience with Azure or AWS',
        'Proficiency in Terraform and Kubernetes',
        'Strong scripting skills (Bash, Python, or PowerShell)',
        'Experience with CI/CD tools'
      ],
      responsibilities: [
        'Automate infrastructure deployment and management',
        'Monitor and optimize system performance',
        'Implement security best practices in the cloud',
        'Respond to and resolve infrastructure incidents'
      ],
      aboutCompany: 'Microsoft is a global leader in software, services, devices, and solutions.'
    },
    {
      title: 'UI/UX Design Intern',
      company: 'Airbnb',
      type: 'internship',
      description: 'Help us design beautiful and intuitive experiences for travelers around the world. You will work closely with senior designers and product managers.',
      location: 'San Francisco, CA / Remote',
      salary: '$7,500 / Month',
      deadline: new Date(new Date().setDate(new Date().getDate() + 25)),
      isActive: true,
      postedBy: adminUser._id,
      requirements: [
        'Strong portfolio demonstrating UI/UX design skills',
        'Proficiency in Figma and Adobe Creative Suite',
        'Understanding of user-centered design principles',
        'Great communication and collaboration skills'
      ],
      responsibilities: [
        'Create low and high-fidelity wireframes and prototypes',
        'Conduct user research and usability testing',
        'Contribute to the Airbnb design system',
        'Present design concepts to stakeholders'
      ],
      aboutCompany: 'Airbnb is a community-based marketplace for booking and listing educational and unique accommodations around the world.'
    },
    {
      title: 'Software Development Engineer',
      company: 'Netflix',
      type: 'job',
      description: 'Help us build the streaming platform that reaches millions of users. We need someone who can handle high-concurrency systems and distributed architectures.',
      location: 'Los Gatos, CA / Remote',
      salary: '$180,000 - $250,000',
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      isActive: true,
      postedBy: adminUser._id,
      requirements: [
        'Expertise in Java, Scala, or Node.js',
        'Strong understanding of distributed systems',
        'Experience with AWS and microservices',
        'Ability to work in a fast-paced environment'
      ],
      responsibilities: [
        'Develop and maintain core streaming services',
        'Optimize system performance and reliability',
        'Design and implement scalable APIs',
        'Participate in on-call rotations for critical services'
      ],
      aboutCompany: 'Netflix is the world\'s leading streaming entertainment service with over 200 million paid memberships.'
    },
    {
      title: 'Mobile App Developer (iOS)',
      company: 'Spotify',
      type: 'job',
      description: 'Craft the best music and podcast experience on iOS. We are looking for someone who loves Swift and cares deeply about mobile performance.',
      location: 'New York, NY / Remote',
      salary: '$135,000 - $190,000',
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      isActive: true,
      postedBy: adminUser._id,
      requirements: [
        'Proficiency in Swift and Xcode',
        'Experience with SwiftUI and UIKit',
        'Understanding of mobile architecture patterns (MVVM, etc.)',
        'Knowledge of Core Data and Networking'
      ],
      responsibilities: [
        'Build and maintain features in the Spotify iOS app',
        'Collaborate with designers to implement pixel-perfect UIs',
        'Optimize app performance and responsiveness',
        'Keep up-to-date with the latest iOS technologies'
      ],
      aboutCompany: 'Spotify is a digital music, podcast, and video service that gives you access to millions of songs and other content from creators all over the world.'
    },
    {
      title: 'Cybersecurity Analyst',
      company: 'Cisco',
      type: 'job',
      description: 'Protect our customers\' networks from evolving threats. Join our security operations center and help build robust defense systems.',
      location: 'San Jose, CA',
      salary: '$110,000 - $160,000',
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      isActive: true,
      postedBy: adminUser._id,
      requirements: [
        'Knowledge of network security protocols',
        'Experience with SIEM tools and incident response',
        'Certifications like CompTIA Security+ or CISSP',
        'Strong analytical and problem-solving skills'
      ],
      responsibilities: [
        'Monitor networks for security breaches',
        'Investigate and respond to security incidents',
        'Perform vulnerability assessments and penetration testing',
        'Stay current with the latest cybersecurity trends'
      ],
      aboutCompany: 'Cisco is the worldwide leader in technology that powers the Internet.'
    },
    {
      title: 'Product Management Intern',
      company: 'Uber',
      type: 'internship',
      description: 'Work with cross-functional teams to define features that improve the Uber experience for riders and drivers.',
      location: 'San Francisco, CA',
      salary: '$8,500 / Month',
      deadline: new Date(new Date().setDate(new Date().getDate() + 30)),
      isActive: true,
      postedBy: adminUser._id,
      requirements: [
        'Strong analytical and data-driven mindset',
        'Excellent communication and leadership skills',
        'Passionate about transportation and logistics',
        'Currently pursuing an MBA or equivalent degree'
      ],
      responsibilities: [
        'Analyze user data and market trends',
        'Define product requirements and features',
        'Work with engineering and design to deliver new features',
        'Measure and report on product performance'
      ],
      aboutCompany: 'Uber is a technology platform that connects the physical and digital worlds to help make movement happen at the tap of a button.'
    },
    {
      title: 'Quality Assurance Engineer',
      company: 'Adobe',
      type: 'job',
      description: 'Ensure the quality of the world\'s best creative tools. We are looking for someone who loves breaking things and building automated tests.',
      location: 'San Jose, CA / Remote',
      salary: '$100,000 - $150,000',
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      isActive: true,
      postedBy: adminUser._id,
      requirements: [
        'Experience with automated testing tools (Selenium, Playwright)',
        'Proficiency in JavaScript or Python',
        'Understanding of QA methodologies and processes',
        'Attention to detail and passion for quality'
      ],
      responsibilities: [
        'Develop and execute automated test scripts',
        'Identify and document software defects',
        'Collaborate with developers to resolve issues',
        'Continuously improve testing processes'
      ],
      aboutCompany: 'Adobe is the global leader in digital media and digital marketing solutions.'
    },
    {
      title: 'Data Engineer',
      company: 'Tesla',
      type: 'job',
      description: 'Build the data platform that powers our autonomous driving efforts. Work with massive datasets and high-performance data pipelines.',
      location: 'Austin, TX / Remote',
      salary: '$140,000 - $210,000',
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      isActive: true,
      postedBy: adminUser._id,
      requirements: [
        'Strong proficiency in Python, SQL, and Spark',
        'Experience with Big Data technologies (Flink, Kafka, Presto)',
        'Knowledge of data warehousing principles',
        'Experience building robust data pipelines'
      ],
      responsibilities: [
        'Design and implement scalable data pipelines',
        'Manage and optimize our data infrastructure',
        'Ensure data quality and reliability',
        'Support data scientists and analysts'
      ],
      aboutCompany: 'Tesla\'s mission is to accelerate the world\'s transition to sustainable energy.'
    },
    {
      title: 'Technical Writing Intern',
      company: 'GitHub',
      type: 'internship',
      description: 'Help developers around the world by creating clear and concise documentation for GitHub features and APIs.',
      location: 'Remote',
      salary: '$6,000 / Month',
      deadline: new Date(new Date().setDate(new Date().getDate() + 20)),
      isActive: true,
      postedBy: adminUser._id,
      requirements: [
        'Excellent writing and communication skills',
        'Familiarity with Git and GitHub',
        'Basic understanding of web technologies',
        'Passionate about simplifying complex technical topics'
      ],
      responsibilities: [
        'Write and edit developer documentation',
        'Collaborate with engineering teams to understand features',
        'Gather and act on community feedback',
        'Help maintain the GitHub docs repository'
      ],
      aboutCompany: 'GitHub is where over 100 million developers shape the future of software, together.'
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
