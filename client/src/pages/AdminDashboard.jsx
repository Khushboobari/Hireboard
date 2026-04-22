import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminStats, fetchJobApplicants, updateApplicationStatus, clearJobApplicants } from '../features/admin/adminSlice';
import { fetchJobs, createJob, updateJob, deleteJob, toggleJobActive } from '../features/jobs/jobSlice';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { Briefcase, Activity, FileText, ArrowLeft, Plus, Trash2, Edit, Users, LayoutDashboard, Target } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, jobApplicants, isLoading: isAdminLoading } = useSelector(state => state.admin);
  const { listings: jobs, isLoading: isJobsLoading } = useSelector(state => state.job);
  const { user, isAdmin, isRecruiter } = useAuth();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'jobs', 'applicants', 'jobForm'
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Job Form State
  const [isEditing, setIsEditing] = useState(false);
  const defaultDeadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const [formData, setFormData] = useState({ title: '', company: '', location: '', city: '', locationDetail: '', type: 'job', description: '', requirements: '', salary: '', deadline: defaultDeadline });

  useEffect(() => {
    dispatch(fetchAdminStats());
    dispatch(fetchJobs()); // For recruiters/admins, this gets their/all jobs
  }, [dispatch]);

  const handleCreateJobClick = () => {
    setIsEditing(false);
    setFormData({ title: '', company: '', location: '', city: '', locationDetail: '', type: 'job', description: '', requirements: '', salary: '', deadline: defaultDeadline });
    setActiveTab('jobForm');
  };

  const handleEditJobClick = (job) => {
    setIsEditing(true);
    setSelectedJob(job);
    setFormData({
      title: job.title, company: job.company, location: job.location, city: job.city || '', locationDetail: job.locationDetail || '', type: job.type, 
      description: job.description, requirements: job.requirements.join(', '), salary: job.salary || '',
      deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : defaultDeadline
    });
    setActiveTab('jobForm');
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      requirements: formData.requirements.split(',').map(r => r.trim()).filter(r => r)
    };
    
    if (isEditing) {
      await dispatch(updateJob({ id: selectedJob._id, jobData: submitData })).unwrap();
    } else {
      await dispatch(createJob(submitData)).unwrap();
    }
    dispatch(fetchAdminStats());
    setActiveTab('jobs');
  };

  const handleManageApplicants = (job) => {
    setSelectedJob(job);
    setActiveTab('applicants');
    dispatch(fetchJobApplicants(job._id));
  };

  const renderTabs = () => (
    <div className="flex border-b border-slate-200 mb-8 bg-white rounded-t-2xl px-6 pt-4 shadow-sm">
      <button 
        onClick={() => setActiveTab('overview')}
        className={`px-6 py-4 font-semibold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'overview' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
      >
        <LayoutDashboard className="w-5 h-5" /> {isAdmin ? 'System Overview' : 'My Overview'}
      </button>
      <button 
        onClick={() => setActiveTab('jobs')}
        className={`px-6 py-4 font-semibold flex items-center gap-2 border-b-2 transition-colors ${['jobs', 'jobForm'].includes(activeTab) ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
      >
        <Briefcase className="w-5 h-5" /> {isAdmin ? 'Manage All Jobs' : 'My Listings'}
      </button>
      {activeTab === 'applicants' && (
        <button className="px-6 py-4 font-semibold flex items-center gap-2 border-b-2 border-indigo-600 text-indigo-600">
          <Users className="w-5 h-5" /> Job Applicants
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {renderTabs()}

        {activeTab === 'overview' && stats && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Jobs" value={stats.totalJobs} icon={Briefcase} colorClass="bg-blue-500" />
              <StatCard title="Active Jobs" value={stats.activeJobs} icon={Activity} colorClass="bg-green-500" />
              <StatCard title="Total Applications" value={stats.totalApplications} icon={FileText} colorClass="bg-purple-500" />
              <StatCard title="Shortlist Rate" value={`${stats.shortlistRate}%`} icon={Target} colorClass="bg-amber-500" />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-800">{isAdmin ? 'Applications per Job' : 'My Performance'}</h3>
              </div>
              <div className="p-6 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 text-sm uppercase tracking-wider border-b border-slate-100">
                      <th className="pb-3 font-semibold">Job Title</th>
                      <th className="pb-3 font-semibold">Company</th>
                      <th className="pb-3 font-semibold text-center">Total Apps</th>
                      <th className="pb-3 font-semibold text-center text-green-600">Shortlisted</th>
                      <th className="pb-3 font-semibold text-center text-red-600">Rejected</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {stats.applicationsPerJob?.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 font-semibold text-slate-800">{item.title}</td>
                        <td className="py-4 text-slate-600">{item.company}</td>
                        <td className="py-4 text-center font-bold text-slate-700">{item.total}</td>
                        <td className="py-4 text-center text-green-600 font-semibold">{item.shortlisted}</td>
                        <td className="py-4 text-center text-red-600 font-semibold">{item.rejected}</td>
                      </tr>
                    ))}
                    {!stats.applicationsPerJob?.length && (
                      <tr><td colSpan="5" className="py-8 text-center text-slate-500">No application data available.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="px-6 py-4 flex justify-between items-center border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">{isAdmin ? 'All Job Listings' : 'My Published Jobs'}</h3>
              <button onClick={handleCreateJobClick} className="btn-primary py-2 px-4 flex items-center gap-2">
                <Plus className="w-4 h-4"/> Create Job
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-500 border-b border-slate-100 text-sm uppercase tracking-wider">
                    <th className="p-4 font-semibold">Title/Company</th>
                    <th className="p-4 font-semibold">Type</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jobs.map(job => (
                    <tr key={job._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-slate-800">{job.title}</div>
                        <div className="text-sm text-slate-500">{job.company} • {job.city}, {job.location}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold uppercase">{job.type}</span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => { dispatch(toggleJobActive(job._id)); dispatch(fetchAdminStats()); }}
                          className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${job.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-rose-100 text-rose-700 hover:bg-rose-200'}`}
                        >
                          {job.isActive ? 'ACTIVE' : 'INACTIVE'}
                        </button>
                      </td>
                      <td className="p-4 flex items-center justify-center gap-3">
                        <button onClick={() => handleManageApplicants(job)} className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm">Applicants</button>
                        <button onClick={() => handleEditJobClick(job)} className="text-slate-400 hover:text-blue-600 transition-colors"><Edit className="w-4 h-4"/></button>
                        <button onClick={() => { if(window.confirm('Delete this job?')) { dispatch(deleteJob(job._id)); dispatch(fetchAdminStats()); } }} className="text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
                      </td>
                    </tr>
                  ))}
                  {jobs.length === 0 && (
                    <tr><td colSpan="4" className="p-10 text-center text-slate-500">No jobs posted yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'jobForm' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setActiveTab('jobs')} className="text-slate-400 hover:text-slate-800"><ArrowLeft className="w-6 h-6"/></button>
              <h2 className="text-2xl font-bold text-slate-800">{isEditing ? 'Edit Job' : 'Create New Job'}</h2>
            </div>
            <form onSubmit={handleJobSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div><label className="block text-sm font-semibold mb-2">Title</label><input required className="input-field w-full" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} /></div>
                <div><label className="block text-sm font-semibold mb-2">Company</label><input required className="input-field w-full" value={formData.company} onChange={e=>setFormData({...formData, company: e.target.value})} /></div>
                <div><label className="block text-sm font-semibold mb-2">Location/Region (e.g. California, USA)</label><input required className="input-field w-full" value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} /></div>
                <div><label className="block text-sm font-semibold mb-2">City</label><input required className="input-field w-full" value={formData.city} onChange={e=>setFormData({...formData, city: e.target.value})} /></div>
                <div><label className="block text-sm font-semibold mb-2">Specific Location Detail (e.g. Office Name)</label><input className="input-field w-full" value={formData.locationDetail} onChange={e=>setFormData({...formData, locationDetail: e.target.value})} /></div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Type</label>
                  <select className="input-field w-full" value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})}>
                    <option value="job">Full-time Job</option><option value="internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Application Deadline</label>
                  <input required type="date" className="input-field w-full" value={formData.deadline} onChange={e=>setFormData({...formData, deadline: e.target.value})} />
                </div>
              </div>
              <div><label className="block text-sm font-semibold mb-2">Salary (optional)</label><input className="input-field w-full" value={formData.salary} onChange={e=>setFormData({...formData, salary: e.target.value})} /></div>
              <div><label className="block text-sm font-semibold mb-2">Description</label><textarea required rows="4" className="input-field w-full" value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} /></div>
              <div><label className="block text-sm font-semibold mb-2">Requirements (comma separated)</label><input required className="input-field w-full" value={formData.requirements} onChange={e=>setFormData({...formData, requirements: e.target.value})} /></div>
              <button type="submit" className="btn-primary w-full py-4 text-lg">{isEditing ? 'Update Job' : 'Publish Job'}</button>
            </form>
          </div>
        )}

        {activeTab === 'applicants' && selectedJob && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <button onClick={() => { setActiveTab('jobs'); dispatch(clearJobApplicants()); }} className="text-slate-400 hover:text-slate-800 bg-slate-100 p-2 rounded-full">
                <ArrowLeft className="w-5 h-5"/>
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Applicants for {selectedJob.title}</h2>
                <p className="text-slate-500">{selectedJob.company}</p>
              </div>
            </div>

            {isAdminLoading ? (
              <div className="text-center p-10 text-slate-500">Loading applicants...</div>
            ) : (
              <div className="grid gap-6">
                {jobApplicants.map(app => (
                  <div key={app._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">{app.userId.name} <StatusBadge status={app.status}/></h4>
                          <a href={`mailto:${app.userId.email}`} className="text-primary-600 hover:underline text-sm">{app.userId.email}</a>
                        </div>
                        {app.userId.resumeLink && (
                          <a href={app.userId.resumeLink} target="_blank" rel="noreferrer" className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors">
                            View Resume
                          </a>
                        )}
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-600 text-sm whitespace-pre-line leading-relaxed">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cover Note</span>
                        {app.coverNote || "No cover note provided."}
                      </div>
                    </div>
                    <div className="w-full md:w-48 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
                      <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">Update Status</label>
                      <select 
                        value={app.status} 
                        onChange={(e) => { 
                          dispatch(updateApplicationStatus({ id: app._id, status: e.target.value }));
                          dispatch(fetchAdminStats());
                        }}
                        className="input-field w-full text-sm font-semibold"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                      <div className="text-xs text-slate-400 mt-4 text-center">Applied on {new Date(app.appliedAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
                {jobApplicants.length === 0 && (
                   <div className="bg-white p-16 text-center rounded-2xl shadow-sm border border-slate-100 text-slate-500 font-medium">
                     No one has applied for this role yet.
                   </div>
                )}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
