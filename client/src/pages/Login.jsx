import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, reset } from '../features/auth/authSlice';
import { Briefcase, Loader2, Mail, Lock, Chrome, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess || user) {
      const isManager = user?.role === 'admin' || user?.role === 'recruiter';
      navigate(isManager ? '/admin' : '/dashboard');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100 rounded-full filter blur-3xl opacity-50"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full filter blur-3xl opacity-50"
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="card max-w-md w-full p-8 relative glass backdrop-blur-xl border-white/40 shadow-2xl shadow-primary-900/5"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-400 to-indigo-600"></div>
        
        <div className="flex flex-col items-center mb-8">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg shadow-primary-200"
          >
            <Briefcase className="w-8 h-8" />
          </motion.div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Welcome Back</h2>
          <p className="text-slate-500 mt-1 font-medium italic">Log in to your HireBoard account</p>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl font-bold text-slate-600 bg-white hover:bg-slate-50 transition-all shadow-sm"
          >
            <Chrome className="w-5 h-5 text-rose-500" />
            <span className="text-sm">Google</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl font-bold text-slate-600 bg-white hover:bg-slate-50 transition-all shadow-sm"
          >
            <Github className="w-5 h-5 text-slate-900" />
            <span className="text-sm">GitHub</span>
          </motion.button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-slate-400 font-black tracking-widest leading-none">Or continue with</span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" /> Email Address
            </label>
            <input
              type="email"
              className="input-field py-3.5 focus:ring-primary-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              required
              autoComplete="email"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-400" /> Password
            </label>
            <input
              type="password"
              className="input-field py-3.5 focus:ring-primary-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </motion.div>
          
          <div className="text-right">
             <Link to="#" className="text-xs font-bold text-primary-600 hover:text-primary-700">Forgot Password?</Link>
          </div>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit" 
            className="btn-primary w-full py-4 flex items-center justify-center gap-2 mt-4 text-base shadow-xl shadow-primary-900/10" 
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            {isLoading ? 'Signing In...' : 'Access Dashboard'}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 font-bold hover:underline">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
