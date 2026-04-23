require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const Job = require('./src/models/Job');
const User = require('./src/models/User');
const bcrypt = require('bcryptjs');

const companiesList = [
  'Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 
  'TCS', 'Infosys', 'Wipro', 'Flipkart', 'Zomato', 
  'Swiggy', 'Razorpay', 'CRED'
];

const roles = [
  { title: 'Frontend Developer', type: 'job' },
  { title: 'Backend Developer', type: 'job' },
  { title: 'Full Stack Developer', type: 'job' },
  { title: 'Data Analyst', type: 'job' },
  { title: 'Software Engineering Intern', type: 'internship' },
  { title: 'UI/UX Design Intern', type: 'internship' }
];

const seedJobsDetailed = async () => {
  try {
    await connectDB();
    
    // Clear existing jobs to avoid mess, or keep them if you prefer. 
    // Here we clear for a fresh "realistic" feel as requested.
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

    const allJobs = [];

    companiesList.forEach(company => {
      roles.forEach(role => {
        allJobs.push({
          title: role.title,
          company: company,
          type: role.type,
          description: `Exciting opportunity to join the ${company} team as a ${role.title}. You will be working on cutting-edge technologies and solving complex problems at scale. We are looking for passionate individuals who are eager to learn and contribute to our mission.`,
          location: company === 'Google' || company === 'Meta' || company === 'Apple' ? 'Remote / USA' : 'Remote / India',
          city: company === 'Google' ? 'Mountain View' : company === 'TCS' ? 'Mumbai' : 'Bangalore',
          locationDetail: `${company} Tech Park`,
          salary: role.type === 'internship' ? '₹40,000 - ₹80,000 / Month' : '₹12,00,000 - ₹45,00,000 / Year',
          deadline: new Date(new Date().setMonth(new Date().getMonth() + 2)),
          isActive: true,
          postedBy: adminUser._id,
          requirements: [
            'Strong understanding of Computer Science fundamentals',
            'Proficiency in at least one modern programming language',
            'Experience with React, Node.js or Python is a plus',
            'Excellent problem-solving and analytical skills'
          ],
          responsibilities: [
            'Develop and maintain scalable web applications',
            'Collaborate with cross-functional teams to define requirements',
            'Optimize applications for maximum speed and scalability',
            'Participate in code reviews and technical discussions'
          ],
          aboutCompany: `${company} is a leading global organization committed to innovation and excellence in the technology sector.`
        });
      });
    });

    await Job.insertMany(allJobs);
    console.log(`Successfully added ${allJobs.length} jobs (6 roles per ${companiesList.length} companies).`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding jobs:', err);
    process.exit(1);
  }
};

seedJobsDetailed();
