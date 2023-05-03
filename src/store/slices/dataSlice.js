import { createSlice } from "@reduxjs/toolkit"

export const dataSlice = createSlice({
  name: "data",

  initialState: {
    sidebar: false,
    feed: null,
    feedCursor: null,
    comments: null,
    commentsCursor: null,
  },

  reducers: {
    toggleSidebar(state, action) {
      state.sidebar = action.payload
    },

    initFeed(state, action) {
      state.feed = action.payload.data
      state.feedCursor = action.payload.cursor
    },

    updateFeed(state, action) {
      state.feed.push(...action.payload.data)
      state.feedCursor = action.payload.cursor
    },

    clearFeed(state, action) {
      state.feed = null
      state.feedCursor = null
    },

    addPost(state, action) {
      state.feed.unshift(action.payload)
    },

    initComments(state, action) {
      state.comments = action.payload.data
      state.commentsCursor = action.payload.cursor
    },

    updateComments(state, action) {
      state.comments.push(...action.payload.data)
      state.commentsCursor = action.payload.cursor
    },

    clearComments(state, action) {
      state.comments = null
      state.commentsCursor = null
    },

    addComment(state, action) {
      state.comments.unshift(action.payload)
    },
  },
})

export const dataSliceActions = dataSlice.actions
