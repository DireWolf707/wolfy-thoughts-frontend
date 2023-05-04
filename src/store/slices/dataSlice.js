import { createSlice } from "@reduxjs/toolkit"

export const dataSlice = createSlice({
  name: "data",

  initialState: {
    sidebar: false,
    feed: null,
    comments: null,
  },

  reducers: {
    toggleSidebar(state, action) {
      state.sidebar = action.payload
    },

    initFeed(state, action) {
      state.feed = action.payload.data
    },

    updateFeed(state, action) {
      state.feed.push(...action.payload.data)
    },

    clearFeed(state, action) {
      state.feed = null
    },

    addPost(state, action) {
      state.feed.unshift(action.payload)
    },

    initComments(state, action) {
      state.comments = action.payload.data
    },

    updateComments(state, action) {
      state.comments.push(...action.payload.data)
    },

    clearComments(state, action) {
      state.comments = null
    },

    addComment(state, action) {
      state.comments.unshift(action.payload)
    },
  },
})

export const dataSliceActions = dataSlice.actions
