import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  industry: '',
  location: '',
  keyword: '',
}

const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    setIndustry(state, action) {
      state.industry = action.payload
    },
    setLocation(state, action) {
      state.location = action.payload
    },
    setKeyword(state, action) {
      state.keyword = action.payload
    },
  },
})

export const { setIndustry, setLocation, setKeyword } = searchFilterSlice.actions

export default searchFilterSlice.reducer
