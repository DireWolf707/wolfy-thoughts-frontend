import { createSlice } from "@reduxjs/toolkit"

export const dataSlice = createSlice({
  name: "data",

  initialState: {
    topRef: null,
    sidebar: false,
    feed: null,
    comments: null,
    post: null,
  },

  reducers: {
    toggleSidebar(state, action) {
      state.sidebar = action.payload
    },

    setTopRef(state, action) {
      state.topRef = action.payload
    },

    initFeed(state, action) {
      state.feed = action.payload.data
    },

    clearFeed(state, action) {
      state.feed = null
    },

    addPost(state, action) {
      state.feed.unshift(action.payload)
    },

    initComments(state, action) {
      state.post = action.payload.post
      state.comments = action.payload.comments
    },

    clearComments(state, action) {
      state.post = null
      state.comments = null
    },

    addComment(state, action) {
      state.comments.unshift(action.payload)
    },
  },
})

export const dataSliceActions = dataSlice.actions
