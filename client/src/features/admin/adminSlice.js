import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

const initialState = {
  stats: null,
  jobApplicants: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const fetchAdminStats = createAsyncThunk(
  'admin/fetchStats',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/admin/stats');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchJobApplicants = createAsyncThunk(
  'admin/fetchJobApplicants',
  async (jobId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/applications/${jobId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  'admin/updateApplicationStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/applications/${id}/status`, { status });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdminState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    clearJobApplicants: (state) => {
      state.jobApplicants = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchAdminStats
      .addCase(fetchAdminStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // fetchJobApplicants
      .addCase(fetchJobApplicants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobApplicants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobApplicants = action.payload;
      })
      .addCase(fetchJobApplicants.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // updateApplicationStatus
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.isSuccess = true;
        const index = state.jobApplicants.findIndex(app => app._id === action.payload._id);
        if (index !== -1) {
          state.jobApplicants[index] = action.payload;
        }
      });
  },
});

export const { resetAdminState, clearJobApplicants } = adminSlice.actions;
export default adminSlice.reducer;
