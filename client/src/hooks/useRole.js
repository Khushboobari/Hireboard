import { useAuth } from './useAuth';

export const useRole = () => {
  const { isAdmin } = useAuth();
  return isAdmin;
};
