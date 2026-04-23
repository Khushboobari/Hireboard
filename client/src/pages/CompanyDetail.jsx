import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../features/jobs/jobSlice';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import { companies } from '../utils/companyData';
import { 
  Building2, MapPin, Users, Globe, Briefcase, 
  TrendingUp, Award, Heart, CheckCircle2, 
  MessageSquare, Coffee, Zap, Loader2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CompanyDetail = () => {
  const { companyName } = useParams();
  const dispatch = useDispatch();
  const { listings, isLoading } = useSelector(state => state.job);
  const [activeTab, setActiveTab] = useState('Open Jobs');
  const [followed, setFollowed] = useState(false);

  const company = companies.find(c => c.name.toLowerCase() === companyName.toLowerCase());

  useEffect(() => {
    if (company) {
      dispatch(fetchJobs({ search: company.name }));
      const saved = JSON.parse(localStorage.getItem('followedCompanies') || '[]');
      setFollowed(saved.includes(company.id));
    }
    window.scrollTo(0, 0);
  }, [company, dispatch]);

  const toggleFollow = () => {
    const saved = JSON.parse(localStorage.getItem('followedCompanies') || '[]');
    let updated;
    if (saved.includes(company.id)) {
      updated = saved.filter(id => id !== company.id);
      setFollowed(false);
    } else {
      updated = [...saved, company.id];
      setFollowed(true);
    }
    localStorage.setItem('followedCompanies', JSON.stringify(updated));
  };

  if (!company) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center pt-24">
        <Navbar />
        <h2 className="text-2xl font-bold text-slate-800">Company not found</h2>
        <Link to="/companies" className="mt-4 text-primary-600 font-bold hover:underline">View All Companies</Link>
      </div>
    );
  }

  const tabs = ['Open Jobs', 'About', 'Culture & Perks', 'Interview Tips'];

  const tabContent = {
    'Open Jobs': (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-2 flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          </div>
        ) : listings.length > 0 ? (
          listings.map(job => <JobCard key={job._id} job={job} showLogo={true} />)
        ) : (
          <div className="col-span-2 text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Briefcase className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No open positions right now</h3>
            <p className="text-slate-500">Check back later or follow the company for updates.</p>
          </div>
        )}
      </div>
    ),
    'About': (
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
          <Building2 className="w-6 h-6 text-primary-600" /> About {company.name}
        </h3>
        <p className="text-slate-600 leading-relaxed mb-8 text-lg font-medium">{company.about}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-black text-slate-800 mb-2">Our Mission</h4>
            <p className="text-sm text-slate-500 font-medium">To provide the best experience for our customers and employees alike.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-black text-slate-800 mb-2">Our Vision</h4>
            <p className="text-sm text-slate-500 font-medium">Leading the industry through innovation and sustainable growth.</p>
          </div>
        </div>
      </div>
    ),
    'Culture & Perks': (
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-amber-500" /> Life at {company.name}
          </h3>
          <p className="text-slate-600 leading-relaxed text-lg font-medium">{company.culture}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {company.perks.split(', ').map((perk, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-4">
                {i % 3 === 0 ? <Coffee className="w-6 h-6" /> : i % 3 === 1 ? <TrendingUp className="w-6 h-6" /> : <Award className="w-6 h-6" />}
              </div>
              <h4 className="font-bold text-slate-800 text-sm">{perk}</h4>
            </div>
          ))}
        </div>
      </div>
    ),
    'Interview Tips': (
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-indigo-500" /> Nailing the Interview
        </h3>
        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 mb-8">
          <p className="text-indigo-900 font-bold leading-relaxed">{company.interviewTips}</p>
        </div>
        <div className="space-y-4">
          <h4 className="font-black text-slate-800">Common Interview Topics:</h4>
          {['Problem Solving', 'System Design', 'Behavioral Questions', 'Cultural Fit'].map((topic, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="font-bold text-slate-700">{topic}</span>
            </div>
          ))}
        </div>
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10">
            <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center p-6 shadow-2xl shadow-slate-100 border border-slate-50">
              <img src={company.logo} alt={company.name} className="max-w-full max-h-full object-contain" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">{company.name}</h1>
                {company.hiring && (
                  <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Actively Hiring
                  </span>
                )}
              </div>
              <p className="text-xl text-slate-500 font-medium mb-8 max-w-2xl leading-relaxed">{company.tagline}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                <button 
                  onClick={toggleFollow}
                  className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl font-black transition-all shadow-lg ${
                    followed 
                      ? 'bg-rose-50 text-rose-600 border-2 border-rose-100 shadow-rose-100' 
                      : 'bg-primary-600 text-white border-2 border-primary-600 shadow-primary-200 hover:scale-105 active:scale-95'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${followed ? 'fill-current' : ''}`} />
                  {followed ? 'Following Company' : 'Follow Company'}
                </button>
                <div className="flex items-center gap-4 text-slate-400 font-bold text-sm">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" /> website.com
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {company.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-10 border-t border-slate-50">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-1 text-primary-600">
                <Briefcase className="w-5 h-5" />
                <span className="text-3xl font-black">{company.stats.openJobs}</span>
              </div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Open Jobs</span>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-1 text-indigo-600">
                <Award className="w-5 h-5" />
                <span className="text-3xl font-black">{company.stats.avgPackage}</span>
              </div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Average Package</span>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-1 text-emerald-600">
                <Users className="w-5 h-5" />
                <span className="text-3xl font-black">{company.stats.internships}</span>
              </div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Internships Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-4 mb-10">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3.5 rounded-2xl font-black text-sm transition-all relative ${
                activeTab === tab 
                  ? 'bg-slate-800 text-white shadow-xl shadow-slate-200' 
                  : 'bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-100'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="tab-active" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary-500 rounded-full"></motion.div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tabContent[activeTab]}
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyDetail;
