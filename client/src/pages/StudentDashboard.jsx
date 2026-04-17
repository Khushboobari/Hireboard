import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyApplications } from '../features/applications/applicationSlice';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { FileText, CheckCircle, XCircle, Briefcase, Building2, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { myApplications, isLoading } = useSelector(state => state.application);

  useEffect(() => {
    dispatch(fetchMyApplications());
  }, [dispatch]);

  const totalApplied = myApplications.length;
  const totalShortlisted = myApplications.filter(app => app.status === 'shortlisted' || app.status === 'Shortlisted').length;
  const totalRejected = myApplications.filter(app => app.status === 'rejected' || app.status === 'Rejected').length;

  const recentApplications = [...myApplications].sort((a,b) => new Date(b.appliedAt) - new Date(a.appliedAt)).slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Welcome back, {user?.name.split(' ')[0]}!</h1>
          <p className="text-slate-500 mt-2">Here is a summary of your career journey so far.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Applied" value={totalApplied} icon={FileText} colorClass="bg-blue-500" />
          <StatCard title="Shortlisted" value={totalShortlisted} icon={CheckCircle} colorClass="bg-green-500" />
          <StatCard title="Rejected" value={totalRejected} icon={XCircle} colorClass="bg-rose-500" />
        </div>

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
