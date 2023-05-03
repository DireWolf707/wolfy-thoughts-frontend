import { createSlice } from "@reduxjs/toolkit"

export const dataSlice = createSlice({
  name: "data",

  initialState: {
    sidebar: false,
    feed: null,
    cursor: null,
  },

  reducers: {
    toggleSidebar(state, action) {
      state.sidebar = action.payload
    },

    initFeed(state, action) {
      state.feed = action.payload.data
      state.cursor = action.payload.cursor
    },

    updateFeed(state, action) {
      state.feed.push(...action.payload.data)
      state.cursor = action.payload.cursor
    },

    clearFeed(state, action) {
      state.feed = null
      state.cursor = null
    },

    addPost(state, action) {
      state.feed.unshift(action.payload)
    },
  },
})

export const dataSliceActions = dataSlice.actions
