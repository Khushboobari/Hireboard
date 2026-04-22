import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Briefcase, Bell, UserCircle, Settings, Bookmark, ChevronDown } from 'lucide-react';
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
  const [scrolled, setScrolled] = useState(false);
  
  const isManager = isAdmin || isRecruiter;
  const { myApplications } = useSelector(state => state.application);
  const notifications = myApplications?.filter(app => app.status !== 'Applied' && app.status !== 'applied') || [];

  // Scroll listener for navbar effects
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate('/login');
  };

  const navLinks = isManager 
    ? [
        { name: isAdmin ? 'Admin Panel' : 'Recruiter Panel', path: '/admin' },
        { name: 'Job Catalog', path: '/jobs' }
      ]
    : [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Jobs', path: '/jobs' }
      ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${
        scrolled 
          ? 'py-3 bg-white/80 backdrop-blur-lg shadow-md border-b border-slate-100' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 group cursor-pointer"
        >
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-200"
          >
            <Briefcase className="w-6 h-6" />
          </motion.div>
          <span className="text-xl font-black text-slate-800 tracking-tight">
            Hire<span className="text-primary-600">Board</span>
          </span>
        </Link>
        
        <div className="flex gap-4 sm:gap-8 items-center">
          {user ? (
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-1 relative">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-bold transition-colors ${
                      location.pathname === link.path ? 'text-primary-600' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                      />
                    )}
                  </Link>
                ))}

                {!isManager && (
                  <div 
                    className="relative"
                    onMouseEnter={() => setShowCompanies(true)}
                    onMouseLeave={() => setShowCompanies(false)}
                  >
                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                      Companies <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showCompanies ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {showCompanies && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute left-0 mt-1 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl flex flex-col py-2 overflow-hidden z-50"
                        >
                          <Link to="/jobs" state={{ search: 'Google' }} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-colors">Google Careers</Link>
                          <Link to="/jobs" state={{ search: 'Meta' }} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-colors">Meta Careers</Link>
                          <Link to="/jobs" state={{ search: 'Amazon' }} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-colors">Amazon Careers</Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
                {/* Notifications */}
                <div className="relative">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowNotifs(!showNotifs)} 
                    className={`relative p-2 rounded-full transition-colors ${showNotifs ? 'bg-primary-50 text-primary-600' : 'text-slate-500 hover:bg-slate-100'}`}
                  >
                    <Bell className="w-5 h-5" />
                    <AnimatePresence>
                      {notifications.length > 0 && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute top-1 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"
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
                        className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden z-50"
                      >
                        <div className="px-4 py-4 bg-slate-50/80 border-b border-slate-100 font-bold text-slate-700 flex justify-between items-center text-sm uppercase tracking-wider">
                          Notifications
                          <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full text-[10px]">{notifications.length} New</span>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.map((app, i) => (
                            <div key={i} className="px-4 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                              <p className="text-sm text-slate-600 leading-tight">
                                <span className="font-bold text-slate-800">
                                  {app.jobId && typeof app.jobId === 'object' ? app.jobId.title : (app.jobTitle || 'Job')}
                                </span> application updated to <span className="font-bold text-primary-600">{app.status}</span>
                              </p>
                            </div>
                          ))}
                          {notifications.length === 0 && (
                            <div className="px-4 py-10 text-center flex flex-col items-center gap-3">
                              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                <Bell className="w-6 h-6" />
                              </div>
                              <p className="text-slate-500 text-sm font-medium">No new updates yet.</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile menu */}
                <div 
                  className="relative"
                  onMouseEnter={() => setShowProfile(true)}
                  onMouseLeave={() => setShowProfile(false)}
                >
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 p-1 pl-3 pr-2 border-2 border-slate-100 rounded-full transition-all bg-white hover:border-primary-200 hover:shadow-md outline-none"
                  >
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-0.5">{user?.role || 'User'}</p>
                      <p className="text-xs font-bold text-slate-700 leading-none">{user?.name?.split(' ')[0] || 'Member'}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      <UserCircle className="w-6 h-6" />
                    </div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {showProfile && (
                      <motion.div 
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-1 w-56 bg-white border border-slate-100 shadow-2xl rounded-2xl flex flex-col py-2 overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-slate-50 mb-1">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{user.role}</p>
                          <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                        </div>
                        <Link to="/profile" className="px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary-600 flex items-center gap-3 transition-colors">
                          <Settings className="w-4 h-4"/> Profile Settings
                        </Link>
                        {!isManager && (
                          <>
                            <Link to="/saved-jobs" className="px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary-600 flex items-center gap-3 transition-colors">
                              <Bookmark className="w-4 h-4"/> Saved Jobs
                            </Link>
                            <Link to="/my-applications" className="px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary-600 flex items-center gap-3 transition-colors">
                              <Briefcase className="w-4 h-4"/> Applications
                            </Link>
                          </>
                        )}
                        <div className="border-t border-slate-50 my-1"></div>
                        <button 
                          onClick={onLogout} 
                          className="px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-3 transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="font-bold text-slate-600 hover:text-primary-600 transition-colors px-4 py-2 text-sm">Log In</Link>
              <Link to="/register" className="btn-primary shadow-lg shadow-primary-200 text-sm py-2.5 px-6">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
