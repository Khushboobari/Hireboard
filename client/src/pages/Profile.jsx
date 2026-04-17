import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/auth/authSlice';
import Navbar from '../components/Navbar';
import { User, Mail, Link as LinkIcon, Star, Save, Loader2 } from 'lucide-react';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    resumeLink: user?.resumeLink || '',
    skills: user?.skills?.join(', ') || ''
  });
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
    
    const result = await dispatch(updateProfile({
      name: formData.name,
      email: formData.email,
      resumeLink: formData.resumeLink,
      skills: skillsArray
    }));

    if (!result.error) {
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
            {successMsg && <span className="text-green-600 font-semibold bg-green-50 px-4 py-1.5 rounded-full text-sm animate-in fade-in zoom-in">{successMsg}</span>}
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><User className="w-4 h-4 text-slate-400"/> Full Name</label>
                <input 
                  type="text" name="name" 
                  value={formData.name} onChange={handleChange} 
                  required className="input-field w-full" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400"/> Email Address</label>
                <input 
                  type="email" name="email" 
                  value={formData.email} onChange={handleChange} 
                  required className="input-field w-full bg-slate-50" 
                  disabled // typically changing email requires verification, keep disabled for now
                />
                <span className="text-xs text-slate-400 mt-1 block">Email changing is disabled.</span>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><LinkIcon className="w-4 h-4 text-slate-400"/> Resume Link</label>
                <input 
                  type="url" name="resumeLink" 
                  value={formData.resumeLink} onChange={handleChange} 
                  className="input-field w-full" 
                  placeholder="https://drive.google.com/..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Star className="w-4 h-4 text-slate-400"/> Skills (comma separated)</label>
                <input 
                  type="text" name="skills" 
                  value={formData.skills} onChange={handleChange} 
                  className="input-field w-full" 
                  placeholder="React, Node.js, Python..."
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button type="submit" disabled={isLoading} className="btn-primary py-3 px-8 flex items-center gap-2">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {isLoading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
