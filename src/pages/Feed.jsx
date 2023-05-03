import { useEffect } from "react"
import { Stack } from "@mui/material"
import PostInput from "../components/posts/PostInput"
import PostFeed from "../components/posts/PostFeed"
import ThreeBars from "../components/loaders/ThreeBars"
import { postApi, dataSliceActions, useDispatch, useSelector } from "../store"
import requestHandler, { ERR_TOAST } from "../utils/requestHandler"

const Feed = () => {
  const dispatch = useDispatch()
  const { feed } = useSelector((store) => store.data)
  const [fetchFeed, { isUninitialized, isFetching, isError }] = postApi.useLazyFetchFeedQuery()

  useEffect(() => {
    dispatch(dataSliceActions.clearFeed())

    requestHandler(fetchFeed({}).unwrap(), "fetching posts", "posts fetched")
      .then(({ data, cursor }) => dispatch(dataSliceActions.initFeed({ data, cursor })))
      .catch(ERR_TOAST)
  }, [])

  if (isUninitialized || isFetching || isError) return <ThreeBars />

  return (
    <Stack gap="12px" m="26px auto" sx={{ width: { xs: "350px", sm: "420px", md: "460px" } }}>
      <PostInput />
      {feed && <PostFeed feed={feed} />}
    </Stack>
  )
}

export default Feed
