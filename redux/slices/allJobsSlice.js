import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

const allJobsSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    fetchJobsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchJobSuccess(state, action) {
      state.jobs = action.payload;
      state.loading = false;
    },
    fetchJobsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchJobSuccess, fetchJobsFailure, fetchJobsStart } =
  allJobsSlice.actions;

export default allJobsSlice.reducer;
