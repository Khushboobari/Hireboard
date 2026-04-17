import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Briefcase, Bell, UserCircle, Settings, Bookmark } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, reset } from '../features/auth/authSlice';

const Navbar = () => {
  const { user, isAdmin } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const { myApplications } = useSelector(state => state.application);
  const notifications = myApplications?.filter(app => app.status !== 'Applied' && app.status !== 'applied') || [];

  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
      <Link to="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl tracking-tight">
        <Briefcase className="w-6 h-6" />
        HireBoard
      </Link>
      
      <div className="flex gap-4 sm:gap-6 items-center">
        {user ? (
          <>
            {isAdmin ? (
              <Link to="/admin" className="font-medium text-slate-600 hover:text-primary-600 transition-colors">Dashboard</Link>
            ) : (
              <>
                <Link to="/dashboard" className="hidden sm:block font-medium text-slate-600 hover:text-primary-600 transition-colors">Dashboard</Link>
                <Link to="/jobs" className="hidden sm:block font-medium text-slate-600 hover:text-primary-600 transition-colors">Jobs</Link>
                
                {/* Notifications */}
                <div className="relative">
                  <button onClick={() => {setShowNotifs(!showNotifs); setShowProfileMenu(false);}} className="relative p-2 text-slate-500 hover:text-primary-600 transition-colors rounded-full hover:bg-slate-100">
                    <Bell className="w-5 h-5" />
                    {notifications.length > 0 && <span className="absolute top-1 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>}
                  </button>
                  {showNotifs && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-100 shadow-xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 font-bold text-slate-700">Notifications ({notifications.length})</div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((app, i) => (
                          <div key={i} className="px-4 py-3 border-b border-slate-50 text-sm">
                            <span className="font-semibold text-slate-800">{app.jobId?.title || 'Job'}</span> application updated to <span className="font-bold text-primary-600 capitalize">{app.status}</span>.
                          </div>
                        ))}
                        {notifications.length === 0 && <div className="px-4 py-6 text-center text-slate-500 text-sm">No new notifications.</div>}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile menu */}
                <div className="relative">
                  <button onClick={() => {setShowProfileMenu(!showProfileMenu); setShowNotifs(false);}} className="flex items-center gap-2 p-1.5 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
                     <UserCircle className="w-6 h-6 text-slate-400" />
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 flex flex-col py-2">
                      <Link to="/profile" className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2"><Settings className="w-4 h-4"/> Profile Settings</Link>
                      <Link to="/saved-jobs" className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2"><Bookmark className="w-4 h-4"/> Saved Jobs</Link>
                      <Link to="/applications" className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2"><Briefcase className="w-4 h-4"/> Applications</Link>
                      <div className="border-t border-slate-100 my-1"></div>
                      <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 w-full text-left">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {isAdmin && (
              <button onClick={onLogout} className="flex items-center gap-2 text-red-600 font-medium hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="font-medium text-slate-600 hover:text-primary-600 transition-colors px-4 py-2">Log In</Link>
            <Link to="/register" className="btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
