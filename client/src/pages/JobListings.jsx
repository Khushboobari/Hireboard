import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, resetJobState } from '../features/jobs/jobSlice';
import JobCard from '../components/JobCard';
import Navbar from '../components/Navbar';
import { Search, Filter, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const JobListings = () => {
  const dispatch = useDispatch();
  const { listings, isLoading } = useSelector(state => state.job);
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [isDeadlineActive, setIsDeadlineActive] = useState(false);

  useEffect(() => {
    dispatch(fetchJobs({ search: searchTerm, type: typeFilter, location: locationFilter, isDeadlineActive }));
  }, [dispatch, typeFilter, searchTerm, locationFilter, isDeadlineActive]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Explore Opportunities</h1>
          <p className="text-slate-500 mt-2 text-lg">Find the best internships and entry-level jobs.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by title or company..." 
                className="input-field pl-10 bg-slate-50 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              <input 
                type="text" 
                placeholder="City, State, or Remote..." 
                className="input-field pl-10 bg-slate-50 w-full"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              <select 
                className="input-field pl-10 bg-slate-50 appearance-none cursor-pointer w-full"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="job">Full-time Job</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium text-sm hover:text-slate-800 transition-colors">
              <input 
                type="checkbox" 
                className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 w-4 h-4 cursor-pointer"
                checked={isDeadlineActive}
                onChange={(e) => setIsDeadlineActive(e.target.checked)}
              />
              Hide Expired Jobs
            </label>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map(job => (
              <JobCard key={job._id} job={job} role={isAdmin ? 'admin' : 'student'} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">No jobs found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobListings;
