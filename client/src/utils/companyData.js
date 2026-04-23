export const companyCategories = {
  topTech: {
    title: "Top Tech",
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Apple", "Netflix"]
  },
  indianCompanies: {
    title: "Indian Companies",
    companies: ["TCS", "Infosys", "Wipro", "Flipkart", "Zomato"]
  },
  startups: {
    title: "Startups",
    companies: ["Swiggy", "Razorpay", "CRED"]
  }
};

export const companies = [
  {
    id: "google",
    name: "Google",
    logo: "https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
    industry: "Internet & Technology",
    location: "Mountain View, CA",
    size: "10,000+ Employees",
    tagline: "Organizing the world's information and making it universally accessible.",
    about: "Google's mission is to organize the world's information and make it universally accessible and useful. Our company has grown a lot since it was founded in 1998, but we still believe that most of the work is ahead of us.",
    culture: "Google is known for its collaborative, innovative environment. We value curiosity and encourage our employees to think big.",
    perks: "Free meals, On-site gyms, Flexible hours, Health & Wellness programs.",
    hiring: true,
    stats: {
      openJobs: 120,
      avgPackage: "45 LPA",
      internships: 45
    },
    interviewTips: "Focus on data structures, algorithms, and system design. Be prepared for behavioral questions based on Google's core values."
  },
  {
    id: "meta",
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png",
    industry: "Social Media",
    location: "Menlo Park, CA",
    size: "10,000+ Employees",
    tagline: "Giving people the power to build community and bring the world closer together.",
    about: "Meta builds technologies that help people connect, find communities and grow businesses.",
    culture: "Move fast, be bold, and build social value.",
    perks: "Wellness stipends, Generous parental leave, Professional development.",
    hiring: true,
    stats: {
      openJobs: 85,
      avgPackage: "42 LPA",
      internships: 30
    },
    interviewTips: "Strong emphasis on coding efficiency and problem-solving. Practice whiteboard coding."
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png",
    industry: "E-commerce & Cloud",
    location: "Seattle, WA",
    size: "10,000+ Employees",
    tagline: "Earth's most customer-centric company.",
    about: "Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.",
    culture: "Customer Obsession and Ownership are at the heart of our culture.",
    perks: "Employee discounts, Competitive healthcare, 401(k) matching.",
    hiring: true,
    stats: {
      openJobs: 250,
      avgPackage: "38 LPA",
      internships: 120
    },
    interviewTips: "Prepare examples that demonstrate Amazon's 16 Leadership Principles."
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
    industry: "Software & Cloud",
    location: "Redmond, WA",
    size: "10,000+ Employees",
    tagline: "Empowering every person and every organization on the planet to achieve more.",
    about: "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.",
    culture: "Growth mindset, diversity and inclusion are our pillars.",
    perks: "Hybrid work, On-site healthcare, Fitness allowances.",
    hiring: true,
    stats: {
      openJobs: 150,
      avgPackage: "40 LPA",
      internships: 60
    },
    interviewTips: "Strong foundations in Computer Science basics and passion for technology."
  },
  {
    id: "apple",
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1665px-Apple_logo_black.svg.png",
    industry: "Consumer Electronics",
    location: "Cupertino, CA",
    size: "10,000+ Employees",
    tagline: "Think Different.",
    about: "Apple designs Macs, the best personal computers in the world, along with OS X, iLife, iWork and professional software.",
    culture: "Innovation and secrecy. We focus on details and user experience.",
    perks: "Product discounts, Stock options, Premium health plans.",
    hiring: false,
    stats: {
      openJobs: 40,
      avgPackage: "48 LPA",
      internships: 20
    },
    interviewTips: "Be ready for deep technical dives into your area of expertise."
  },
  {
    id: "netflix",
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
    industry: "Streaming & Entertainment",
    location: "Los Gatos, CA",
    size: "5,000+ Employees",
    tagline: "Entertainment that moves you.",
    about: "Netflix is the world's leading streaming entertainment service.",
    culture: "Freedom and Responsibility. We hire adults and trust them.",
    perks: "Top of market pay, Unlimited PTO, Personal choice benefits.",
    hiring: true,
    stats: { openJobs: 15, avgPackage: "60 LPA", internships: 5 },
    interviewTips: "Read the Netflix Culture Memo. It's essential."
  },
  {
    id: "flipkart",
    name: "Flipkart",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Flipkart_logo.svg/2560px-Flipkart_logo.svg.png",
    industry: "E-commerce",
    location: "Bangalore, India",
    size: "10,000+ Employees",
    tagline: "Ab Har Wish Hogi Poori.",
    about: "Flipkart is India's leading e-commerce marketplace.",
    culture: "Customer-first and Audacity are our core values.",
    perks: "Employee wellness programs, Learning stipends, Hybrid work.",
    hiring: true,
    stats: { openJobs: 60, avgPackage: "32 LPA", internships: 40 },
    interviewTips: "Focus on problem-solving for scale and system design."
  },
  {
    id: "zomato",
    name: "Zomato",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Zomato_Logo.svg/2560px-Zomato_Logo.svg.png",
    industry: "Food Delivery",
    location: "Gurugram, India",
    size: "5,000+ Employees",
    tagline: "Better food for more people.",
    about: "Zomato is a food delivery and restaurant discovery platform.",
    culture: "Fast-paced and entrepreneurial.",
    perks: "Food credits, Casual dress code, Open office culture.",
    hiring: true,
    stats: { openJobs: 30, avgPackage: "28 LPA", internships: 15 },
    interviewTips: "Demonstrate ownership and ability to work in high-growth environments."
  },
  {
    id: "swiggy",
    name: "Swiggy",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/1200px-Swiggy_logo.svg.png",
    industry: "Food & Grocery Delivery",
    location: "Bangalore, India",
    size: "5,000+ Employees",
    tagline: "Instant gratification, delivered.",
    about: "Swiggy is India's leading on-demand delivery platform.",
    culture: "Always Be Learning and Customer Obsession.",
    perks: "Remote-first options, Skill development, Health insurance.",
    hiring: true,
    stats: { openJobs: 45, avgPackage: "30 LPA", internships: 20 },
    interviewTips: "Prepare for case studies on logistics and supply chain optimization."
  },
  {
    id: "tcs",
    name: "TCS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png",
    industry: "IT Services",
    location: "Mumbai, India",
    size: "500,000+ Employees",
    tagline: "Experience certainty.",
    about: "Tata Consultancy Services is an IT services, consulting and business solutions organization.",
    culture: "Values-driven and focus on long-term relationships.",
    perks: "Job security, Global exposure, Comprehensive training.",
    hiring: true,
    stats: { openJobs: 1000, avgPackage: "12 LPA", internships: 500 },
    interviewTips: "Good communication skills and solid technical fundamentals are key."
  },
  {
    id: "infosys",
    name: "Infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/2560px-Infosys_logo.svg.png",
    industry: "IT Services",
    location: "Bangalore, India",
    size: "300,000+ Employees",
    tagline: "Navigate your next.",
    about: "Infosys is a global leader in next-generation digital services and consulting.",
    culture: "Focus on continuous learning and ethics.",
    perks: "Vibrant campus, Global projects, Health benefits.",
    hiring: true,
    stats: { openJobs: 800, avgPackage: "10 LPA", internships: 300 },
    interviewTips: "Showcase your learning agility and problem-solving skills."
  },
  {
    id: "wipro",
    name: "Wipro",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Wipro_Logo.svg/2560px-Wipro_Logo.svg.png",
    industry: "IT Services",
    location: "Bangalore, India",
    size: "200,000+ Employees",
    tagline: "Ambition Realized.",
    about: "Wipro Limited is a leading technology services and consulting company.",
    culture: "The Spirit of Wipro: Be passionate about client success, Be global and responsible.",
    perks: "Competitive pay, Learning resources, Employee support.",
    hiring: true,
    stats: { openJobs: 500, avgPackage: "9 LPA", internships: 200 },
    interviewTips: "Be prepared to discuss your projects and technical skills in detail."
  },
  {
    id: "razorpay",
    name: "Razorpay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Razorpay_logo.svg/2560px-Razorpay_logo.svg.png",
    industry: "Fintech",
    location: "Bangalore, India",
    size: "2,000+ Employees",
    tagline: "The standard for online payments in India.",
    about: "Razorpay is a converged payments solution company in India.",
    culture: "High ownership and meritocracy.",
    perks: "Generous equity, Wellness programs, Learning budget.",
    hiring: true,
    stats: { openJobs: 25, avgPackage: "35 LPA", internships: 10 },
    interviewTips: "Focus on clean code, design patterns, and understanding of payments."
  },
  {
    id: "cred",
    name: "CRED",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Cred_logo.png/220px-Cred_logo.png",
    industry: "Fintech",
    location: "Bangalore, India",
    size: "1,000+ Employees",
    tagline: "Reward yourself for being trustworthy.",
    about: "CRED is a members-only club that rewards individuals for their timely credit card bill payments.",
    culture: "Design-led and product-first thinking.",
    perks: "Mental health support, Stock options, Premium office space.",
    hiring: true,
    stats: { openJobs: 15, avgPackage: "45 LPA", internships: 5 },
    interviewTips: "Strong emphasis on product sense and design intuition."
  }
];
