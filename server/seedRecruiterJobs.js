require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const Job = require('./src/models/Job');
const User = require('./src/models/User');

const seedRecruiterJobs = async () => {
  try {
    await connectDB();
    
    // Find all recruiters
    const recruiters = await User.find({ role: 'recruiter' });
    
    if (recruiters.length === 0) {
      console.log('No recruiters found in the database. Please register a recruiter account first.');
      process.exit(0);
    }

    const sampleJobs = [
      {
        title: 'Senior Product Designer',
        company: 'Stripe',
        type: 'job',
        description: 'We are looking for a Senior Product Designer to lead design initiatives for our core payment products. You will work closely with engineering and product teams to deliver exceptional user experiences.',
        location: 'Remote / Global',
        city: 'San Francisco',
        locationDetail: 'Stripe HQ',
        salary: '$140,000 - $190,000 / Year',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png',
        deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        isActive: true,
        requirements: [
          '5+ years of product design experience',
          'Strong portfolio demonstrating systemic design thinking',
          'Experience with Figma and prototyping tools',
          'Excellent communication skills'
        ],
        responsibilities: [
          'Lead end-to-end design for new features',
          'Mentor junior designers',
          'Collaborate with PMs to define product strategy'
        ],
        aboutCompany: 'Stripe is a financial infrastructure platform for the internet.'
      },
      {
        title: 'Marketing Intern',
        company: 'Spotify',
        type: 'internship',
        description: 'Join our dynamic marketing team for a summer internship! You will assist in creating engaging content and analyzing campaign performance metrics.',
        location: 'Remote / US',
        city: 'New York',
        locationDetail: 'Spotify NY Office',
        salary: '$30 - $40 / Hour',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/2560px-Spotify_logo_with_text.svg.png',
        deadline: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        isActive: true,
        requirements: [
          'Currently pursuing a degree in Marketing, Communications, or related field',
          'Strong writing and storytelling skills',
          'Familiarity with social media platforms and trends'
        ],
        responsibilities: [
          'Assist in drafting copy for social media campaigns',
          'Conduct market research and competitor analysis',
          'Help organize digital marketing assets'
        ],
        aboutCompany: 'Spotify is the world’s most popular audio streaming subscription service.'
      },
      {
        title: 'DevOps Engineer',
        company: 'Netflix',
        type: 'job',
        description: 'We are seeking a talented DevOps Engineer to help scale our infrastructure and improve our deployment pipelines. You will be instrumental in ensuring the reliability of our streaming service.',
        location: 'Hybrid / California',
        city: 'Los Gatos',
        locationDetail: 'Netflix Campus',
        salary: '$160,000 - $220,000 / Year',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
        deadline: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        isActive: true,
        requirements: [
          'Experience with AWS, Docker, and Kubernetes',
          'Proficiency in Python or Go',
          'Deep understanding of CI/CD pipelines',
          'Strong troubleshooting skills'
        ],
        responsibilities: [
          'Design and maintain cloud infrastructure',
          'Automate deployment processes',
          'Monitor system performance and resolve bottlenecks'
        ],
        aboutCompany: 'Netflix is one of the world\'s leading entertainment services.'
      }
    ];

    let jobsAdded = 0;

    for (const recruiter of recruiters) {
      // Create instances of sample jobs for this recruiter
      const jobsToInsert = sampleJobs.map(job => ({
        ...job,
        postedBy: recruiter._id
      }));

      await Job.insertMany(jobsToInsert);
      jobsAdded += jobsToInsert.length;
      console.log(`Added ${jobsToInsert.length} jobs for recruiter: ${recruiter.name} (${recruiter.email})`);
    }

    console.log(`Successfully seeded ${jobsAdded} recruiter jobs in total!`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding recruiter jobs:', err);
    process.exit(1);
  }
};

seedRecruiterJobs();
