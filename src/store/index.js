import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { dataSlice, dataSliceActions } from "./slices/dataSlice"
import userApi from "./apis/userApi"
import postApi from "./apis/postApi"

export const store = configureStore({
  reducer: {
    // slices
    [dataSlice.name]: dataSlice.reducer,
    // apis
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  // apis middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(postApi.middleware),
})

setupListeners(store.dispatch)

export { useSelector, useDispatch } from "react-redux"
export { dataSliceActions }
export { userApi, postApi }
