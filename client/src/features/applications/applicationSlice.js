import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

const initialState = {
  myApplications: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const fetchMyApplications = createAsyncThunk(
  'applications/fetchMine',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/applications/mine');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const applyToJob = createAsyncThunk(
  'applications/apply',
  async (applicationData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/applications', applicationData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    resetAppLayerState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myApplications = action.payload;
      })
      .addCase(fetchMyApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(applyToJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Optionally insert if needed, but usually we just refetch
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAppLayerState } = applicationSlice.actions;
export default applicationSlice.reducer;
