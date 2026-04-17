import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, reset } from '../features/auth/authSlice';
import { Briefcase, Loader2 } from 'lucide-react';

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 py-12">
      <div className="card max-w-md w-full p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-400 to-primary-600"></div>
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
            <Briefcase className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Create an Account</h2>
          <p className="text-slate-500 mt-1">Join HireBoard to find your next opportunity</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className="input-field"
              value={name}
              onChange={onChange}
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              className="input-field"
              value={email}
              onChange={onChange}
              placeholder="you@university.edu"
              required
            />
          </div>
          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Account Type</label>
             <select name="role" value={role} onChange={onChange} className="input-field">
               <option value="student">Student</option>
               <option value="admin">Admin / Recruiter</option>
             </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="input-field"
              value={password}
              onChange={onChange}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-6" disabled={isLoading}>
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
