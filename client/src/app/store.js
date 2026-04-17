import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import jobReducer from '../features/jobs/jobSlice';
import applicationReducer from '../features/applications/applicationSlice';
import adminReducer from '../features/admin/adminSlice';
import studentReducer from '../features/student/studentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    application: applicationReducer,
    admin: adminReducer,
    student: studentReducer,
  },
});
