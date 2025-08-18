import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    fetchUserFailure(state, action) {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
    fetchUserFailure, fetchUserStart, fetchUserSuccess, logoutUser
}= userSlice.actions

export default userSlice.reducer
