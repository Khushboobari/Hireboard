import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, token } = useSelector((state) => state.auth);

  let isAdmin = false;
  let isRecruiter = false;
  let isStudent = false;

  if (user) {
    isAdmin = user.role === 'admin';
    isRecruiter = user.role === 'recruiter';
    isStudent = user.role === 'student';
  }

  return { user, token, isAdmin, isRecruiter, isStudent };
};
