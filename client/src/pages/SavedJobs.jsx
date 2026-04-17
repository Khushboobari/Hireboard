import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSavedJobs } from '../features/student/studentSlice';
import JobCard from '../components/JobCard';
import Navbar from '../components/Navbar';
import { Heart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SavedJobs = () => {
  const dispatch = useDispatch();
  const { savedJobs, isLoading } = useSelector(state => state.student);

  useEffect(() => {
    dispatch(fetchSavedJobs());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" /> Saved Jobs
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Keep track of the opportunities you are interested in.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          </div>
        ) : savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map(job => (
              <JobCard key={job._id} job={job} role="student" />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <Heart className="w-8 h-8 text-rose-300" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">No saved jobs yet</h3>
            <p className="text-slate-500 mt-2 mb-6">Explore the job board and click the heart icon to save jobs here.</p>
            <Link to="/jobs" className="btn-primary py-2 px-6">Explore Jobs</Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedJobs;
