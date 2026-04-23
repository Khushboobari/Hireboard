import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, CheckCircle2, AlertCircle, Sparkles, Loader2, FileText } from 'lucide-react';

const ResumeMatcher = ({ jobTitle, requirements = [] }) => {
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeMatch = () => {
    if (!resumeText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const keywords = requirements.map(r => r.toLowerCase());
      const resumeWords = resumeText.toLowerCase();
      
      const matches = keywords.filter(kw => resumeWords.includes(kw));
      const score = Math.round((matches.length / (keywords.length || 1)) * 100);
      
      setResult({
        score,
        matches,
        missing: keywords.filter(kw => !resumeWords.includes(kw))
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-indigo-700 p-6 text-white">
        <h3 className="font-black text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> AI Resume Matcher
        </h3>
        <p className="text-primary-100 text-[10px] font-bold uppercase tracking-widest mt-1">Check how well your profile fits this role</p>
      </div>
      
      <div className="p-6">
        {!result ? (
          <div className="space-y-4">
            <div className="relative">
              <textarea 
                placeholder="Paste your resume text here to analyze..." 
                className="w-full h-32 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm font-medium resize-none"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
              <FileText className="absolute right-4 bottom-4 text-slate-300 w-5 h-5" />
            </div>
            
            <button 
              onClick={analyzeMatch}
              disabled={isAnalyzing || !resumeText.trim()}
              className="w-full py-3.5 bg-slate-800 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isAnalyzing ? (
                <> <Loader2 className="w-4 h-4 animate-spin" /> Analyzing Profile... </>
              ) : (
                <> <Target className="w-4 h-4" /> Analyze Match Score </>
              )}
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 flex items-center justify-center mb-2">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-100"
                  />
                  <motion.circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * result.score) / 100 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-primary-600"
                  />
                </svg>
                <span className="absolute text-2xl font-black text-slate-800">{result.score}%</span>
              </div>
              <p className="font-black text-slate-800 text-sm">Resume Match Score</p>
            </div>

            <div className="space-y-4">
              {result.matches.length > 0 && (
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Matching Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matches.slice(0, 5).map(m => (
                      <span key={m} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-md border border-emerald-100 capitalize">{m}</span>
                    ))}
                    {result.matches.length > 5 && <span className="text-[10px] font-bold text-slate-400">+{result.matches.length - 5} more</span>}
                  </div>
                </div>
              )}

              {result.missing.length > 0 && (
                <div>
                  <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Skills to Add
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missing.slice(0, 5).map(m => (
                      <span key={m} className="px-2 py-0.5 bg-rose-50 text-rose-700 text-[10px] font-bold rounded-md border border-rose-100 capitalize">{m}</span>
                    ))}
                    {result.missing.length > 5 && <span className="text-[10px] font-bold text-slate-400">+{result.missing.length - 5} more</span>}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => {setResult(null); setResumeText('');}}
              className="w-full py-2.5 text-xs font-black text-slate-400 hover:text-slate-600 transition-colors"
            >
              Start New Analysis
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResumeMatcher;
