import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyApplications } from '../features/applications/applicationSlice';
import { fetchSavedJobs } from '../features/student/studentSlice';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { FileText, CheckCircle, UserCircle, Briefcase, Building2, Calendar, Search, Bookmark, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { myApplications, isLoading } = useSelector(state => state.application);
  const { savedJobs } = useSelector(state => state.student);

  useEffect(() => {
    dispatch(fetchMyApplications());
    dispatch(fetchSavedJobs());
  }, [dispatch]);

  const totalApplied = myApplications.length;
  const totalSaved = savedJobs?.length || 0;
  
  // Calculate profile completion
  let completionPoints = 0;
  const maxPoints = 5;
  if (user?.name) completionPoints++;
  if (user?.email) completionPoints++;
  if (user?.role) completionPoints++;
  if (user?.skills && user.skills.length > 0) completionPoints++;
  if (user?.resumeLink) completionPoints++;
  const completionPercent = Math.round((completionPoints / maxPoints) * 100);

  const recentApplications = [...myApplications].sort((a,b) => new Date(b.appliedAt) - new Date(a.appliedAt)).slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-primary-600 to-indigo-700 rounded-3xl p-8 mb-8 text-white shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold mb-2">Welcome back, {user?.name.split(' ')[0]} 👋</h1>
            <p className="text-primary-100 text-lg max-w-xl">Ready to take the next step in your career? Track your applications, expand your skills, and discover outstanding companies today.</p>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
             <Target className="w-56 h-56" />
          </div>
        </div>

        {/* QUICK ACTION CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Link to="/jobs" className="bg-white border text-center border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="mx-auto bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-800">Apply Jobs</h3>
            <p className="text-sm text-slate-500 mt-1">Discover new opportunities mapping to your skills.</p>
          </Link>
          <Link to="/jobs" className="bg-white border text-center border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="mx-auto bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-slate-800">Browse Companies</h3>
            <p className="text-sm text-slate-500 mt-1">Research top tier companies hiring right now.</p>
          </Link>
          <Link to="/applications" className="bg-white border text-center border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="mx-auto bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-800">Track Applications</h3>
            <p className="text-sm text-slate-500 mt-1">See updates from recruiters on your profile.</p>
          </Link>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Jobs Applied" value={totalApplied} icon={FileText} colorClass="bg-blue-500" />
          <StatCard title="Saved Jobs" value={totalSaved} icon={Bookmark} colorClass="bg-rose-500" />
          <StatCard title="Profile Completion" value={`${completionPercent}%`} icon={UserCircle} colorClass="bg-indigo-500" />
        </div>

        {/* RECENT APPLICATIONS */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Briefcase className="w-5 h-5 text-slate-400"/> Recently Applied Jobs</h3>
            <Link to="/applications" className="text-primary-600 hover:text-primary-800 font-semibold text-sm">View All</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white text-slate-400 text-sm uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4 font-semibold">Job Title</th>
                  <th className="p-4 font-semibold">Company</th>
                  <th className="p-4 font-semibold">Applied Date</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  <tr><td colSpan="4" className="p-8 text-center text-slate-500">Loading applications...</td></tr>
                ) : recentApplications.length > 0 ? (
                  recentApplications.map(app => (
                    <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-semibold text-slate-800">{app.jobId?.title || 'Unknown Role'}</td>
                      <td className="p-4 text-slate-600 flex items-center gap-2"><Building2 className="w-4 h-4 text-slate-400"/> {app.jobId?.company}</td>
                      <td className="p-4 text-slate-500 flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400"/> {new Date(app.appliedAt).toLocaleDateString()}</td>
                      <td className="p-4"><StatusBadge status={app.status} /></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-12 text-center">
                      <p className="text-slate-500 font-medium mb-4">You have not applied to any jobs yet.</p>
                      <Link to="/jobs" className="btn-primary py-2 px-6">Explore Jobs</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
