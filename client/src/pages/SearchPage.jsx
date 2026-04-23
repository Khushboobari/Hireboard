import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, User, Briefcase, ChevronRight, Loader2, Mail, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({ users: [], jobs: [] });

  useEffect(() => {
    // Simulate API search
    setLoading(true);
    setTimeout(() => {
      // Mock results
      const mockUsers = [
        { id: 'STU123', name: 'Rahul Sharma', email: 'rahul@example.com', role: 'Student', skills: ['React', 'Node.js'] },
        { id: 'STU456', name: 'Priya Patel', email: 'priya@example.com', role: 'Student', skills: ['Python', 'Data Science'] }
      ].filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.id.toLowerCase() === query.toLowerCase());

      const mockJobs = [
        { id: 'JOB001', title: 'Frontend Developer', company: 'Google', location: 'Remote' },
        { id: 'JOB002', title: 'Backend Engineer', company: 'Meta', location: 'London' }
      ].filter(j => j.title.toLowerCase().includes(query.toLowerCase()) || j.company.toLowerCase().includes(query.toLowerCase()));

      setResults({ users: mockUsers, jobs: mockJobs });
      setLoading(false);
    }, 800);
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
            <Search className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Search Results</h1>
            <p className="text-slate-500 font-bold text-sm">Showing results for "{query}"</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
            <p className="text-slate-400 font-bold animate-pulse">Searching the database...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 flex flex-col gap-6">
              {/* Jobs Results */}
              <section>
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Jobs ({results.jobs.length})
                </h2>
                <div className="flex flex-col gap-3">
                  {results.jobs.map(job => (
                    <Link 
                      key={job.id} 
                      to={`/jobs/${job.id}`}
                      className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all group flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-black text-slate-800 group-hover:text-primary-600 transition-colors">{job.title}</h3>
                        <p className="text-sm font-bold text-slate-500">{job.company} • {job.location}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                  {results.jobs.length === 0 && <p className="text-slate-400 text-sm font-medium py-4">No jobs found matching your query.</p>}
                </div>
              </section>

              {/* User Results */}
              <section>
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" /> People ({results.users.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.users.map(u => (
                    <Link 
                      key={u.id} 
                      to={`/profile/${u.id}`}
                      className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 border border-slate-100 group-hover:bg-primary-50 group-hover:text-primary-500 transition-colors">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-black text-slate-800 group-hover:text-primary-600 transition-colors">{u.name}</h3>
                          <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest">{u.id}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {u.skills.map(s => (
                          <span key={s} className="px-2 py-0.5 bg-slate-50 text-[10px] font-bold text-slate-500 rounded-md">{s}</span>
                        ))}
                      </div>
                    </Link>
                  ))}
                  {results.users.length === 0 && <p className="text-slate-400 text-sm font-medium py-4 col-span-2">No people found with that ID or name.</p>}
                </div>
              </section>
            </div>

            {/* Sidebar / Quick Search Tips */}
            <div className="flex flex-col gap-6">
               <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[32px] text-white shadow-xl shadow-slate-200">
                  <h3 className="text-lg font-black mb-2">Search Tips</h3>
                  <p className="text-slate-400 text-sm font-bold leading-relaxed mb-6">You can search by Student ID (e.g., STU123), Email, or Job Title.</p>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                      <div className="w-6 h-6 bg-slate-800 rounded-lg flex items-center justify-center text-primary-400 font-black">1</div>
                      Search by Student ID directly
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                      <div className="w-6 h-6 bg-slate-800 rounded-lg flex items-center justify-center text-indigo-400 font-black">2</div>
                      Find companies like "Google"
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
