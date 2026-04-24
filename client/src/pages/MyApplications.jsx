import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyApplications } from '../features/applications/applicationSlice';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';
import { Building2, Calendar, FileText, Loader2, LayoutGrid, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';

const MyApplications = () => {
  const dispatch = useDispatch();
  const { myApplications, isLoading } = useSelector(state => state.application);
  const [view, setView] = useState('kanban'); // 'list' or 'kanban'
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    dispatch(fetchMyApplications());
  }, [dispatch]);

  const columns = [
    { id: 'applied', title: 'Applied', icon: <Clock className="w-4 h-4 text-blue-500" />, color: 'bg-blue-50' }
  ];

  const getAppsByStatus = (status) => {
    if (status === 'offered') {
      return myApplications.filter(app => ['offered', 'hired', 'accepted'].includes(app.status?.toLowerCase()));
    }
    if (status === 'applied') {
      return myApplications.filter(app => !app.status || app.status.toLowerCase() === 'applied');
    }
    return myApplications.filter(app => app.status?.toLowerCase() === status);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">Application Tracker</h1>
            <p className="text-slate-500 font-medium mt-1">Manage and track your journey to your dream job.</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
            <button 
              onClick={() => setView('kanban')}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${view === 'kanban' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Kanban
            </button>
            <button 
              onClick={() => setView('list')}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${view === 'list' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              List View
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-40">
            <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
          </div>
        ) : myApplications.length > 0 ? (
          <div className="overflow-hidden">
            {view === 'kanban' ? (
              <div className="grid grid-cols-1 gap-6 items-start max-w-md mx-auto">
                {columns.map(col => {
                  const apps = getAppsByStatus(col.id);
                  return (
                    <div key={col.id} className="flex flex-col min-h-[500px]">
                      <div className={`p-4 rounded-2xl ${col.color} mb-4 flex justify-between items-center border border-white shadow-sm`}>
                        <div className="flex items-center gap-2">
                          {col.icon}
                          <span className="font-black text-slate-700 text-sm uppercase tracking-wider">{col.title}</span>
                        </div>
                        <span className="bg-white px-2.5 py-0.5 rounded-lg text-xs font-black text-slate-500 shadow-sm">{apps.length}</span>
                      </div>

                      <div className="space-y-4">
                        <AnimatePresence>
                          {apps.map(app => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={app._id}
                      onClick={() => setSelectedApp(app)}
                      className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                    >
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-500 transition-colors">
                                  <Building2 className="w-5 h-5" />
                                </div>
                                <div className="overflow-hidden">
                                  <h4 className="font-bold text-slate-800 truncate text-sm">{app.jobId?.title || 'Job Unavailable'}</h4>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{app.jobId?.company || 'N/A'}</p>
                                </div>
                              </div>
                              
                              {app.coverNote && (
                                <div className="mb-4">
                                  <p className="text-[11px] text-slate-500 italic line-clamp-2 bg-slate-50 p-2 rounded-xl border border-slate-50">"{app.coverNote}"</p>
                                </div>
                              )}

                              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-1.5 text-slate-400">
                                  <Calendar className="w-3 h-3" />
                                  <span className="text-[10px] font-bold">{new Date(app.appliedAt).toLocaleDateString()}</span>
                                </div>
                                <StatusBadge status={app.status} />
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        {apps.length === 0 && (
                          <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No Items</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {myApplications.map(app => (
                  <div key={app._id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl transition-all group">
                    <div className="flex-1 flex items-center gap-6">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-500 transition-all duration-500">
                        <Building2 className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-black text-slate-800">{app.jobId?.title || 'Job Unavailable'}</h3>
                          <StatusBadge status={app.status} />
                        </div>
                        <p className="text-slate-500 font-bold flex items-center gap-2">
                           {app.jobId?.company || 'N/A'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Applied Date</p>
                        <p className="font-bold text-slate-700 flex items-center justify-end gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" /> {new Date(app.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="h-10 w-px bg-slate-100 hidden md:block"></div>
                      <button 
                        onClick={() => setSelectedApp(app)}
                        className="bg-slate-800 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-primary-600 shadow-lg shadow-slate-200 transition-all"
                      >
                        View Application
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 max-w-2xl mx-auto">
             <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
               <FileText className="w-10 h-10 text-slate-300" />
             </div>
             <h3 className="text-2xl font-black text-slate-800 mb-3">No applications found</h3>
             <p className="text-slate-500 font-medium mb-10 px-8 text-lg leading-relaxed">It looks like you haven't started your journey yet. Explore thousands of jobs and take the first step towards your career!</p>
             <button className="btn-primary py-4 px-10 shadow-2xl shadow-primary-200 text-lg">Explore Jobs Now</button>
          </div>
        )}
      </main>
      
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[40px] p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 blur-2xl"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">{selectedApp.jobId?.title || 'Job Unavailable'}</h3>
                    <p className="text-slate-500 font-bold">{selectedApp.jobId?.company || 'N/A'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <LayoutGrid className="w-5 h-5 text-slate-400 rotate-45" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <StatusBadge status={selectedApp.status} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Applied Date</p>
                    <p className="font-bold text-slate-700 flex items-center justify-end gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-slate-400" /> {new Date(selectedApp.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Your Cover Note</p>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 relative">
                    <p className="text-slate-600 italic leading-relaxed">
                      {selectedApp.coverNote ? `"${selectedApp.coverNote}"` : 'No cover note provided.'}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link 
                    to={`/jobs/${selectedApp.jobId?._id}`}
                    className="w-full bg-slate-800 text-white py-4 rounded-2xl font-black text-center block hover:bg-primary-600 transition-all shadow-lg"
                  >
                    View Original Job Posting
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyApplications;

