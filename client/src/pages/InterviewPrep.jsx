import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, StopCircle, RotateCcw, ChevronRight, 
  MessageSquare, Brain, Lightbulb, Video, 
  CheckCircle2, Sparkles, Timer
} from 'lucide-react';

const questions = [
  {
    id: 1,
    category: "Behavioral",
    text: "Tell me about a time you faced a difficult challenge at work/school and how you overcame it.",
    tips: "Focus on the STAR method (Situation, Task, Action, Result). Highlight your problem-solving and resilience."
  },
  {
    id: 2,
    category: "Technical",
    text: "How do you ensure your code is scalable and maintainable?",
    tips: "Mention design patterns, clean code principles (SOLID), documentation, and testing strategies."
  },
  {
    id: 3,
    category: "Introduction",
    text: "Tell me about yourself and your background in technology.",
    tips: "Keep it under 2 minutes. Connect your past experiences to the role you're applying for."
  },
  {
    id: 4,
    category: "Culture Fit",
    text: "Why do you want to work for this specific company?",
    tips: "Research the company's values and recent projects. Show genuine interest beyond just the brand name."
  }
];

const InterviewPrep = () => {
  const [currentStep, setCurrentStep] = useState('landing'); // 'landing', 'session', 'feedback'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const startSession = () => {
    setCurrentStep('session');
    setCurrentQuestionIndex(0);
  };

  const toggleRecording = () => {
    if (isRecording) {
      clearInterval(intervalId);
      setIsRecording(false);
    } else {
      setTimer(0);
      const id = setInterval(() => setTimer(t => t + 1), 1000);
      setIntervalId(id);
      setIsRecording(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimer(0);
      if (isRecording) toggleRecording();
    } else {
      setCurrentStep('feedback');
    }
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {currentStep === 'landing' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <Sparkles className="w-4 h-4" /> AI Interview Coach
              </div>
              <h1 className="text-5xl font-black text-slate-800 mb-6 tracking-tight">Master Your Next Interview</h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium">Practice with AI-generated questions tailored to your target companies and roles. Get real-time feedback on your performance.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-slate-800 mb-2">Real Scenarios</h3>
                  <p className="text-sm text-slate-500 font-medium">Practice with actual questions asked at top tech companies.</p>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mx-auto mb-6">
                    <Video className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-slate-800 mb-2">Simulated Room</h3>
                  <p className="text-sm text-slate-500 font-medium">Get comfortable with a timed, high-pressure environment.</p>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
                    <Brain className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-slate-800 mb-2">Instant Feedback</h3>
                  <p className="text-sm text-slate-500 font-medium">Analyze your answers and get improvement suggestions.</p>
                </div>
              </div>

              <button 
                onClick={startSession}
                className="bg-primary-600 text-white px-12 py-5 rounded-[24px] font-black text-lg shadow-2xl shadow-primary-200 hover:scale-105 active:scale-95 transition-all"
              >
                Start Practice Session
              </button>
            </motion.div>
          )}

          {currentStep === 'session' && (
            <motion.div 
              key="session"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[48px] p-12 border border-slate-100 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-rose-500 animate-pulse' : 'bg-slate-300'}`}></div>
                  <span className="font-black text-slate-600 text-sm">{isRecording ? 'Recording...' : 'Paused'}</span>
                  <div className="w-px h-4 bg-slate-200 mx-2"></div>
                  <Timer className="w-4 h-4 text-slate-400" />
                  <span className="font-black text-slate-800 text-sm tabular-nums">{formatTime(timer)}</span>
                </div>
              </div>

              <div className="mb-12">
                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                  Question {currentQuestionIndex + 1} of {questions.length} • {questions[currentQuestionIndex].category}
                </span>
                <h2 className="text-3xl font-black text-slate-800 mt-6 leading-tight max-w-3xl">
                  {questions[currentQuestionIndex].text}
                </h2>
              </div>

              <div className="bg-slate-50 rounded-3xl p-8 mb-12 border border-slate-100 relative group">
                <div className="absolute -top-3 left-8 bg-amber-400 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-amber-100">
                  <Lightbulb className="w-3 h-3" /> Expert Tip
                </div>
                <p className="text-slate-600 font-medium leading-relaxed italic">
                  {questions[currentQuestionIndex].tips}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <button 
                    onClick={toggleRecording}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all ${
                      isRecording 
                        ? 'bg-rose-50 text-rose-600 border-2 border-rose-100' 
                        : 'bg-slate-800 text-white shadow-xl shadow-slate-200'
                    }`}
                  >
                    {isRecording ? <><StopCircle className="w-5 h-5" /> Stop Recording</> : <><Play className="w-5 h-5" /> Start Speaking</>}
                  </button>
                  <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-slate-800 transition-colors">
                    <RotateCcw className="w-6 h-6" />
                  </button>
                </div>

                <button 
                  onClick={nextQuestion}
                  className="flex items-center gap-3 px-8 py-4 bg-primary-600 text-white rounded-2xl font-black shadow-xl shadow-primary-100 hover:bg-primary-700 transition-all"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Finish Session' : 'Next Question'} <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'feedback' && (
            <motion.div 
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h1 className="text-4xl font-black text-slate-800 mb-4">Great Job!</h1>
              <p className="text-lg text-slate-500 mb-12 font-medium">You've completed the practice session. Here's a summary of your performance.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" /> Performance Analysis
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Confidence", score: "85%" },
                      { label: "Clarity", score: "92%" },
                      { label: "Keyword Match", score: "78%" }
                    ].map(stat => (
                      <div key={stat.label}>
                        <div className="flex justify-between text-sm font-bold mb-2">
                          <span className="text-slate-500">{stat.label}</span>
                          <span className="text-slate-800">{stat.score}</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: stat.score }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-primary-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-slate-800 mb-4">Next Steps</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                        <div className="w-5 h-5 bg-primary-50 rounded flex items-center justify-center text-primary-600 mt-0.5 flex-shrink-0">1</div>
                        Refine your STAR method examples for behavioral questions.
                      </li>
                      <li className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                        <div className="w-5 h-5 bg-primary-50 rounded flex items-center justify-center text-primary-600 mt-0.5 flex-shrink-0">2</div>
                        Incorporate more technical terms like "Design Patterns" into your scalability answer.
                      </li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => setCurrentStep('landing')}
                    className="w-full mt-8 py-4 bg-slate-800 text-white rounded-2xl font-black text-sm hover:bg-slate-700 transition-all"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default InterviewPrep;
