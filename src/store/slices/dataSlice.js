import { createSlice } from "@reduxjs/toolkit"

export const dataSlice = createSlice({
  name: "data",

  initialState: {
    sidebar: false,
  },

  reducers: {
    toggleSidebar(state, action) {
      state.sidebar = action.payload
    },
  },
})

export const dataSliceActions = dataSlice.actions
