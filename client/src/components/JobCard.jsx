import { Link } from 'react-router-dom';
import { MapPin, Calendar, Building2, Briefcase, Heart, Zap } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSaveJob } from '../features/student/studentSlice';

const JobCard = ({ job, role = 'student' }) => {
  const dispatch = useDispatch();
  const { savedJobs } = useSelector((state) => state.student);
  
  // Check if job is saved based on array of populated jobs or string layout
  const isSaved = savedJobs.some(sJob => (sJob._id || sJob) === job._id);

  const handleSave = (e) => {
    e.preventDefault(); // Prevent navigating to details if wrapped
    dispatch(toggleSaveJob(job._id));
  };

  return (
    <div className="card p-6 flex flex-col justify-between group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/10 hover:border-primary-100 duration-500 relative bg-white border-slate-100 h-full">
      {role === 'student' && (
        <button 
          onClick={handleSave} 
          className="absolute top-6 right-6 z-10 transition-transform hover:scale-125 active:scale-95"
        >
          <Heart className={`w-6 h-6 transition-all duration-300 ${isSaved ? 'fill-rose-500 text-rose-500 drop-shadow-sm' : 'text-slate-200 hover:text-rose-400'}`} />
        </button>
      )}
      
      <div>
        <div className="flex justify-between items-start mb-5 pr-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shrink-0 group-hover:bg-white transition-colors overflow-hidden">
               {job.logo ? (
                 <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
               ) : (
                 <span className="text-xl font-bold text-primary-600">{job.company.charAt(0)}</span>
               )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {new Date(job.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000) && (
                  <span className="animate-pulse bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <Zap className="w-2.5 h-2.5" /> NEW
                  </span>
                )}
                {role === 'admin' ? (
                  <StatusBadge status={job.isActive ? 'Active' : 'Closed'} />
                ) : (
                  <span className="px-2.5 py-0.5 bg-primary-50 text-primary-700 rounded-md text-[10px] font-bold uppercase tracking-wider border border-primary-100">
                    {job.type}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors leading-snug line-clamp-1">{job.title}</h3>
              <p className="text-slate-500 font-semibold text-sm flex items-center gap-1.5 mt-1">
                <Building2 className="w-4 h-4 text-slate-400" /> {job.company}
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed mb-6 h-10">
          {job.description}
        </p>

        <div className="grid grid-cols-2 gap-3 text-[11px] font-bold text-slate-500">
          <span className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl group-hover:bg-white group-hover:border-slate-200 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-primary-500" /> 
            <span className="truncate">{job.city}, {job.location}</span>
          </span>
          <span className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl group-hover:bg-white group-hover:border-slate-200 transition-colors">
            <Calendar className="w-3.5 h-3.5 text-amber-500" /> 
            <span className="truncate">{new Date(job.deadline).toLocaleDateString()}</span>
          </span>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Link 
          to={`/jobs/${job._id}`} 
          className="flex-1 text-center py-3.5 rounded-xl font-bold text-sm border-2 border-slate-100 text-slate-600 group-hover:border-slate-200 group-hover:bg-slate-50 transition-all duration-300 block shadow-sm"
        >
          Details
        </Link>
        {role === 'student' && (
          <Link 
            to={`/jobs/${job._id}/apply`} 
            className="flex-1 text-center py-3.5 rounded-xl font-bold text-sm bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all duration-300"
          >
            Apply Now
          </Link>
        )}
      </div>
    </div>
  );
};

export default JobCard;
