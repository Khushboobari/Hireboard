import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, reset } from '../features/auth/authSlice';
import { Briefcase, Loader2, User, Mail, Lock, ShieldCheck, Globe, Compass, Star, Rocket, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  const { name, email, password, role } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Mouse parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({ 
      x: (clientX / window.innerWidth - 0.5) * 30, 
      y: (clientY / window.innerHeight - 0.5) * 30 
    });
  };

  useEffect(() => {
    if (isError) alert(message);
    if (isSuccess || user) {
      const isManager = user?.role === 'admin' || user?.role === 'recruiter';
      navigate(isManager ? '/admin' : '/jobs');
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.08, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const testimonials = [
    { name: "Sarah J.", role: "Applied as Intern at Google", text: "HireBoard simplified my entire application process. I got an interview in 48 hours!" },
    { name: "David K.", role: "Recruiter at Meta", text: "The quality of talent on this platform is exceptional compared to other job boards." }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900"
    >
      {/* Left Panel: vision (Desktop) */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 flex-col justify-between p-16 overflow-hidden"
      >
        {/* Animated Orbs */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ x: mousePos.x * -1, y: mousePos.y * -1, scale: [1, 1.15, 1] }}
            className="absolute top-[10%] right-[10%] w-[50%] h-[50%] bg-indigo-500/30 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ x: mousePos.x * 1.5, y: mousePos.y * 1.5, scale: [1, 1.2, 1] }}
            className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/20 rounded-full blur-[120px]"
          />
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-3xl" />
        </div>

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">HireBoard<span className="text-indigo-400">.</span></span>
          </Link>
        </div>

        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <Star className="w-8 h-8 text-amber-400 mb-6 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] animate-pulse" />
             <h1 className="text-6xl font-black text-white leading-none tracking-tight mb-8">
               Launch Your <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 italic">Professional</span> Journey.
             </h1>
          </motion.div>

          {/* Animated Testimonial Ticker */}
          <div className="min-h-[140px] relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md max-w-sm"
              >
                <p className="text-white text-lg font-medium italic mb-4">"{testimonials[activeTestimonial].text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                    {testimonials[activeTestimonial].name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold leading-none">{testimonials[activeTestimonial].name}</p>
                    <p className="text-indigo-300 text-[10px] font-black uppercase tracking-widest mt-1">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-indigo-300/50 font-bold text-sm uppercase tracking-widest">
           Step into the future of hiring
        </div>
      </motion.div>

      {/* Right Panel: Register Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-20 bg-white relative">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Create Account</h2>
              <p className="text-slate-500 font-semibold italic text-lg leading-tight">Start your journey with a few simple steps.</p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 py-3 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 bg-white hover:border-blue-100 transition-all shadow-sm"
            >
              <Globe className="w-5 h-5 text-rose-500" />
              <span className="text-sm">Google</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 py-3 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 bg-white hover:border-slate-200 transition-all shadow-sm"
            >
              <Compass className="w-5 h-5 text-slate-900" />
              <span className="text-sm">GitHub</span>
            </motion.button>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[9px] uppercase">
              <span className="bg-white px-4 text-slate-400 font-bold tracking-[0.2em]">Or use direct access</span>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <motion.div variants={itemVariants}>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1 flex items-center gap-2">
                <User className="w-3.5 h-3.5" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white p-3.5 rounded-2xl font-bold text-slate-800 outline-none transition-all placeholder:text-slate-300"
                value={name}
                onChange={onChange}
                placeholder="Ex. John Watson"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white p-3.5 rounded-2xl font-bold text-slate-800 outline-none transition-all placeholder:text-slate-300"
                value={email}
                onChange={onChange}
                placeholder="name@email.com"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" /> Identity
              </label>
              <select 
                name="role" 
                value={role} 
                onChange={onChange} 
                className="w-full bg-indigo-50 border-2 border-transparent focus:border-indigo-500 p-3.5 rounded-2xl font-bold text-indigo-700 outline-none transition-all cursor-pointer appearance-none shadow-sm shadow-indigo-100"
              >
                <option value="student">Student Portal</option>
                <option value="recruiter">Recruiter Account</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" /> Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white p-3.5 rounded-2xl font-bold text-slate-800 outline-none transition-all placeholder:text-slate-300"
                value={password}
                onChange={onChange}
                placeholder="••••••••"
                required
              />
            </motion.div>

            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.01, boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.2)" }}
              whileTap={{ scale: 0.99 }}
              type="submit" 
              className="w-full py-4 bg-indigo-600 rounded-2xl flex items-center justify-center gap-2 text-white font-black shadow-xl shadow-indigo-500/10 relative overflow-hidden group" 
              disabled={isLoading}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Create Account <Rocket className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /></>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </form>

          <footer className="text-center pt-4">
            <p className="text-slate-500 font-bold text-sm">
              Already a member?{' '}
              <Link to="/login" className="text-indigo-600 border-b-2 border-indigo-100 hover:border-indigo-600 transition-colors">
                Sign in to Dashboard
              </Link>
            </p>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
