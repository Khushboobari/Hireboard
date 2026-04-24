import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Briefcase, Sparkles, Target, ArrowRight, ShieldCheck, Users, Zap, CheckCircle, TrendingUp, Award, MessageSquare, Search, Layout, Database, Layers, BarChart, GraduationCap, Github, Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../features/jobs/jobSlice';
import JobCard from '../components/JobCard';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listings, isLoading } = useSelector(state => state.job);
  const [activeCategory, setActiveCategory] = useState('Frontend Developer');
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate('/jobs', { state: { search: heroSearch } });
    }
  };

  useEffect(() => {
    dispatch(fetchJobs({ isDeadlineActive: true }));
  }, [dispatch]);

  const topCompaniesMock = [
    { name: 'Google', logo: 'G', desc: 'Search and innovation' },
    { name: 'Meta', logo: 'M', desc: 'Connecting the world' },
    { name: 'Amazon', logo: 'A', desc: 'E-commerce & Cloud' },
    { name: 'Microsoft', logo: 'MS', desc: 'Empowering everyone' }
  ];
  
  const uniqueCompanies = Array.from(new Set(listings.map(j => j.company)));
  const displayCompanies = uniqueCompanies.length >= 4 
    ? uniqueCompanies.slice(0, 8).map(c => ({
        name: c,
        logo: c.charAt(0).toUpperCase(),
        desc: 'Hiring actively on our platform.'
      }))
    : topCompaniesMock;

  const categories = [
    { name: 'Frontend Developer', icon: Layout, color: 'text-blue-600' },
    { name: 'Backend Developer', icon: Database, color: 'text-emerald-600' },
    { name: 'Full Stack', icon: Layers, color: 'text-purple-600' },
    { name: 'Data Science', icon: BarChart, color: 'text-amber-600' },
    { name: 'Internship', icon: GraduationCap, color: 'text-rose-600' }
  ];
  
  const categorizedJobs = listings.filter(job => {
    if (activeCategory === 'Internship') {
       return job.type === 'internship';
    }
    return job.title.toLowerCase().includes(activeCategory.toLowerCase()) || 
           job.description.toLowerCase().includes(activeCategory.toLowerCase());
  }).slice(0, 3); // show 3 top jobs

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 lg:px-8">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100 via-slate-50 to-slate-50"></div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 lg:top-20 left-10 w-64 h-64 lg:w-96 lg:h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-10 lg:top-20 right-10 w-64 h-64 lg:w-96 lg:h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-20 left-1/2 w-64 h-64 lg:w-96 lg:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 transform -translate-x-1/2"
          ></motion.div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-semibold mb-8 backdrop-blur-md border border-primary-200"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Empowered by AI. Build for Campuses.</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Land your next big <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
              opportunity, faster.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10"
          >
            HireBoard connects ambitious students with top employers. Supercharge your applications with AI-generated cover notes and track your statuses in real-time.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <form onSubmit={handleHeroSearch} className="relative group mb-8">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Search for roles like 'Frontend', 'Meta', or 'Remote'..."
                className="w-full pl-14 pr-32 py-5 rounded-2xl bg-white shadow-2xl shadow-primary-900/10 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-300 transition-all text-lg"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-2 bottom-2 px-6 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20 active:scale-95 flex items-center gap-2"
              >
                Search <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="btn-primary py-4 px-8 text-lg flex items-center justify-center gap-2 hover:-translate-y-1 transition-transform group">
                Join Now
              </Link>
              <Link to="/jobs" className="btn-secondary py-4 px-8 text-lg flex items-center justify-center gap-2 bg-white/50 backdrop-blur-sm">
                Explore Jobs
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Floating Elements */}
        <motion.div 
           animate={{ y: [0, -15, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="hidden lg:flex absolute top-40 left-[10%] bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex-col gap-2 items-center"
        >
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-5 h-5"/>
          </div>
          <span className="text-xs font-bold text-slate-700">Verified Jobs</span>
        </motion.div>

        <motion.div 
           animate={{ y: [0, 15, 0] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="hidden lg:flex absolute top-60 right-[10%] bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex-col gap-2 items-center"
        >
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
            <Zap className="w-5 h-5"/>
          </div>
          <span className="text-xs font-bold text-slate-700">Smart Apply</span>
        </motion.div>
      </section>

      {/* Top Companies */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Top Companies Hiring</h2>
             <p className="text-slate-500 max-w-xl mx-auto">Discover roles at leading tech companies.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayCompanies.map((company, idx) => {
              const colors = [
                'bg-blue-50 text-blue-600',
                'bg-purple-50 text-purple-600',
                'bg-emerald-50 text-emerald-600',
                'bg-rose-50 text-rose-600',
                'bg-amber-50 text-amber-600',
                'bg-indigo-50 text-indigo-600'
              ];
              const colorClass = colors[idx % colors.length];
              
              return (
                <div key={idx} className="card p-6 flex flex-col items-center text-center group hover:border-primary-200 hover:-translate-y-2 transition-all duration-300 bg-white/50 backdrop-blur-sm">
                  <div className={`w-16 h-16 rounded-2xl ${colorClass} text-2xl font-bold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner`}>
                    {company.logo}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">{company.name}</h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-1">{company.desc}</p>
                  <button 
                    onClick={() => navigate('/jobs', { state: { search: company.name } })}
                    className="text-primary-600 font-bold text-sm flex items-center justify-center gap-1 group/btn"
                  >
                    View Jobs <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Discover by Category</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Find the perfect role by browsing through specialized categories.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-7 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat.name 
                    ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/30 -translate-y-1' 
                    : 'bg-white text-slate-600 border border-slate-100 hover:border-primary-200 hover:text-primary-600 hover:bg-white hover:shadow-lg'
                }`}
              >
                <cat.icon className={`w-4 h-4 ${activeCategory === cat.name ? 'text-white' : cat.color}`} />
                {cat.name}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="text-center text-slate-500 py-10">Loading jobs...</div>
          ) : categorizedJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedJobs.map(job => (
                 <JobCard key={job._id} job={job} role="student" />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-100">
               <h3 className="text-lg font-semibold text-slate-700">No jobs found in this category</h3>
               <p className="text-slate-500 mt-2">Try another category or browse all jobs.</p>
            </div>
          )}

          <div className="text-center mt-12">
             <button 
                onClick={() => navigate('/jobs', { state: activeCategory === 'Internship' ? { type: 'internship' } : { search: activeCategory } })} 
                className="btn-secondary py-3 px-8 inline-flex items-center gap-2"
             >
               View All {activeCategory} Roles <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 font-bold text-xs uppercase tracking-wide mb-3">
                <Sparkles className="w-3 h-3" /> Featured
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Recommended Jobs</h2>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center text-slate-500 py-10">Loading jobs...</div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
              {listings.slice(0, 6).map(job => (
                 <div key={job._id} className="relative group flex flex-col h-full">
                    <div className="absolute -top-3 -right-3 z-20">
                      <span className="bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm">
                        Hot
                      </span>
                    </div>
                    <JobCard job={job} role="student" />
                 </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-100">
               <p className="text-slate-500">More featured jobs coming soon.</p>
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <Link 
              to="/jobs" 
              className="px-10 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black hover:bg-slate-50 transition-all shadow-sm flex items-center gap-3 active:scale-95"
            >
              View More Jobs <ArrowRight className="w-5 h-5 text-primary-500" />
            </Link>
          </div>
        </div>
      </section>



      {/* How it Works Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Get hired in 4 simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[ 
              { step: "01", title: "Create Profile", icon: Users },
              { step: "02", title: "Find Jobs", icon: Target },
              { step: "03", title: "AI Apply", icon: Sparkles },
              { step: "04", title: "Get Hired", icon: CheckCircle }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-primary-600 font-bold text-xl mb-4 border-2 border-primary-100">
                  <s.icon className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-slate-400 mb-1">STEP {s.step}</div>
                <h4 className="text-lg font-bold text-slate-800">{s.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500 to-primary-700"></div>
         <div className="max-w-6xl mx-auto px-6 relative z-10">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
             {[ 
               { label: "Active Students", value: "10K+", icon: Users },
               { label: "Companies", value: "500+", icon: Briefcase },
               { label: "Jobs Posted", value: "2.5K+", icon: TrendingUp },
               { label: "Success Rate", value: "94%", icon: Award }
             ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <stat.icon className="w-8 h-8 text-primary-200 mb-4" />
                  <div className="text-4xl md:text-5xl font-extrabold mb-2 text-white">{stat.value}</div>
                  <div className="text-primary-100 font-medium tracking-wide text-sm uppercase">{stat.label}</div>
                </motion.div>
             ))}
           </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Student Success</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Hear out from students who landed their dream internships.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
               { name: "Alex R.", role: "Software Engineer Intern at TechCorp", text: "The AI cover note feature saved me so much time. I was able to apply to 10 companies in an hour, and got 3 interviews!" },
               { name: "Priya S.", role: "Marketing Intern at StartupX", text: "HireBoard made it so easy to track my applications. Seeing my status change from 'Applied' to 'Shortlisted' was the best feeling." },
               { name: "James L.", role: "Data Analyst Full-time", text: "I found my first full-time role out of college here. The platform is sleek, fast, and straight to the point without any clutter." }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative"
              >
                <MessageSquare className="w-8 h-8 text-slate-200 absolute top-6 right-6" />
                <p className="text-slate-600 mb-6 relative z-10 leading-relaxed">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-slate-800">{t.name}</h4>
                  <p className="text-xs font-semibold text-primary-600 mt-1 uppercase tracking-wide">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-400 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to jumpstart your career?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg mb-10"
          >
            Join thousands of students connecting with top-tier companies on HireBoard today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/register" className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-400 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-xl shadow-primary-900/50 hover:-translate-y-1">
              Create Free Account <Briefcase className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Logo & Tagline */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">HireBoard</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                The leading career platform connecting top talent with industry-leading companies through intelligent matching.
              </p>
              <div className="flex items-center space-x-4">
                <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><Link to="/jobs" className="text-slate-400 hover:text-blue-400 transition-colors">Browse Jobs</Link></li>
                <li><Link to="/companies" className="text-slate-400 hover:text-blue-400 transition-colors">Companies</Link></li>
                {['Salaries', 'Interview Prep', 'Career Advice'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4">
                {['Help Center', 'Safety Center', 'Community Guidelines', 'Privacy Policy', 'Terms of Service'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold mb-6">Contact Us</h4>
              <ul className="space-y-6">
                <li className="flex items-start space-x-3 text-slate-400">
                  <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span>support@hireboard.com</span>
                </li>
                <li className="flex items-start space-x-3 text-slate-400">
                  <Phone className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span>+1 (555) 000-0000</span>
                </li>
                <li className="flex items-start space-x-3 text-slate-400">
                  <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span>123 Career Blvd, Suite 100<br />San Francisco, CA 94105</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} HireBoard. All rights reserved.
            </p>
            <div className="flex items-center space-x-8 text-sm text-slate-500 font-medium">
              <a href="#" className="hover:text-blue-400">Cookie Policy</a>
              <a href="#" className="hover:text-blue-400">Site Map</a>
              <a href="#" className="hover:text-blue-400">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
