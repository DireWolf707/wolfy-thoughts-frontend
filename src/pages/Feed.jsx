import { useState, useEffect } from "react"
import { Stack } from "@mui/material"
import PostInput from "../components/posts/PostInput"
import PostFeed from "../components/posts/PostFeed"
import socket from "../utils/socket"
import { postApi, dataSliceActions, useDispatch, useSelector } from "../store"
import requestHandler from "../utils/requestHandler"

const Feed = () => {
  const dispatch = useDispatch()
  const [isSocketConnected, setIsSocketConnected] = useState(false)
  const { feed } = useSelector((store) => store.data)
  const [fetchFeed, { isLoading, isFetching, isError }] = postApi.useLazyFetchFeedQuery()

  useEffect(() => {
    const setSocketConnected = () => setIsSocketConnected(true)
    socket.on("connect", setSocketConnected)
    socket.connect()

    requestHandler(fetchFeed({}).unwrap(), "fetching posts", "posts fetched").then(({ data, cursor }) => {
      dispatch(dataSliceActions.initFeed({ data, cursor }))
    })

    return () => socket.off("connect", setSocketConnected).disconnect()
  }, [])

  if (!isSocketConnected || isLoading || isError) return "loading..."

  return (
    <Stack gap="12px" m="26px auto" sx={{ width: { xs: "350px", sm: "420px", md: "460px" } }}>
      <PostInput />
      { feed && <PostFeed feed={feed} />}
    </Stack>
  )
}

export default Feed
