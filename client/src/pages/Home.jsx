import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Briefcase, Sparkles, Target, ArrowRight, ShieldCheck, Users, Zap, CheckCircle, TrendingUp, Award, MessageSquare } from 'lucide-react';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 lg:px-8">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100 via-slate-50 to-slate-50"></div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 lg:top-20 left-10 w-64 h-64 lg:w-96 lg:h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-10 lg:top-20 right-10 w-64 h-64 lg:w-96 lg:h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-20 left-1/2 w-64 h-64 lg:w-96 lg:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 transform -translate-x-1/2"
          ></motion.div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-semibold mb-8 backdrop-blur-md border border-primary-200"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Empowered by AI. Build for Campuses.</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Land your next big <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
              opportunity, faster.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10"
          >
            HireBoard connects ambitious students with top employers. Supercharge your applications with AI-generated cover notes and track your statuses in real-time.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/register" className="btn-primary py-4 px-8 text-lg flex items-center justify-center gap-2 hover:-translate-y-1 transition-transform group">
              Start Applying <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/jobs" className="btn-secondary py-4 px-8 text-lg">
              Explore Open Roles
            </Link>
          </motion.div>
        </div>

        {/* Decorative Floating Elements */}
        <motion.div 
           animate={{ y: [0, -15, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="hidden lg:flex absolute top-40 left-[10%] bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex-col gap-2 items-center"
        >
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-5 h-5"/>
          </div>
          <span className="text-xs font-bold text-slate-700">Verified Jobs</span>
        </motion.div>

        <motion.div 
           animate={{ y: [0, 15, 0] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="hidden lg:flex absolute top-60 right-[10%] bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex-col gap-2 items-center"
        >
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
            <Zap className="w-5 h-5"/>
          </div>
          <span className="text-xs font-bold text-slate-700">Smart Apply</span>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why use HireBoard?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Everything you need to navigate your career journey from campus to corporate.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Sparkles,
                color: "text-amber-600 bg-amber-50",
                title: "AI Cover Notes",
                desc: "Don't stare at a blank screen. Let Claude AI generate professional, tailored cover notes instantly based on the job profile."
              },
              {
                icon: Target,
                color: "text-primary-600 bg-primary-50",
                title: "Seamless Tracking",
                desc: "Keep all your applications in one place. Instantly see if you're Shortlisted, Rejected, or still under Review."
              },
              {
                icon: Users,
                color: "text-emerald-600 bg-emerald-50",
                title: "Direct Admin Access",
                desc: "Employers and college placement cells can easily post jobs and manage applicant statuses via a powerful admin dashboard."
              }
            ].map((feat, idx) => (
              <motion.div key={idx} variants={itemVariants} className="card p-8 group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feat.color}`}>
                  <feat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feat.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Get hired in 4 simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[ 
              { step: "01", title: "Create Profile", icon: Users },
              { step: "02", title: "Find Jobs", icon: Target },
              { step: "03", title: "AI Apply", icon: Sparkles },
              { step: "04", title: "Get Hired", icon: CheckCircle }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-primary-600 font-bold text-xl mb-4 border-2 border-primary-100">
                  <s.icon className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-slate-400 mb-1">STEP {s.step}</div>
                <h4 className="text-lg font-bold text-slate-800">{s.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500 to-primary-700"></div>
         <div className="max-w-6xl mx-auto px-6 relative z-10">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
             {[ 
               { label: "Active Students", value: "10K+", icon: Users },
               { label: "Companies", value: "500+", icon: Briefcase },
               { label: "Jobs Posted", value: "2.5K+", icon: TrendingUp },
               { label: "Success Rate", value: "94%", icon: Award }
             ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <stat.icon className="w-8 h-8 text-primary-200 mb-4" />
                  <div className="text-4xl md:text-5xl font-extrabold mb-2 text-white">{stat.value}</div>
                  <div className="text-primary-100 font-medium tracking-wide text-sm uppercase">{stat.label}</div>
                </motion.div>
             ))}
           </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Student Success</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Hear out from students who landed their dream internships.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
               { name: "Alex R.", role: "Software Engineer Intern at TechCorp", text: "The AI cover note feature saved me so much time. I was able to apply to 10 companies in an hour, and got 3 interviews!" },
               { name: "Priya S.", role: "Marketing Intern at StartupX", text: "HireBoard made it so easy to track my applications. Seeing my status change from 'Applied' to 'Shortlisted' was the best feeling." },
               { name: "James L.", role: "Data Analyst Full-time", text: "I found my first full-time role out of college here. The platform is sleek, fast, and straight to the point without any clutter." }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative"
              >
                <MessageSquare className="w-8 h-8 text-slate-200 absolute top-6 right-6" />
                <p className="text-slate-600 mb-6 relative z-10 leading-relaxed">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-slate-800">{t.name}</h4>
                  <p className="text-xs font-semibold text-primary-600 mt-1 uppercase tracking-wide">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-400 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to jumpstart your career?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg mb-10"
          >
            Join thousands of students connecting with top-tier companies on HireBoard today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/register" className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-400 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-xl shadow-primary-900/50 hover:-translate-y-1">
              Create Free Account <Briefcase className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="bg-slate-950 py-8 text-center border-t border-slate-900">
        <p className="text-slate-500 flex items-center justify-center gap-2">
          <Briefcase className="w-5 h-5 text-primary-600"/> 
          <span className="font-semibold text-slate-300">HireBoard</span> © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Home;
