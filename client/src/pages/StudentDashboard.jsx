import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchJobs } from '../features/jobs/jobSlice';
import { fetchMyApplications } from '../features/applications/applicationSlice';
import JobCard from '../components/JobCard';
import StatusBadge from '../components/StatusBadge';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  ChevronRight, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight,
  Bookmark,
  Building2,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listings, isLoading: jobsLoading } = useSelector(state => state.job);
  const { myApplications, isLoading: appsLoading } = useSelector(state => state.application);
  const { user } = useSelector(state => state.auth);
  const { savedJobs } = useSelector(state => state.student);

  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  useEffect(() => {
    dispatch(fetchJobs({ isDeadlineActive: true }));
    dispatch(fetchMyApplications());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/jobs', { state: { search: searchQuery, location: locationQuery } });
  };

  const stats = [
    { label: 'Applied Jobs', value: myApplications.length, icon: Briefcase, color: 'bg-blue-500' },
    { label: 'Shortlisted', value: myApplications.filter(a => a.status === 'Shortlisted' || a.status === 'shortlisted').length, icon: CheckCircle2, color: 'bg-emerald-500' },
    { label: 'Saved Jobs', value: savedJobs.length, icon: Bookmark, color: 'bg-amber-500' },
  ];

  const recentApplications = myApplications.slice(0, 5);
  const recommendedJobs = listings.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <Navbar />
      
      {/* Search Header (Indeed Style) */}
      <div className="bg-white border-b border-slate-200 pt-28 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Hello, <span className="text-primary-600">{user?.name?.split(' ')[0]}</span>! 👋
            </h1>
            <p className="text-slate-500 font-medium mt-1">Ready for your next big opportunity?</p>
          </motion.div>

          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Job title, keywords, or company"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary-500 focus:bg-white rounded-2xl font-bold text-slate-800 outline-none transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <MapPin className="w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="City, state, or 'Remote'"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary-500 focus:bg-white rounded-2xl font-bold text-slate-800 outline-none transition-all shadow-sm"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-primary-600 hover:bg-primary-500 text-white font-black py-4 px-10 rounded-2xl shadow-lg shadow-primary-600/20 transition-all active:scale-95 whitespace-nowrap">
              Find Jobs
            </button>
          </form>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Stats & Recommendations */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Stats Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-5 group hover:shadow-md transition-all cursor-default">
                  <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg shadow-primary-500/10 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-3xl font-black text-slate-800">{stat.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Recommended Jobs */}
            <section>
              <div className="flex justify-between items-end mb-6 px-1">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" /> Recommended for you
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">Based on your profile and skills</p>
                </div>
                <Link to="/jobs" className="text-primary-600 font-bold text-sm flex items-center gap-1 group">
                  Explore all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {jobsLoading ? (
                <div className="flex justify-center py-10"><Clock className="animate-spin text-primary-500" /></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendedJobs.map(job => (
                    <JobCard key={job._id} job={job} role="student" />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Application Tracker & Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Application Tracker Summary */}
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" /> Recent Activity
                </h3>
                <Link to="/my-applications" className="text-xs font-black text-primary-600 uppercase tracking-widest hover:underline">View All</Link>
              </div>
              <div className="p-2">
                {appsLoading ? (
                   <div className="p-10 text-center text-slate-400">Loading activity...</div>
                ) : recentApplications.length > 0 ? (
                  recentApplications.map((app, i) => (
                    <Link 
                      key={i} 
                      to={`/jobs/${app.jobId?._id || app.jobId}`}
                      className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                        {(app.jobId?.company || 'C').charAt(0)}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-bold text-slate-800 text-sm truncate">{app.jobId?.title || 'Role'}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-400 font-bold uppercase truncate">{app.jobId?.company || 'Company'}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span className="text-[10px] font-black"><StatusBadge status={app.status} /></span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500 transition-colors" />
                    </Link>
                  ))
                ) : (
                  <div className="p-10 text-center text-slate-400 font-medium">No recent applications found.</div>
                )}
              </div>
            </div>

            {/* Profile Completion Card */}
            <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-bl-full -z-0 group-hover:scale-110 transition-transform"></div>
               <h4 className="text-xl font-black mb-2 relative z-10">Complete your profile</h4>
               <p className="text-slate-400 text-sm mb-6 relative z-10 leading-relaxed font-medium">Students with a complete profile are <span className="text-primary-400 font-bold">5x more likely</span> to get hired.</p>
               
               <div className="w-full bg-slate-800 rounded-full h-2.5 mb-6 relative z-10">
                 <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
               </div>
               
               <Link to="/profile" className="w-full bg-white text-slate-900 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-primary-50 transition-colors relative z-10">
                 Update Profile <ChevronRight className="w-4 h-4" />
               </Link>
            </div>

            {/* AI Career Tips */}
            <div className="bg-indigo-50 rounded-[32px] p-8 border border-indigo-100">
               <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest mb-4">
                 <Sparkles className="w-4 h-4" /> Claude's Career Tip
               </div>
               <p className="text-slate-700 font-bold leading-relaxed">
                 "Always tailor your skills section to match the job description. It helps your profile stand out to recruiters using automated filters."
               </p>
               <div className="mt-6 pt-6 border-t border-indigo-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600"><Users className="w-5 h-5"/></div>
                  <div>
                    <p className="text-xs font-black text-slate-800">Need help?</p>
                    <Link to="/interview-prep" className="text-xs font-bold text-indigo-600 hover:underline">Go to Prep Center</Link>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
