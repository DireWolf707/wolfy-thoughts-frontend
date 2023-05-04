import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { Stack } from "@mui/material"
import PostCard from "../components/posts/PostCard"
import CommentFeed from "../components/posts/CommentFeed"
import CommentInput from "../components/posts/CommentInput"
import ThreeBars from "../components/loaders/ThreeBars"
import { postApi, dataSliceActions, useDispatch, useSelector } from "../store"
import requestHandler, { ERR_TOAST } from "../utils/requestHandler"

const Post = () => {
  const dispatch = useDispatch()
  const { postId } = useParams()
  const { comments } = useSelector((store) => store.data)
  const [fetchPost, { data, isUninitialized, isFetching, isError }] = postApi.useLazyFetchPostQuery()
  const post = data?.data

  useEffect(() => {
    dispatch(dataSliceActions.clearComments())

    requestHandler(fetchPost({ postId }).unwrap(), "fetching post", "post fetched")
      .then(({ data }) => dispatch(dataSliceActions.initComments({ data: data.comments })))
      .catch(ERR_TOAST)
  }, [])

  if (isUninitialized || isFetching || isError) return <ThreeBars />

  return (
    <Stack gap="12px" m="26px auto" sx={{ width: { xs: "350px", sm: "420px", md: "460px" } }}>
      {post && comments && (
        <>
          <PostCard post={post} />
          <CommentInput post={post} />
          <CommentFeed comments={comments} postId={post.id} />
        </>
      )}
    </Stack>
  )
}

export default Post
