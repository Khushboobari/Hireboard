import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

const initialState = {
  savedJobs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const fetchSavedJobs = createAsyncThunk(
  'student/fetchSavedJobs',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/users/saved-jobs');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const toggleSaveJob = createAsyncThunk(
  'student/toggleSaveJob',
  async (jobId, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/users/saved-jobs/${jobId}`);
      // The response returns the array of savedJob IDs or populated, but updating local state user is needed.
      // We will actually just return the jobId so the reducer can optimistically add/remove.
      return response.data; // Response is the updated string array of savedJobs IDs.
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    resetStudentState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSavedJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.savedJobs = action.payload; // Contains populated jobs
      })
      .addCase(fetchSavedJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Toggle saved job will just refresh by refetching or we can rely on ID array locally.
      // But fetchSavedJobs handles pulling the populated array, so toggleSaveJob doesn't strictly need to mutate it manually unless we want it to locally remove.
      .addCase(toggleSaveJob.fulfilled, (state, action) => {
         // action.payload is the array of IDs.
         // If a job was removed, we remove it from savedJobs populated array.
         const savedIds = action.payload;
         state.savedJobs = state.savedJobs.filter(job => savedIds.includes(job._id));
      });
  },
});

export const { resetStudentState } = studentSlice.actions;
export default studentSlice.reducer;
