import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, reset } from '../features/auth/authSlice';
import { Briefcase, Loader2, User, Mail, Lock, ShieldCheck, Chrome, Github } from 'lucide-react';
import { motion } from 'framer-motion';

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

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess || user) {
      navigate('/jobs');
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 py-16 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[-10%] w-[50%] h-[50%] bg-indigo-100 rounded-full filter blur-3xl opacity-40"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-100 rounded-full filter blur-3xl opacity-40"
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
            whileHover={{ rotate: [-5, 5, -5, 0], transition: { repeat: Infinity, duration: 1 } }}
            className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg shadow-primary-200"
          >
            <Briefcase className="w-8 h-8" />
          </motion.div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Create Account</h2>
          <p className="text-slate-500 mt-1 font-medium italic text-center">Join HireBoard to find your next opportunity</p>
        </div>

        {/* Social Register */}
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
            <span className="bg-white px-4 text-slate-400 font-black tracking-widest leading-none text-[10px]">Or register with email</span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" /> Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="input-field py-3 focus:ring-primary-500"
              value={name}
              onChange={onChange}
              placeholder="John Doe"
              required
              autoComplete="name"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" /> Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="input-field py-3 focus:ring-primary-500"
              value={email}
              onChange={onChange}
              placeholder="you@university.edu"
              required
              autoComplete="email"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
             <label htmlFor="role" className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
               <ShieldCheck className="w-4 h-4 text-slate-400" /> Account Type
             </label>
              <select id="role" name="role" value={role} onChange={onChange} className="input-field py-3 font-bold text-primary-600 bg-slate-50 cursor-pointer">
                <option value="student">Student Account</option>
                <option value="recruiter">Recruiter Account</option>
                <option value="admin">System Admin</option>
              </select>
          </motion.div>
          <motion.div variants={itemVariants}>
            <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-400" /> Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="input-field py-3 focus:ring-primary-500"
              value={password}
              onChange={onChange}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
          </motion.div>
          
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit" 
            className="btn-primary w-full py-4 flex items-center justify-center gap-2 mt-4 text-base shadow-xl shadow-primary-900/10" 
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            {isLoading ? 'Processing...' : 'Create Account'}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
