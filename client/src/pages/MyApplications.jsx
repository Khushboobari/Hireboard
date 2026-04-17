import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyApplications } from '../features/applications/applicationSlice';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';
import { Building2, Calendar, FileText, Loader2 } from 'lucide-react';

const MyApplications = () => {
  const dispatch = useDispatch();
  const { myApplications, isLoading } = useSelector(state => state.application);

  useEffect(() => {
    dispatch(fetchMyApplications());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Applications</h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          </div>
        ) : myApplications.length > 0 ? (
          <div className="space-y-4">
            {myApplications.map(app => (
              <div key={app._id} className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-800">{app.jobId?.title || 'Job Unavailable'}</h3>
                    <StatusBadge status={app.status} />
                  </div>
                  <p className="text-slate-600 font-medium flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> {app.jobId?.company || 'N/A'}
                  </p>
                  
                  {app.coverNote && (
                    <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-start gap-3">
                      <FileText className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-600 italic line-clamp-2">"{app.coverNote}"</p>
                    </div>
                  )}
                </div>
                
                <div className="text-left md:text-right text-sm text-slate-500 flex flex-col justify-end">
                  <span className="flex items-center md:justify-end gap-1.5"><Calendar className="w-4 h-4" /> Applied on:</span>
                  <span className="font-semibold text-slate-700 block mt-1">{new Date(app.appliedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-100 shadow-sm">
             <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
             <h3 className="text-xl font-semibold text-slate-800">No applications yet.</h3>
             <p className="text-slate-500 mt-2">Start exploring and applying for jobs!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyApplications;
