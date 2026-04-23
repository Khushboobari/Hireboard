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

const companyLogos = {
  'Google': 'https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
  'Meta': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png',
  'Amazon': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png',
  'Microsoft': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png',
  'Apple': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1665px-Apple_logo_black.svg.png',
  'TCS': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png',
  'Infosys': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/2560px-Infosys_logo.svg.png',
  'Wipro': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Wipro_Logo.svg/2560px-Wipro_Logo.svg.png',
  'Flipkart': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Flipkart_logo.svg/2560px-Flipkart_logo.svg.png',
  'Zomato': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Zomato_Logo.svg/2560px-Zomato_Logo.svg.png',
  'Swiggy': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/1200px-Swiggy_logo.svg.png',
  'Razorpay': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Razorpay_logo.svg/2560px-Razorpay_logo.svg.png',
  'CRED': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Cred_logo.png/220px-Cred_logo.png'
};

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
          logo: companyLogos[company] || '',
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
