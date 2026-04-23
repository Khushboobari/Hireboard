import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Briefcase, Bell, UserCircle, Bookmark, ChevronDown, Sparkles, Inbox, Search } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, reset } from '../features/auth/authSlice';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, isAdmin, isRecruiter } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const isManager = isAdmin || isRecruiter;
  const { myApplications } = useSelector(state => state.application);
  const notifications = myApplications?.filter(app => app.status !== 'Applied' && app.status !== 'applied') || [];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate('/login');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      // Redirect to search results or a specific profile if it's an ID
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const navLinks = isManager 
    ? [
        { name: isAdmin ? 'Admin' : 'Recruiter', path: '/admin' },
        { name: 'Jobs', path: '/jobs' }
      ]
    : [
        { name: 'Jobs', path: '/jobs' },
        { name: 'Interview Prep', path: '/interview-prep' }
      ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 400, damping: 25 }
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95,
      filter: 'blur(10px)',
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 ${
        scrolled 
          ? 'py-3' 
          : 'py-6'
      }`}
    >
      <div className={`max-w-7xl mx-auto transition-all duration-500 flex justify-between items-center px-6 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-2xl py-3 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50' 
          : 'bg-transparent py-0'
      }`}>
        <Link 
          to="/" 
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <motion.div
            whileHover={{ rotate: -10, scale: 1.1 }}
            className="w-11 h-11 bg-gradient-to-br from-primary-600 to-indigo-600 rounded-[14px] flex items-center justify-center text-white shadow-xl shadow-primary-500/20"
          >
            <Briefcase className="w-6 h-6" />
          </motion.div>
          <span className="text-2xl font-[900] text-slate-800 tracking-tighter flex items-center">
            Hire<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Board</span>
            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full ml-1 mt-auto mb-1.5"></div>
          </span>
        </Link>
        
        <div className="flex gap-4 sm:gap-10 items-center">
          {user ? (
            <div className="flex items-center gap-10">
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative group px-5 py-2.5"
                  >
                    <span className={`text-[15px] font-black transition-all duration-300 relative z-10 ${
                      location.pathname === link.path ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-800'
                    }`}>
                      {link.name}
                    </span>
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-slate-50 rounded-2xl -z-0 border border-slate-100"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                ))}

                {!isManager && (
                  <div 
                    className="relative group px-5 py-2.5 cursor-pointer"
                    onMouseEnter={() => setShowCompanies(true)}
                    onMouseLeave={() => setShowCompanies(false)}
                  >
                    <div className={`flex items-center gap-1.5 text-[15px] font-black transition-all duration-300 ${showCompanies ? 'text-slate-800' : 'text-slate-400'}`}>
                      Companies <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${showCompanies ? 'rotate-180' : ''}`} />
                    </div>
                    <AnimatePresence>
                      {showCompanies && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute left-1/2 -translate-x-1/2 mt-4 w-[540px] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[32px] p-8 grid grid-cols-3 gap-8 overflow-hidden z-50"
                        >
                          {/* Categories */}
                          {[
                            { title: 'Top Tech', color: 'text-primary-600', bg: 'bg-primary-50', items: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'] },
                            { title: 'Indian Tech', color: 'text-indigo-600', bg: 'bg-indigo-50', items: ['TCS', 'Infosys', 'Wipro', 'Flipkart', 'Zomato'] },
                            { title: 'Startups', color: 'text-emerald-600', bg: 'bg-emerald-50', items: ['Swiggy', 'Razorpay', 'CRED'] }
                          ].map((cat, idx) => (
                            <div key={idx}>
                              <h4 className={`text-[11px] font-black uppercase tracking-[0.2em] mb-4 px-2 ${cat.color}`}>{cat.title}</h4>
                              <div className="flex flex-col gap-1.5">
                                {cat.items.map(name => (
                                  <Link 
                                    key={name} 
                                    to={`/companies/${name.toLowerCase()}`} 
                                    className={`px-3 py-2 text-[15px] font-bold text-slate-500 rounded-xl transition-all hover:pl-5 hover:bg-slate-50 hover:text-slate-800`}
                                  >
                                    {name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}

                          <div className="col-span-3 mt-4 pt-5 border-t border-slate-50 flex justify-between items-center">
                            <Link to="/companies" className="px-4 py-2 bg-slate-50 text-sm font-black text-slate-800 rounded-full hover:bg-slate-100 transition-all flex items-center gap-2">
                              Explore All Directory <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            </Link>
                            <Link to="/jobs" className="text-sm font-black text-slate-400 hover:text-primary-600 transition-all">
                              Top Hiring Now 🔥
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {/* Search Toggle */}
                <div className="relative flex items-center">
                  <AnimatePresence>
                    {showSearch && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 220, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={handleSearch}
                          placeholder="Search Student ID or Job..."
                          autoFocus
                          className="bg-slate-50 border border-slate-100 rounded-full px-4 py-1.5 text-sm font-bold text-slate-800 outline-none focus:border-primary-300 w-full ml-2"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSearch(!showSearch)}
                    className={`p-2.5 transition-colors ${showSearch ? 'text-primary-600 bg-primary-50 rounded-full' : 'text-slate-400 hover:text-slate-800'}`}
                  >
                    <Search className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Notifications */}
                <div className="relative">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNotifs(!showNotifs)} 
                    className={`relative p-2.5 rounded-full transition-all duration-300 ${showNotifs ? 'bg-primary-50 text-primary-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-800'}`}
                  >
                    <Bell className="w-5 h-5" />
                    <AnimatePresence>
                      {notifications.length > 0 && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                  
                  <AnimatePresence>
                    {showNotifs && (
                      <motion.div 
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-5 w-80 bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[28px] overflow-hidden z-50"
                      >
                        <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-50 flex justify-between items-center">
                          <span className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
                             <Inbox className="w-4 h-4 text-primary-500" /> Notifications
                          </span>
                          <span className="bg-primary-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black">{notifications.length}</span>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.map((app, i) => (
                            <div key={i} className="px-6 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
                              <p className="text-[15px] text-slate-500 leading-tight group-hover:text-slate-700 transition-colors">
                                Your application for <span className="font-black text-slate-800">{app.jobId?.title || 'Role'}</span> updated to <span className="font-black text-primary-600 uppercase text-[11px] bg-primary-50 px-1.5 py-0.5 rounded ml-1">{app.status}</span>
                              </p>
                            </div>
                          ))}
                          {notifications.length === 0 && (
                            <div className="px-6 py-12 text-center flex flex-col items-center gap-4">
                              <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                                <Inbox className="w-7 h-7" />
                              </div>
                              <p className="text-slate-400 text-base font-bold">No new updates yet.</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile menu */}
                <div 
                  className="relative ml-2"
                  onMouseEnter={() => setShowProfile(true)}
                  onMouseLeave={() => setShowProfile(false)}
                >
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center gap-3 p-1.5 pl-4 pr-1.5 border transition-all duration-300 rounded-full bg-white outline-none ${
                      showProfile ? 'border-primary-200 shadow-lg shadow-primary-500/5' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{user?.role || 'Member'}</p>
                      <p className="text-sm font-black text-slate-800 leading-none">{user?.name?.split(' ')[0] || 'Member'}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-white shadow-sm flex items-center justify-center text-slate-500 overflow-hidden">
                       {user?.profilePicture ? (
                         <img src={user.profilePicture} alt="" className="w-full h-full object-cover" />
                       ) : (
                         <UserCircle className="w-7 h-7" />
                       )}
                    </div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {showProfile && (
                      <motion.div 
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[28px] flex flex-col py-3 overflow-hidden z-50"
                      >
                        <div className="px-6 py-4 border-b border-slate-50 mb-2">
                          <p className="text-[11px] font-black text-primary-600 uppercase tracking-[0.2em] mb-1">Authenticated Account</p>
                          <p className="text-[15px] font-black text-slate-800 truncate leading-tight">{user.name}</p>
                          <p className="text-xs font-bold text-slate-400 truncate">{user.email}</p>
                        </div>
                        <Link to="/profile" className="px-6 py-3.5 text-[15px] font-bold text-slate-500 hover:bg-slate-50 hover:text-primary-600 flex items-center gap-3 transition-all">
                          <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-primary-50 transition-colors"><UserCircle className="w-5 h-5"/></div> My Profile
                        </Link>
                        {!isManager && (
                          <>
                            <Link to="/saved-jobs" className="px-6 py-3.5 text-[15px] font-bold text-slate-500 hover:bg-slate-50 hover:text-primary-600 flex items-center gap-3 transition-all">
                               <div className="p-1.5 bg-slate-50 rounded-lg"><Bookmark className="w-5 h-5"/></div> Saved Jobs
                            </Link>
                            <Link to="/my-applications" className="px-6 py-3.5 text-[15px] font-bold text-slate-500 hover:bg-slate-50 hover:text-primary-600 flex items-center gap-3 transition-all">
                               <div className="p-1.5 bg-slate-50 rounded-lg"><Briefcase className="w-5 h-5"/></div> My Applications
                            </Link>
                          </>
                        )}
                        <div className="mt-3 pt-3 border-t border-slate-50">
                          <button 
                            onClick={onLogout} 
                            className="px-6 py-3.5 text-[15px] font-bold text-rose-500 hover:bg-rose-50 flex items-center gap-3 transition-all w-full text-left"
                          >
                            <div className="p-1.5 bg-rose-50 rounded-lg"><LogOut className="w-5 h-5" /></div> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="font-black text-slate-500 hover:text-slate-800 transition-colors px-4 py-2 text-[15px] uppercase tracking-widest">Login</Link>
              <Link to="/register" className="bg-slate-900 text-white shadow-xl shadow-slate-200 text-[15px] font-black py-3 px-8 rounded-2xl hover:bg-primary-600 hover:shadow-primary-200 transition-all active:scale-95">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

