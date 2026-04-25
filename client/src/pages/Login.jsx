import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, reset } from '../features/auth/authSlice';
import { Briefcase, Loader2, Mail, Lock, Globe, Compass, CheckCircle2, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) alert(message);
    if (isSuccess || user) {
      navigate(user?.role === 'admin' ? '/admin' : user?.role === 'recruiter' ? '/recruiter' : '/jobs');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // Parallax constraints
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({ 
      x: (clientX / window.innerWidth - 0.5) * 40, 
      y: (clientY / window.innerHeight - 0.5) * 40 
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const logoPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1.5, ease: "easeInOut" } 
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-primary-100 selection:text-primary-900"
    >
      {/* Left Panel: Vision & Branding (Desktop Only) */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 relative bg-slate-900 flex-col justify-between p-16 overflow-hidden"
      >
        {/* Animated Background Gradients & Particles */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ 
              x: mousePos.x * -1.5, 
              y: mousePos.y * -1.5,
              scale: [1, 1.1, 1] 
            }}
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary-600/30 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              x: mousePos.x * 1.2, 
              y: mousePos.y * 1.2,
              scale: [1, 1.2, 1] 
            }}
            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[120px]"
          />
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">HireBoard<span className="text-primary-500">.</span></span>
          </Link>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-6xl font-black text-white leading-[0.9] tracking-tight mb-6">
              Unlock Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">Dream Career.</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed">
              Connect with 5000+ top-tier companies. Join the platform where the next generation of talent meets opportunity.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 mt-12">
            {[
              { icon: CheckCircle2, label: "Verified Jobs", count: "10k+" },
              { icon: Users, label: "Global Talent", count: "50k+" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <p className="text-white font-black text-xl leading-none">{stat.count}</p>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-slate-500 font-bold text-sm uppercase tracking-widest">
          <span className="w-8 h-[1px] bg-slate-800"></span>
          Trusted by Fortune 500 companies
        </div>
      </motion.div>

      {/* Right Panel: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 bg-white relative">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md space-y-10"
        >
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h2>
              <p className="text-slate-500 font-semibold italic text-lg leading-tight">Access your personalized career dashboard.</p>
            </motion.div>
          </div>

          {/* Social Logins */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 py-4 px-6 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 bg-white hover:border-primary-100 hover:bg-primary-50/10 transition-all shadow-sm"
            >
              <Globe className="w-5 h-5 text-rose-500" />
              <span className="text-sm">Google</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 py-4 px-6 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 bg-white hover:border-slate-200 transition-all shadow-sm"
            >
              <Compass className="w-5 h-5 text-slate-900" />
              <span className="text-sm">GitHub</span>
            </motion.button>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-4 text-slate-400 font-black tracking-widest">Or login with email</span>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="group">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1 group-focus-within:text-primary-500 transition-colors flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 focus:bg-white p-4 rounded-2xl font-bold text-slate-800 outline-none transition-all placeholder:text-slate-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest group-focus-within:text-primary-500 transition-colors flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" /> Password
                </label>
                <Link to="#" className="text-[10px] font-black text-primary-500 uppercase hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 focus:bg-white p-4 rounded-2xl font-bold text-slate-800 outline-none transition-all placeholder:text-slate-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </motion.div>

            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.01, boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.2)" }}
              whileTap={{ scale: 0.99 }}
              type="submit" 
              className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-base shadow-xl shadow-primary-500/10 font-black overflow-hidden relative group" 
              disabled={isLoading}
            >
              <motion.span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Access Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </motion.span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.button>
          </form>

          <footer className="text-center pt-4">
            <p className="text-slate-500 font-bold text-sm">
              New to the platform?{' '}
              <Link to="/register" className="text-primary-600 border-b-2 border-primary-100 hover:border-primary-600 transition-colors">
                Initialize your account
              </Link>
            </p>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
