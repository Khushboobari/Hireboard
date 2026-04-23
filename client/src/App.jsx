import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobListings from './pages/JobListings';
import JobDetail from './pages/JobDetail';
import MyApplications from './pages/MyApplications';
import StudentDashboard from './pages/StudentDashboard';
import SavedJobs from './pages/SavedJobs';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import ApplyPage from './pages/ApplyPage';
import AllCompanies from './pages/AllCompanies';
import CompanyDetail from './pages/CompanyDetail';
import InterviewPrep from './pages/InterviewPrep';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, isAdmin, isRecruiter } = useAuth();
  const isManager = isAdmin || isRecruiter;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to={isManager ? '/admin' : '/dashboard'} />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to={isManager ? '/admin' : '/dashboard'} />} />
      
      {/* Protected Routes (Everyone) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/jobs/:id/apply" element={<ApplyPage />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/companies" element={<AllCompanies />} />
        <Route path="/companies/:companyName" element={<CompanyDetail />} />
        <Route path="/interview-prep" element={<InterviewPrep />} />
        <Route path="/applications" element={<Navigate to="/my-applications" />} />
      </Route>

      {/* Admin Only Routes */}
      <Route element={<ProtectedRoute adminOnly={true} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
