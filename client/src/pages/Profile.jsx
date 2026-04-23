import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/auth/authSlice';
import { fetchMyApplications } from '../features/applications/applicationSlice';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { User, Mail, Link as LinkIcon, Star, Save, Loader2, Briefcase, Building2, Calendar, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading: authLoading } = useSelector(state => state.auth);
  const { myApplications, isLoading: appsLoading } = useSelector(state => state.application);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    resumeLink: user?.resumeLink || '',
    skills: user?.skills?.join(', ') || ''
  });
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    dispatch(fetchMyApplications());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
    
    const result = await dispatch(updateProfile({
      name: formData.name,
      email: formData.email,
      resumeLink: formData.resumeLink,
      skills: skillsArray
    }));

    if (!result.error) {
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  // Dashboard calculations
  const totalApplied = myApplications.length;
  const shortlisted = myApplications.filter(app => ['shortlisted', 'interview', 'offered'].includes(app.status?.toLowerCase())).length;
  const rejected = myApplications.filter(app => app.status?.toLowerCase() === 'rejected').length;
  
  const recentApplications = [...myApplications].sort((a,b) => new Date(b.appliedAt) - new Date(a.appliedAt)).slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-24 pb-12">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 space-y-8">
        
        {/* 1. TOP SECTION: PROFILE INFO */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">Personal Information</h1>
            {successMsg && <span className="text-green-600 font-semibold bg-green-50 px-4 py-1.5 rounded-full text-xs animate-in fade-in zoom-in">{successMsg}</span>}
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><User className="w-3.5 h-3.5"/> Full Name</label>
                <input 
                  type="text" name="name" 
                  value={formData.name} onChange={handleChange} 
                  required className="input-field w-full font-bold" 
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Mail className="w-3.5 h-3.5"/> Email Address</label>
                <input 
                  type="email" name="email" 
                  value={formData.email} onChange={handleChange} 
                  required className="input-field w-full bg-slate-50 font-bold text-slate-500" 
                  disabled 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><LinkIcon className="w-3.5 h-3.5"/> Resume Link</label>
                <input 
                  type="url" name="resumeLink" 
                  value={formData.resumeLink} onChange={handleChange} 
                  className="input-field w-full font-bold" 
                  placeholder="https://drive.google.com/..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Star className="w-3.5 h-3.5"/> Skills (comma separated)</label>
                <input 
                  type="text" name="skills" 
                  value={formData.skills} onChange={handleChange} 
                  className="input-field w-full font-bold" 
                  placeholder="React, Node.js, Python..."
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button type="submit" disabled={authLoading} className="btn-primary py-3 px-8 flex items-center gap-2 font-black shadow-lg shadow-primary-200">
                {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {authLoading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>

        {/* 2. DASHBOARD SECTION: STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard title="Applied Jobs" value={totalApplied} icon={FileText} colorClass="bg-blue-500" />
          <StatCard title="Shortlisted" value={shortlisted} icon={CheckCircle} colorClass="bg-emerald-500" />
          <StatCard title="Rejected" value={rejected} icon={XCircle} colorClass="bg-rose-500" />
        </div>

        {/* 3. RECENT APPLICATIONS LIST */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-slate-400"/> Recent Applications
            </h3>
            <Link to="/my-applications" className="text-primary-600 hover:text-primary-800 font-black text-xs uppercase tracking-widest">View All</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/30 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                  <th className="px-8 py-4">Job Role</th>
                  <th className="px-8 py-4">Company</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {appsLoading ? (
                  <tr><td colSpan="3" className="p-12 text-center text-slate-400 font-bold">Syncing applications...</td></tr>
                ) : recentApplications.length > 0 ? (
                  recentApplications.map(app => (
                    <tr key={app._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5 font-bold text-slate-800 group-hover:text-primary-600 transition-colors">
                        {app.jobId?.title || 'Unknown Role'}
                      </td>
                      <td className="px-8 py-5 text-slate-600 font-bold flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-300"/> {app.jobId?.company || 'N/A'}
                      </td>
                      <td className="px-8 py-5">
                        <StatusBadge status={app.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-12 text-center">
                      <p className="text-slate-400 font-bold mb-4">No applications found.</p>
                      <Link to="/jobs" className="text-primary-600 font-black text-sm uppercase border-b-2 border-primary-100 hover:border-primary-600">Start Applying</Link>
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

export default Profile;

