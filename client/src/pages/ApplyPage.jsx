import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../features/jobs/jobSlice';
import { applyToJob } from '../features/applications/applicationSlice';
import axiosInstance from '../utils/axiosInstance';
import { Sparkles, Loader2, ChevronLeft, Building2, MapPin, ExternalLink, User, Mail, Star } from 'lucide-react';

const ApplyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [job, setJob] = useState(null);
  const [coverNote, setCoverNote] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const { listings } = useSelector(state => state.job);
  const { user } = useSelector(state => state.auth);
  const { isLoading } = useSelector(state => state.application);

  useEffect(() => {
    if (listings.length === 0) {
      dispatch(fetchJobs());
    } else {
      const foundJob = listings.find(j => j._id === id);
      setJob(foundJob);
    }
  }, [listings, id, dispatch]);

  const handleGenerate = async () => {
    if (!job) return;
    try {
      setIsGenerating(true);
      const res = await axiosInstance.post('/admin/cover-note', {
        jobTitle: job.title,
        company: job.company
      });
      setCoverNote(res.data.coverNote);
    } catch (error) {
      console.error("Failed to generate cover note:", error);
      alert("Failed to connect to AI Generator");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!job) return;
    
    dispatch(applyToJob({ jobId: job._id, coverNote })).then((res) => {
      if(!res.error) {
         navigate('/my-applications');
      } else {
         alert(res.payload);
      }
    });
  };

  if (!job) return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center items-center">
        <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-slate-500 hover:text-primary-600 mb-6 font-medium transition-colors">
          <ChevronLeft className="w-4 h-4" /> Cancel Application
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Job Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
              <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
                {job.type}
              </span>
              <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-2">{job.title}</h1>
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Building2 className="w-5 h-5 text-slate-400" />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <span className="font-medium">{job.location}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-800 mb-2">About the role</h4>
                <p className="text-sm text-slate-600 line-clamp-4 leading-relaxed">{job.description}</p>
                <Link to={`/jobs/${job._id}`} target="_blank" className="text-primary-600 hover:text-primary-800 text-sm font-semibold flex items-center gap-1 mt-3">
                  View Full Details <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-800">Submit Your Application</h2>
                <p className="text-slate-500 text-sm mt-1">Review your profile details below and attach a cover note.</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                
                {/* Profile Snapshot */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-800">Your Profile Summary</h3>
                    <Link to="/profile" className="text-primary-600 hover:text-primary-800 text-sm font-medium">Edit Profile</Link>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><User className="w-3 h-3"/> Full Name</span>
                      <p className="font-medium text-slate-800">{user?.name}</p>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Mail className="w-3 h-3"/> Email</span>
                      <p className="font-medium text-slate-800">{user?.email}</p>
                    </div>
                    <div className="sm:col-span-2">
                       <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><ExternalLink className="w-3 h-3"/> Resume Link</span>
                       {user?.resumeLink ? (
                         <a href={user.resumeLink} target="_blank" rel="noreferrer" className="text-primary-600 font-medium hover:underline break-all">{user.resumeLink}</a>
                       ) : (
                         <span className="text-red-500 font-medium text-sm">No Resume explicitly linked. Please update your profile.</span>
                       )}
                    </div>
                    {user?.skills && user.skills.length > 0 && (
                      <div className="sm:col-span-2 mt-2">
                         <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1"><Star className="w-3 h-3"/> Top Skills</span>
                         <div className="flex flex-wrap gap-2">
                            {user.skills.map((skill, idx) => (
                              <span key={idx} className="bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md text-xs font-semibold">{skill}</span>
                            ))}
                         </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cover Note Section */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-bold text-slate-700">Cover Note <span className="text-rose-500">*</span></label>
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      {isGenerating ? 'Generating...' : 'AI Auto-Draft'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Explain why you're a great fit for this role. You can optionally use the AI tool to draft a template mapped to your skills.</p>
                  <textarea
                    className="input-field min-h-[200px] resize-y w-full bg-slate-50 p-4 border-slate-200 focus:bg-white leading-relaxed"
                    placeholder="Dear Hiring Manager..."
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* Submit Action */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-xs text-slate-400">By submitting, you agree to HireBoard's terms of application tracking.</p>
                  <button type="submit" disabled={isLoading} className="btn-primary py-3 px-8 flex items-center gap-2 text-lg shadow-lg shadow-primary-500/30 hover:-translate-y-1 transition-all">
                    {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ApplyPage;
