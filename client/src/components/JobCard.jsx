import { Link } from 'react-router-dom';
import { MapPin, Calendar, Building2, Briefcase, Heart } from 'lucide-react';
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
    <div className="card p-6 flex flex-col justify-between group hover:-translate-y-1 hover:border-primary-200 duration-300 relative">
      {role === 'student' && (
        <button 
          onClick={handleSave} 
          className="absolute top-6 right-6 z-10 transition-transform hover:scale-110"
        >
          <Heart className={`w-6 h-6 transition-colors ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-300 hover:text-rose-400'}`} />
        </button>
      )}
      
      <div>
        <div className="flex justify-between items-start mb-4 pr-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{job.title}</h3>
            <p className="text-slate-500 font-medium flex items-center gap-2 mt-1">
              <Building2 className="w-4 h-4" /> {job.company}
            </p>
          </div>
        </div>
        
        {role === 'admin' ? (
          <div className="mb-4">
             <StatusBadge status={job.isActive ? 'Active' : 'Closed'} />
          </div>
        ) : (
           <span className="px-3 py-1 mb-4 inline-block bg-primary-50 text-primary-700 rounded-full text-xs font-semibold uppercase tracking-wide">
             {job.type}
           </span>
        )}
        
        <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed mb-4">
          {job.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mt-auto">
          <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-md"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
          <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-md"><Calendar className="w-3.5 h-3.5" /> Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-6">
        <Link to={`/jobs/${job._id}`} className="btn-secondary w-full text-center block">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
