import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../features/jobs/jobSlice';
import { MapPin, Calendar, Building2, Clock, ChevronLeft } from 'lucide-react';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [job, setJob] = useState(null);

  const { listings } = useSelector(state => state.job);

  useEffect(() => {
    if (listings.length === 0) {
      dispatch(fetchJobs());
    } else {
      const foundJob = listings.find(j => j._id === id);
      setJob(foundJob);
    }
  }, [listings, id, dispatch]);

  if (!job) return <div className="text-center p-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-slate-500 hover:text-primary-600 mb-6 font-medium transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Listings
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="border-b border-slate-100 p-8 bg-slate-50/50">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                  {job.type}
                </span>
                <h1 className="text-3xl font-extrabold text-slate-900 drop-shadow-sm">{job.title}</h1>
                <p className="text-xl text-slate-600 mt-2 flex items-center gap-2">
                  <Building2 className="w-5 h-5" /> {job.company}
                </p>
              </div>
              <button 
                onClick={() => navigate(`/jobs/${job._id}/apply`)}
                className="btn-primary py-3 px-8 text-lg w-full md:w-auto hover:-translate-y-1 duration-300 shadow-md shadow-primary-500/30"
              >
                Apply Now
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-5 h-5 text-slate-400" />
                <span className="font-medium">{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-5 h-5 text-slate-400" />
                <span className="font-medium">Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                 <Clock className="w-5 h-5 text-slate-400" />
                 <span className="font-medium">Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Job Description</h3>
            <div className="prose max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default JobDetail;
