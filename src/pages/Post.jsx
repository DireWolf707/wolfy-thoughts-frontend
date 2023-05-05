import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { Stack } from "@mui/material"
import PostCard from "../components/posts/PostCard"
import CommentFeed from "../components/posts/CommentFeed"
import CommentInput from "../components/posts/CommentInput"
import { postApi, dataSliceActions, useDispatch, useSelector } from "../store"
import requestHandler, { ERR_TOAST } from "../utils/requestHandler"
import PostSkeleton from "../components/posts/skeletons/PostSkeleton"
import CommentsSkeleton from "../components/posts/skeletons/CommentsSkeleton"

const Post = () => {
  const dispatch = useDispatch()
  const { postId } = useParams()
  const { comments, post, topRef } = useSelector((store) => store.data)
  const [fetchPost] = postApi.useLazyFetchPostQuery()

  useEffect(() => {
    topRef.current.scrollIntoView({ behavior: "instant" })

    requestHandler(fetchPost({ postId }).unwrap(), "fetching post", "post fetched")
      .then(({ data }) => dispatch(dataSliceActions.initComments({ post: data, comments: data.comments })))
      .catch(ERR_TOAST)

    return () => dispatch(dataSliceActions.clearComments())
  }, [])

  return (
    <Stack gap="12px" m="26px auto" sx={{ width: { xs: "350px", sm: "420px", md: "460px" } }}>
      {post && <PostCard post={post} />}
      {!post && <PostSkeleton />}

      <CommentInput postId={postId} />

      {comments && <CommentFeed comments={comments} postId={postId} />}
      {!comments && <CommentsSkeleton />}
    </Stack>
  )
}

export default Post
