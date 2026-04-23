import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../features/jobs/jobSlice';
import { fetchMyApplications } from '../features/applications/applicationSlice';
import { 
  MapPin, 
  Calendar, 
  Building2, 
  Clock, 
  ChevronLeft, 
  Briefcase, 
  CheckCircle, 
  Info,
  ExternalLink,
  Target,
  Users
} from 'lucide-react';
import ResumeMatcher from '../components/ResumeMatcher';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [job, setJob] = useState(null);

  const { listings } = useSelector(state => state.job);
  const { myApplications } = useSelector(state => state.application);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (listings.length === 0) {
      dispatch(fetchJobs());
    } else {
      const foundJob = listings.find(j => j._id === id);
      setJob(foundJob);
    }
    
    // Fetch applications if logged in as student to check status
    if (user && user.role === 'student' && myApplications.length === 0) {
       dispatch(fetchMyApplications());
    }
  }, [listings, id, dispatch, user, myApplications.length]);

  // Check if user has already applied to this job
  const application = myApplications.find(app => (app.jobId?._id || app.jobId) === id);
  const isApplied = !!application;

  const calculateDaysRemaining = (deadline) => {
    const diff = new Date(deadline) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  if (!job) return (
    <div className="min-h-screen bg-slate-50 font-sans pt-24 text-slate-900">
      <Navbar />
      <div className="flex-1 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    </div>
  );

  const daysLeft = calculateDaysRemaining(job.deadline);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-6">
           <button onClick={() => navigate('/jobs')} className="flex items-center gap-1 text-slate-500 hover:text-primary-600 font-medium transition-colors mb-4 group text-sm">
             <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Opportunities
           </button>
 
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-start gap-5">
                 <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl font-bold text-primary-600 shadow-sm">
                    {job.company.charAt(0)}
                 </div>
                 <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                        job.type === 'job' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-purple-50 text-purple-700 border-purple-100'
                      }`}>
                        {job.type}
                      </span>
                      {isApplied && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                           <CheckCircle className="w-3 h-3" /> APPLIED
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">{job.title}</h1>
                    <p className="text-lg text-slate-600 font-medium mt-1 flex items-center gap-2">
                       {job.company}
                    </p>
                 </div>
              </div>

              {isApplied ? (
                 <div className="flex flex-col items-end gap-2 text-right w-full md:w-auto">
                    <div className="px-6 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 font-bold flex items-center gap-2">
                       <CheckCircle className="w-5 h-5" /> Already Applied
                    </div>
                    <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                       Current Status: <span className={`font-bold ${
                         application.status === 'rejected' ? 'text-rose-500' : 'text-primary-600'
                       }`}>{application.status}</span>
                    </p>
                 </div>
              ) : (
                <button 
                  onClick={() => navigate(`/jobs/${job._id}/apply`)}
                  className="btn-primary py-4 px-10 text-lg w-full md:w-auto hover:-translate-y-1 transition-all shadow-xl shadow-primary-600/20 font-bold"
                >
                  Apply for this role
                </button>
              )}
           </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Quick Info Grid (Mobile Only or integrated) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:hidden">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><MapPin className="w-5 h-5"/></div>
                   <div><p className="text-xs text-slate-400 font-bold uppercase">Location</p><p className="font-bold text-slate-800">{job.city}, {job.location}</p></div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600"><Clock className="w-5 h-5"/></div>
                   <div><p className="text-xs text-slate-400 font-bold uppercase">Ends in</p><p className="font-bold text-slate-800">{daysLeft} Days</p></div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600"><Calendar className="w-5 h-5"/></div>
                   <div><p className="text-xs text-slate-400 font-bold uppercase">Posted on</p><p className="font-bold text-slate-800">{new Date(job.createdAt).toLocaleDateString()}</p></div>
                </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary-600" /> Job Overview
              </h3>
              <div className="prose max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </div>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary-600" /> Key Responsibilities
                </h3>
                <ul className="space-y-4">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                       <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0"></span>
                       <span className="text-slate-600 font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary-600" /> Requirements & Skills
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.requirements.map((req, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold border border-slate-200">
                       {req}
                    </span>
                  ))}
                </div>
                <ul className="space-y-4">
                   {job.requirements.map((item, i) => (
                     <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                        <span className="text-slate-600 font-medium leading-relaxed">{item}</span>
                     </li>
                   ))}
                </ul>
              </div>
            )}

            {/* About Company */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -z-10 opacity-50"></div>
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary-600" /> About {job.company}
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {job.aboutCompany || `Discover more about working at ${job.company}. Join a team of innovators and visionaries building the future of technology.`}
              </p>
              <div className="mt-6 flex gap-4">
                 <button className="text-primary-600 font-bold text-sm flex items-center gap-1 hover:underline">
                    Organization Profile <ExternalLink className="w-3.5 h-3.5" />
                 </button>
                 <button className="text-slate-500 font-bold text-sm flex items-center gap-1 hover:underline">
                    More jobs from this company <Briefcase className="w-3.5 h-3.5" />
                 </button>
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {!isApplied && user?.role === 'student' && (
              <ResumeMatcher jobTitle={job.title} requirements={job.requirements} />
            )}
            
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6 sticky top-24">
              <h4 className="font-extrabold text-slate-900 mb-6 text-lg">Opportunity Snapshot</h4>
              
              <div className="space-y-5">
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><MapPin className="w-5 h-5"/></div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Location</p>
                      <p className="font-extrabold text-slate-800">{job.city}, {job.location}</p>
                      {job.locationDetail && <p className="text-[10px] text-slate-500 font-medium italic mt-0.5">{job.locationDetail}</p>}
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0"><Clock className="w-5 h-5"/></div>
                    <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Application Deadline</p><p className="font-bold text-slate-800">{new Date(job.deadline).toLocaleDateString()}</p>
                    {daysLeft <= 7 && <span className="text-[10px] font-bold text-rose-500 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> Closes in {daysLeft} days!</span>}
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0"><Calendar className="w-5 h-5"/></div>
                    <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Posted Date</p><p className="font-bold text-slate-800">{new Date(job.createdAt).toLocaleDateString()}</p></div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0"><Briefcase className="w-5 h-5"/></div>
                    <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Role Type</p><p className="font-bold text-slate-800 capitalize">{job.type}</p></div>
                 </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
                  {isApplied ? (
                    <button disabled className="w-full bg-slate-100 text-slate-400 py-3.5 rounded-xl font-bold cursor-not-allowed">
                       Already Applied
                    </button>
                  ) : (
                    <button 
                       onClick={() => navigate(`/jobs/${job._id}/apply`)}
                       className="w-full bg-primary-600 hover:bg-primary-500 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-primary-600/20 transition-all active:scale-95"
                    >
                       Apply Now
                    </button>
                  )}
                  <button className="w-full bg-white border-2 border-slate-100 text-slate-600 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all">
                    Save this job
                  </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
                 <p className="text-xs text-slate-400 font-medium">Share this role:</p>
                 <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center cursor-pointer hover:bg-slate-100"><Users className="w-4 h-4 text-slate-400" /></div>
                    <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center cursor-pointer hover:bg-slate-100"><ExternalLink className="w-4 h-4 text-slate-400" /></div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default JobDetail;
