import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building2, Users, Heart, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import { companies } from '../utils/companyData';
import { motion, AnimatePresence } from 'framer-motion';

const AllCompanies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [followedCompanies, setFollowedCompanies] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('followedCompanies') || '[]');
    setFollowedCompanies(saved);
  }, []);

  const toggleFollow = (id) => {
    let updated;
    if (followedCompanies.includes(id)) {
      updated = followedCompanies.filter(cId => cId !== id);
    } else {
      updated = [...followedCompanies, id];
    }
    setFollowedCompanies(updated);
    localStorage.setItem('followedCompanies', JSON.stringify(updated));
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === '' || company.industry === industryFilter;
    const matchesSize = sizeFilter === '' || company.size === sizeFilter;
    return matchesSearch && matchesIndustry && matchesSize;
  });

  const industries = [...new Set(companies.map(c => c.industry))];
  const sizes = [...new Set(companies.map(c => c.size))];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-800 mb-4">Explore Top Companies</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">Discover your dream workplace. Research company culture, open roles, and interview tips from the best in the industry.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 mb-10 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search companies by name..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <select 
                className="pl-9 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 font-bold text-sm text-slate-700 appearance-none cursor-pointer"
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
              >
                <option value="">All Industries</option>
                {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
              </select>
            </div>

            <select 
              className="px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 font-bold text-sm text-slate-700 appearance-none cursor-pointer"
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
            >
              <option value="">All Sizes</option>
              {sizes.map(size => <option key={size} value={size}>{size}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredCompanies.map(company => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={company.id} 
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-2xl font-black text-primary-600">{company.name.charAt(0)}</span>
                  </div>
                  <button 
                    onClick={() => toggleFollow(company.id)}
                    className={`p-3 rounded-xl transition-all ${followedCompanies.includes(company.id) ? 'bg-rose-50 text-rose-500 shadow-inner' : 'bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50'}`}
                  >
                    <Heart className={`w-5 h-5 ${followedCompanies.includes(company.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <Link to={`/companies/${company.name.toLowerCase()}`}>
                  <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-primary-600 transition-colors">{company.name}</h3>
                </Link>
                <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-2">{company.tagline}</p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Building2 className="w-4 h-4" />
                    <span className="text-xs font-bold">{company.industry}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-bold">{company.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-bold">{company.size}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-primary-600 text-lg font-black">{company.stats.openJobs}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Open Jobs</span>
                  </div>
                  <Link 
                    to={`/companies/${company.name.toLowerCase()}`}
                    className="px-6 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-black hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-200 transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No companies found</h3>
            <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCompanies;
