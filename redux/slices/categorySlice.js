import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [],
  loading: false,
  error: null,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategoriesStart(state) {
      state.loading = true
      state.error = null
    },
    fetchCategoriesSuccess(state, action) {
        console.log(state, "stattt")
        console.log(action, "action")
      state.categories = action.payload
      state.loading = false
    },
    fetchCategoriesFailure(state, action) {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = categorySlice.actions

export default categorySlice.reducer
