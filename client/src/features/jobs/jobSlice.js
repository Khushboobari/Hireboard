import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

const initialState = {
  listings: [],
  selectedJob: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetchAll',
  async (filters, thunkAPI) => {
    try {
      let query = '';
      if (filters) {
        const params = new URLSearchParams(filters).toString();
        query = `?${params}`;
      }
      const response = await axiosInstance.get(`/jobs${query}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createJob = createAsyncThunk(
  'jobs/create',
  async (jobData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/jobs', jobData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateJob = createAsyncThunk(
  'jobs/update',
  async ({ id, jobData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/jobs/${id}`, jobData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteJob = createAsyncThunk(
  'jobs/delete',
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/jobs/${id}`);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const toggleJobActive = createAsyncThunk(
  'jobs/toggleActive',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/jobs/${id}/toggle`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    resetJobState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listings = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.listings.unshift(action.payload); // Add new job to the top
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isSuccess = true;
        const index = state.listings.findIndex(j => j._id === action.payload._id);
        if (index !== -1) {
          state.listings[index] = action.payload;
        }
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.listings = state.listings.filter(j => j._id !== action.payload);
      })
      .addCase(toggleJobActive.fulfilled, (state, action) => {
        state.isSuccess = true;
        const index = state.listings.findIndex(j => j._id === action.payload._id);
        if (index !== -1) {
          state.listings[index] = action.payload;
        }
      });
  },
});

export const { resetJobState, setSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
