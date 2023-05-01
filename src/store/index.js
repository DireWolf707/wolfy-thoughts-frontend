import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { dataSlice, dataSliceActions } from "./slices/dataSlice"
import userApi from "./apis/userApi"

export const store = configureStore({
  reducer: {
    // slices
    [dataSlice.name]: dataSlice.reducer,
    // apis
    [userApi.reducerPath]: userApi.reducer,
  },
  // apis middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
})

setupListeners(store.dispatch)

export { useSelector, useDispatch } from "react-redux"
export { dataSliceActions }
export { userApi }
