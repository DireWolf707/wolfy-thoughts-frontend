import { useState, useEffect, useRef } from "react"
import { Stack, Typography, IconButton, CircularProgress } from "@mui/material"
import { Link } from "react-router-dom"
import UserAvatar from "../layouts/UserAvatar"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import socket from "../../utils/socket"
import { postApi, userApi } from "../../store"
import { useInView, motion } from "framer-motion"
import { ERR_TOAST } from "../../utils/requestHandler"

const PostCard = ({ post }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef)
  const [isPostLiked, setIsPostLiked] = useState(Boolean(post?._count?.likes))
  const [metadata, setMetadata] = useState({ likes: null, comments: null })
  const [like, { isLoading: isLiking }] = postApi.useLikePostMutation()
  const [unlike, { isLoading: isUnLiking }] = postApi.useUnLikePostMutation()
  const {
    data: { data: user },
  } = userApi.useFetchProfileQuery()

  const likeHandler = () =>
    like({ postId: post.id })
      .unwrap()
      .then(() => setIsPostLiked(true))
      .catch(ERR_TOAST)

  const unLikeHandler = () =>
    unlike({ postId: post.id })
      .unwrap()
      .then(() => setIsPostLiked(false))
      .catch(ERR_TOAST)

  useEffect(() => {
    if (isInView) {
      const postKey = `post:${post.id}`
      const likeSubEvent = postKey + ":likes"
      const likeSubHandler = (likes) => setMetadata((pv) => ({ ...pv, likes }))
      const commentSubEvent = postKey + ":comments"
      const commentSubHandler = (comments) => setMetadata((pv) => ({ ...pv, comments }))

      socket
        .emitWithAck("sub_post", { postId: post.id })
        .then((metadata) => {
          setMetadata(metadata)
          socket.on(likeSubEvent, likeSubHandler)
          socket.on(commentSubEvent, commentSubHandler)
        })
        .catch(ERR_TOAST)

      return () => socket.emit("unsub_post", { postId: post.id }).off(likeSubEvent, likeSubHandler).off(commentSubEvent, commentSubHandler)
    }
  }, [isInView])

  return (
    <Stack
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8 } }}
      ref={cardRef}
      gap="16px"
      p="18px"
      bgcolor="#fff"
      borderRadius="5px"
      border={post.userId === user.id && "3.6px solid black"}
    >
      <Stack flexDirection="row" alignItems="center" gap="8px">
        <UserAvatar user={post.user} />

        <Typography fontFamily="Righteous" fontSize="18px" fontWeight="bold" color="#000">
          {post.user.username}
        </Typography>
      </Stack>

      <Typography px="13px" fontFamily="Alkatra" fontSize="18px" color="#000">
        {post.content}
      </Typography>

      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="rgba(0,0,0,0.1)"
        p="2px 20px 2px 4px"
        borderRadius="80px"
      >
        {isLiking || isUnLiking ? (
          <CircularProgress thickness={10} sx={{ p: "6px" }} />
        ) : isPostLiked ? (
          <IconButton onClick={unLikeHandler}>
            <FavoriteIcon sx={{ fill: "red" }} />
          </IconButton>
        ) : (
          <IconButton onClick={likeHandler}>
            <FavoriteBorderOutlinedIcon sx={{ fill: "red" }} />
          </IconButton>
        )}

        <Stack flexDirection="row" alignItems="center" gap="18px">
          {metadata.likes !== null ? (
            <Typography fontFamily="Righteous" fontSize="13px" fontWeight="bold" color="rgba(0,0,0,0.6)">
              {metadata.likes} likes
            </Typography>
          ) : (
            <CircularProgress thickness={12} sx={{ p: "8px" }} />
          )}

          {metadata?.comments !== null ? (
            <Link
              to={`/post/${post.id}`}
              style={{
                textDecoration: "underline",
                textDecorationColor: "rgba(0,0,0,0.6)",
                textDecorationThickness: "2px",
                textUnderlineOffset: "6px",
              }}
            >
              <Typography fontFamily="Righteous" fontSize="13px" fontWeight="bold" color="rgba(0,0,0,0.6)">
                {metadata.comments} comments
              </Typography>
            </Link>
          ) : (
            <CircularProgress thickness={12} sx={{ p: "8px" }} />
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default PostCard
