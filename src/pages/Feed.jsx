import { useEffect } from "react"
import { Stack } from "@mui/material"
import PostInput from "../components/posts/PostInput"
import PostFeed from "../components/posts/PostFeed"
import { postApi, dataSliceActions, useDispatch, useSelector } from "../store"
import requestHandler, { ERR_TOAST } from "../utils/requestHandler"
import FeedSkeleton from "../components/posts/skeletons/FeedSkeleton"

const Feed = () => {
  const dispatch = useDispatch()
  const { feed } = useSelector((store) => store.data)
  const [fetchFeed] = postApi.useLazyFetchFeedQuery()

  useEffect(() => {
    dispatch(dataSliceActions.clearFeed())

    requestHandler(fetchFeed().unwrap(), "fetching posts", "posts fetched")
      .then(({ data }) => dispatch(dataSliceActions.initFeed({ data })))
      .catch(ERR_TOAST)
  }, [])

  return (
    <Stack gap="12px" m="26px auto" sx={{ width: { xs: "350px", sm: "420px", md: "460px" } }}>
      <PostInput />
      {feed && <PostFeed feed={feed} />}
      {!feed && <FeedSkeleton />}
    </Stack>
  )
}

export default Feed
